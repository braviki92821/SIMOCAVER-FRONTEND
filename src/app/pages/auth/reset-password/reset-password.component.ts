import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PronosticosService } from 'src/app/services/pronosticos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public token: string

  public formNewPassword: FormGroup = this.fb.group({
    password: ['', Validators.required],
    confirmar: ['', Validators.required]
  })

  constructor(private activatedRoute:ActivatedRoute, private fb: FormBuilder, private pronosticoService: PronosticosService) { }

  ngOnInit(): void {
    this.token = <string> this.activatedRoute.snapshot.paramMap.get('token');
  }

  crearPassword(): void {
    if(this.formNewPassword.invalid) {
      Swal.fire('Error', 'No deje campos vacioes', 'error')
      return
    }

    if(this.formNewPassword.value.password != this.formNewPassword.value.confirmar) {
      Swal.fire('Error', 'Las contraseñas no son iguales', 'error')
      return
    }

    this.pronosticoService.resetPassword(this.formNewPassword.value, this.token).subscribe(resp =>{
       Swal.fire('Correcto', resp.mensaje, 'success')
    }, error => {
       Swal.fire('Error', error.erro.mensaje,'error')
    })
  }

}
