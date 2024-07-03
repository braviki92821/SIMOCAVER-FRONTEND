import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PronosticoTs } from 'src/app/interfaces/PronosticoTs.interface';
import { PronosticosService } from 'src/app/services/pronosticos.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements OnInit {

  public datos: PronosticoTs[]
  private url = environment.urlBackend
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
         this.pronosticoService.eliminarPronostico(fecha, result.value).subscribe(resp => {
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

  fecha(date: string): void {
    this.router.navigate([`/administracion/calendario/fecha/${date}`])
  }

  descargarImagenes(fecha:string) {
    const a = document.createElement("a");
    this.pronosticoService.obtenerPronosticoTs(fecha).subscribe(datos => {
      datos.propiedades.forEach(element => {
        a.href = `${this.url}/Uploads/${fecha}/${element.archivo}`
        a.download = element.archivo
        a.click();
      })
      datos.graficas.forEach(element => {
        a.href = `${this.url}/Uploads/${fecha}/${element.archivo}`
        a.download= element.archivo
        a.click();
      })
    })
  }

  subirImagenes(fecha:string) {
    const input = document.createElement('input')
    input.type = "file"
    input.multiple = true
    input.click()
    input.addEventListener('change', (e:any) => {
        console.log(e.target.files)
        this.pronosticoService.subirImagenes(fecha, e.target.files).subscribe((resp:any) =>{
          Swal.fire('Correcto', resp.mensaje, 'error')
        }, error => {
          Swal.fire('Error', error.error.mensaje, 'error')
        })
    })

  }

}
