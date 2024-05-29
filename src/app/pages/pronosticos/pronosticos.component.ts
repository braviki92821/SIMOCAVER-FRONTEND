import { Component, OnInit } from '@angular/core';
import { PronosticosService } from 'src/app/services/pronosticos.service';
import { Pronostico } from 'src/app/interfaces/Pronostico.interface';
import { PronosticoTs } from 'src/app/interfaces/PronosticoTs.interface';

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
  public variable: HTMLSelectElement
  public fechaActual = new Date().toISOString().split('T')[0];
  public time: any
  public pronosticos: Pronostico[]
  public pronosticosTs: any

  constructor(private pronosticoService: PronosticosService) { 
  }

  ngOnInit(): void {
    this.fecha = <HTMLInputElement> document.querySelector('input[type="date"]')
    this.btnPlay = <HTMLInputElement> document.getElementById('progress')
    this.btnPause = <HTMLElement> document.getElementById('play-pause')
    this.imgSource = <HTMLImageElement> document.getElementById('imgSource')
    this.variable = <HTMLSelectElement> document.getElementById('variable')
    this.fecha.value = this.fechaActual
    //this.seleccion()
    this.seleccionTest()
  }

  animation(): void {
    // if(typeof this.time === "undefined" && this.pronosticos.length != 0) {
    //   this.btnPause.classList.remove('bi-play') 
    //   this.btnPause.classList.add('bi-pause')
    //   this.time = this.play()
    // } else {
    //     this.btnPause.classList.remove('bi-pause')
    //     this.btnPause.classList.add('bi-play')
    //     this.pause(this.play())
    //     this.pause(this.time)
    //     this.time = undefined
    // }

    if(typeof this.time === "undefined" && this.pronosticosTs.length != 0) {
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
      //let file = this.pronosticos[cont].archivo
      let file = this.pronosticosTs[cont].archivo
      this.btnPlay.value = cont.toString()
      //this.imgSource.src = `http://localhost:3000/uploads/${file}`
      this.imgSource.src = `http://localhost:3000/uploads/test/${file}`
      cont++
      if(cont === 24) {
        clearInterval(t)
        this.btnPlay.value = '0'
        this.time = undefined
      }
    }, 1000)
    return t
  }

  pause(time: NodeJS.Timeout): void {
    if(time) {
      clearInterval(time)
    }
  }

  seleccion(): void {
    this.pronosticoService.obtenerPronostico(this.fecha.value).subscribe(datos => {
      if(datos.length == 0) { 
        this.pronosticos = datos
        this.btnPlay.value = '0'
        this.imgSource.src = './assets/NoImage.jpg'
        return
      }
      this.pronosticos = datos.filter( x => x.variable === this.variable.value)
      this.animation()
    })
  }

  seleccionTest(): void {
    this.pronosticoService.obtenerPronosticoTs(this.fecha.value).subscribe(datos => {
      if(datos.length == 0) { 
        this.pronosticosTs = datos
        this.btnPlay.value = '0'
        this.imgSource.src = './assets/NoImage.jpg'
        return
      }
      this.pronosticosTs = datos.map(x => x.propiedades.filter( x => x.variable === this.variable.value))
      this.pronosticosTs = this.pronosticosTs[0].sort((a:any, b:any) => a.hora - b.hora )
      this.animation()
    })
  }
}

