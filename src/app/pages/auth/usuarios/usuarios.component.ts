import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from 'src/app/interfaces/Usuario.interface';
import { PronosticosService } from 'src/app/services/pronosticos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public usuarios: Usuario[]
  private roles: String[] = ['Administrador', 'Usuario']

  public formNuevoUsuario: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', Validators.email],
    tipoUsuario: ['', Validators.required]
  })

  constructor(private router: Router, private pronosticoService: PronosticosService, private fb:FormBuilder) { }

  ngOnInit(): void {
    let token: string = <string> localStorage.getItem('token')
    const helper = new JwtHelperService()
    const { tipo } = helper.decodeToken(token);
    if(tipo != 'Administrador') {
      this.router.navigate(['/administracion'])
      return
    }
    this.tablaUsuarios()
  }

  tablaUsuarios(): void {
      this.pronosticoService.obtenerUsuarios().subscribe(data => {
          this.usuarios = data
      })
  }

  nuevoUsuario(): void {
    if(this.formNuevoUsuario.invalid){
        Swal.fire('Error', 'Campos no validos', 'error')
        return
    }
    let index = this.roles.findIndex( x => x === this.formNuevoUsuario.value.tipoUsuario)
    if(index === -1) {
      Swal.fire('Error', 'Scope de role no valido') 
      return
    }
    this.pronosticoService.crearUsuario(this.formNuevoUsuario.value).subscribe(datos => {
      Swal.fire('Correcto', 'Usuario Creado correctamente', 'success')
      this.tablaUsuarios()
      this.formNuevoUsuario.reset()
    }, error => {
      Swal.fire('Error', error.error.mensaje, 'error')
    })
  }

  accion(id: string, estado: string): void {
    Swal.fire({
      title:'Esta accion requiere confirmacion',
      text: '¿Esta seguro de realizar esta accion?',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cambiar",
      cancelButtonText: "Cancelar"
    }).then((result)=> {
      if (result.isConfirmed) {
        this.pronosticoService.eliminarUsuario(id, estado).subscribe((resp:any) => {
          this.tablaUsuarios()
          Swal.fire('Correcto', resp.mensaje, 'success')
        }, error => {
          Swal.fire('Error', error.error.mensaje, 'error')
        })
      }
    })

  }

}
