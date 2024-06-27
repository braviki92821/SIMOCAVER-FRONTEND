import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PronosticosService } from 'src/app/services/pronosticos.service';
import  SwalFire from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup = this.fb.group({
    email: ['', Validators.email],
    password: ['', Validators.required]
  })

  constructor(private pronosticoService: PronosticosService, private fb: FormBuilder, private Route: Router) { }

  ngOnInit(): void {
  }

  acceder(): void {
    if(this.formLogin.invalid){
      SwalFire.fire('Mensaje de Error', 'Campos obligarios', 'error')
      return
    }

    this.pronosticoService.login(this.formLogin.value.email, this.formLogin.value.password).subscribe((data: any) => {
      localStorage.setItem('token', data.token)
      SwalFire.fire('Correcto', 'Autenticado correctamene', 'success')
      this.Route.navigate(['/administracion'])
    }, error => {
      SwalFire.fire('Error', error.error.mensaje, 'error')
    })
  }

}
