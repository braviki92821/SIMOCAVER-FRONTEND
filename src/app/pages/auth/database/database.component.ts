import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PronosticoTs } from 'src/app/interfaces/PronosticoTs.interface';
import { PronosticosService } from 'src/app/services/pronosticos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements OnInit {

  public datos: PronosticoTs[]

  constructor(private pronosticoService: PronosticosService, private router: Router) { }

  ngOnInit(): void {
    this.pronosticos()
  }

  pronosticos() {
    this.pronosticoService.obtenerPronosticosTs().subscribe(datos => {
        this.datos = datos
    })
  }

  eliminar(fecha: string): void {
    Swal.fire({
      title:'Esta accion requiere confirmacion',
      text: 'Escriba su contraseña',
      input: 'password',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
         this.pronosticoService.eliminarPronostico(fecha, result.value).subscribe((resp:any) => {
            Swal.fire('¡Eliminado!', resp.mensaje, 'success')
            this.pronosticos()
         }, error => {
            Swal.fire('Error', error.error.mensaje, 'error')
            if(error.error.mensaje == "Token expirado vuelva a iniciar sesion") {
              localStorage.removeItem('token')
              this.router.navigate(['/auth/login'])
           }
     
           if(error.error.mensaje == "Token alterado o invalido") {
             localStorage.removeItem('token')
             this.router.navigate(['/auth/login'])
           }
         })
      }
    })

  }

}
