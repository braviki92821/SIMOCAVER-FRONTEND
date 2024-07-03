import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PronosticoTs } from 'src/app/interfaces/PronosticoTs.interface';
import { PronosticosService } from 'src/app/services/pronosticos.service';
import SwalFire from 'sweetalert2'

@Component({
  selector: 'app-fecha',
  templateUrl: './fecha.component.html',
  styleUrls: ['./fecha.component.css']
})
export class FechaComponent implements OnInit {

  public fecha: string
  public data: PronosticoTs
  public tabla: any = []
  public grafica: any = []
  public variable: HTMLSelectElement
  public referencia: number[] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
  private regex: RegExp = /^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))$/

  constructor(private activatedRoute:ActivatedRoute, private pronosticoService: PronosticosService, private router: Router) { }

  ngOnInit(): void {
    this.fecha = <string> this.activatedRoute.snapshot.paramMap.get('fecha');
    if(!this.regex.test(this.fecha)) {
      SwalFire.fire('Error', 'Formato de fecha no valido', 'error')
    }
    this.variable = <HTMLSelectElement>document.getElementById('variable')
    this.pronostico()
  }

  pronostico(): void {
    this.pronosticoService.obtenerPronosticoTs(this.fecha).subscribe(data => {
       this.data = data
       this.seleccion()
    }, (error) => {
      SwalFire.fire('Mensaje de Error', error.error.mensaje, 'error')
    })
  }

  seleccion(): void {
    if(this.variable.value.length == 0 || this.variable.value == '') {
      SwalFire.fire('¿A donde vas?', '¿Eres hacker?', 'question')
      return
    }
    this.tabla = this.data.propiedades.filter(x => x.variable === this.variable.value).sort((a:any, b:any) => a.hora - b.hora )
    this.grafica = this.data.graficas.filter(x => x.variable === this.variable.value)
  }

  subirpronostico(row: number): void {
    let file: HTMLInputElement = <HTMLInputElement> document.getElementById(`upload${row}`)
    if(file.files?.item(0) === null) {
      SwalFire.fire('Mensaje de Error', `No se ha seleccionado un archivo en la fila: ${row}`, 'error')
      return
    }

    let pronostico = {
      variable: this.variable.value,
      hora: row,
      archivo: file.files?.item(0)
    }

    this.pronosticoService.subirPronosticoTs(pronostico, this.fecha).subscribe((resp) => {
      SwalFire.fire('Correcto', resp.mensaje, 'success')   
    }, (error) => {
      SwalFire.fire('Error', error.error.mensaje, 'error')
      if(error.error.mensaje == "Token expirado vuelva a iniciar sesion") {
         localStorage.removeItem('token')
         this.router.navigate(['/auth/login'])
      }

      if(error.error.mensaje == "Token alterado o invalido") {
        localStorage.removeItem('token')
        this.router.navigate(['/auth/login'])
      }
    }, () => {
      this.pronostico()
    })
  }

  modificarPronostico(row: number): void {
    let file: HTMLInputElement = <HTMLInputElement> document.getElementById(`upload${row}`)
    if(file.files?.item(0) === null) {
      SwalFire.fire('Mensaje de Error', `No se ha seleccionado un archivo en la fila: ${row}`, 'error')
      return
    }

    let pronostico = {
      variable: this.variable.value,
      hora: row,
      archivo: file.files?.item(0)
    }
    this.pronosticoService.actualizarPronosticoTs(pronostico, this.fecha).subscribe(resp => {
      SwalFire.fire('Correcto', resp.mensaje, 'success')
    }, (error) => {
      SwalFire.fire('Error', error.error.mensaje, 'error')
    },() => {
      this.pronostico()
    })
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
        event.target.files[0];
    }
  }

  trueIndex(index: number): number {
    return this.tabla.findIndex((x:any) => x.hora === index)
  }

  subirGrafica(): void {
    let file: HTMLInputElement = <HTMLInputElement> document.getElementById('grafica')
    if(file.files?.item(0) === null) {
      SwalFire.fire('Mensaje de Error', 'No se ha seleccionado un archivo', 'error')
      return
    }

    let grafica =  {
      variable: this.variable.value,
      archivo: file.files?.item(0)
    }

    this.pronosticoService.subirGrafica(grafica, this.fecha).subscribe(datos => {
      SwalFire.fire('Correcto', datos.mensaje, 'success')
    }, error => {
      SwalFire.fire('Error', error.error.mensaje, 'error')
      if(error.error.mensaje == "Token expirado vuelva a iniciar sesion") {
         localStorage.removeItem('token')
         this.router.navigate(['/auth/login'])
      }

      if(error.error.mensaje == "Token alterado o invalido") {
        localStorage.removeItem('token')
        this.router.navigate(['/auth/login'])
      }
    }, () => {
      this.pronostico()
    })
  }

  modificarGrafica(): void {
    let file: HTMLInputElement = <HTMLInputElement> document.getElementById('grafica')
    if(file.files?.item(0) === null) {
      SwalFire.fire('Mensaje de Error', 'No se ha seleccionado un archivo', 'error')
      return
    }

    let grafica =  {
      variable: this.variable.value,
      archivo: file.files?.item(0)
    }

    this.pronosticoService.actualizarGrafica(grafica, this.fecha).subscribe(datos => {
      SwalFire.fire('Correcto', datos.mensaje, 'success')
    }, error => {
      SwalFire.fire('Error', error.error.mensaje, 'error')
      if(error.error.mensaje == "Token expirado vuelva a iniciar sesion") {
         localStorage.removeItem('token')
         this.router.navigate(['/auth/login'])
      }

      if(error.error.mensaje == "Token alterado o invalido") {
        localStorage.removeItem('token')
        this.router.navigate(['/auth/login'])
      }
    }, () => {
       this.pronostico()
    })
  }
}
