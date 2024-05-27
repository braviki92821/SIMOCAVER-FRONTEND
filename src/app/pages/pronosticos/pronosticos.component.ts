import { Component, OnInit } from '@angular/core';
import { PronosticosService } from 'src/app/services/pronosticos.service';
import { Pronostico } from 'src/interfaces/Pronostico.interface';

@Component({
  selector: 'app-pronosticos',
  templateUrl: './pronosticos.component.html',
  styleUrls: ['./pronosticos.component.css']
})
export class PronosticosComponent implements OnInit {

  public fecha: any
  public btnPlay: any
  public btnPause: any
  public imgSource: any
  public variable: any
  public fechaActual = new Date().toISOString().split('T')[0];
  public time: any
  public pronosticos: Pronostico[]

  constructor(private pronosticoService: PronosticosService) { 
  }

  ngOnInit(): void {
    this.fecha = document.querySelector('input[type="date"]')
    this.btnPlay = document.getElementById('progress')
    this.btnPause = document.getElementById('play-pause')
    this.imgSource = document.getElementById('imgSource')
    this.variable = document.getElementById('variable')
    this.fecha.value = this.fechaActual
    this.seleccion()
  }

  animation(): void {
    if(typeof this.time === "undefined" && this.pronosticos.length != 0) {
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
    let cont = this.btnPlay.value
    let t = setInterval(() => {
      let file = this.pronosticos[cont].archivo
      this.btnPlay.value = cont
      this.imgSource.src = `http://localhost:3000/uploads/${file}`
      cont++
      if(cont === 24) {
        clearInterval(t)
        this.btnPlay.value = 0
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
    console.log(this.imgSource)
    this.pronosticoService.obtenerPronostico(this.fecha.value).subscribe(datos => {
      console.log(datos) 
      if(datos.length == 0) {  
        this.imgSource.src = './assets/NoImage.jpg'
        return
      }
      this.pronosticos = datos.filter( x => x.variable === this.variable.value)
     // console.log(this.pronosticos.sort(x => x.hora))
      this.animation()
    })
  }

}
