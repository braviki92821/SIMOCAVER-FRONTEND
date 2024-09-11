import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Animacion } from 'src/app/interfaces/Animacion.interface';
import { Grafica } from 'src/app/interfaces/Grafica.interface';
import { PronosticosService } from 'src/app/services/pronosticos.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pronosticos',
  templateUrl: './pronosticos.component.html',
  styleUrls: ['./pronosticos.component.css']
})

export class PronosticosComponent implements OnInit {

  public fecha: HTMLInputElement
  public btnPlay: HTMLInputElement
  public btnPause: HTMLElement
  public imgSource: HTMLImageElement
  private graficaSourse: HTMLImageElement
  public variable: HTMLSelectElement
  public fechaActual = new Date().toISOString().split('T')[0];
  public time: any
  private pronostico: Animacion[]
  private grafica: Grafica[]
  private url = environment.urlBackend

  constructor(private pronosticoService: PronosticosService) { 
  }

  ngOnInit(): void {
    this.fecha = <HTMLInputElement> document.querySelector('input[type="date"]')
    this.btnPlay = <HTMLInputElement> document.getElementById('progress')
    this.btnPause = <HTMLElement> document.getElementById('play-pause')
    this.imgSource = <HTMLImageElement> document.getElementById('imgSource')
    this.graficaSourse = <HTMLImageElement> document.getElementById('graficSource')
    this.variable = <HTMLSelectElement> document.getElementById('variable')
    this.fecha.value = this.fechaActual
    this.seleccionTest()
  }
  
  animation(): void {

    if(typeof this.time === "undefined" && this.pronostico.length != 0) {
      this.btnPause.classList.remove('bi-play') 
      this.btnPause.classList.add('bi-pause')
      this.time = this.play()
    } else {
        this.btnPause.classList.remove('bi-pause')
        this.btnPause.classList.add('bi-play')
        this.pause(this.play())
        this.pause(this.time)
        this.time = undefined
    }
     
  }

  play(): NodeJS.Timeout  {
    let cont: number = Number(this.btnPlay.value)
    let t = setInterval(() => {
      let file = this.pronostico[cont].archivo
      this.btnPlay.value = cont.toString()
      this.imgSource.src = `${this.url}/uploads/${this.fecha.value}/${file}`
      cont++
      if(cont === 25) {
        this.btnPlay.value = '0'
        cont = 0
      }
    }, 1000)
    return t
  }

  pause(time: NodeJS.Timeout): void {
    if(time) {
      clearInterval(time)
    }
  }

  seleccionTest(): void {

    const regex = /^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))$/

    if(!regex.test(this.fecha.value)) {
      alert('Formato de fecha no valido')
      return
    }

    this.pronosticoService.obtenerPronosticoTs(this.fecha.value).subscribe(datos => {

      if(datos === null) { 
        this.pronostico = []
        this.grafica = []
        this.btnPlay.value = '0'
        this.imgSource.src = './assets/NoImage.jpg'
        this.graficaSourse.src =  './assets/NoImage.jpg'
        return
      }

      this.pronostico = datos.propiedades.filter( x => x.variable === this.variable.value)
      this.grafica = datos.graficas.filter( x => x.variable === this.variable.value)
      
      if(this.pronostico.length == 0) {
        this.imgSource.src = './assets/NoImage.jpg'
        this.btnPlay.value = '0'
        clearInterval(this.time)
        return
      }
      
      this.pronostico = this.pronostico.sort((a, b) => a.hora - b.hora )
      this.animation()
    })
  }

  mostrarGrafica(): void {
    if(this.grafica.length === 0){
      this.graficaSourse.src =  './assets/NoImage.jpg'
      return
    }
     
    this.graficaSourse.src = `${this.url}/uploads/${this.fecha.value}/${this.grafica[0].archivo}`     
  }
}

