import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PronosticosService } from 'src/app/services/pronosticos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-olvide-password',
  templateUrl: './form-olvide-password.component.html',
  styleUrls: ['./form-olvide-password.component.css']
})
export class FormOlvidePasswordComponent implements OnInit {

  public formEmailReset: FormGroup = this.fb.group({
    correo: ['', [Validators.required,Validators.email]]
  })

  constructor(private fb:FormBuilder, private pronosticoService: PronosticosService) { }

  ngOnInit(): void {
  }

  encontrarUsuario() {

    if(this.formEmailReset.invalid) {
        Swal.fire('Error', 'Email no valido', 'error')
        return
    }
    this.pronosticoService.buscarEmail(this.formEmailReset.value.correo).subscribe((resp:any) => {
        Swal.fire('Encontrado', resp.mensaje, 'success')
    }, error => {
        console.log(error)
        Swal.fire('Error', error.error.mensaje, 'error')
    })
  }

}
