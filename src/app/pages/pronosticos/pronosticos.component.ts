import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pronosticos',
  templateUrl: './pronosticos.component.html',
  styleUrls: ['./pronosticos.component.css']
})
export class PronosticosComponent implements OnInit {

  public fecha: any
  public btnPlay: any
  public imgSource: any
  public variable: any
  public fechaActual = new Date().toISOString().split('T')[0];

  constructor() { 
  }

  ngOnInit(): void {
    this.fecha = document.querySelector('input[type="date"]')
    this.btnPlay = document.getElementById('progress')
    this.imgSource = document.getElementById('imgSource')
    this.variable = document.getElementById('variable')
    this.fecha.value = this.fechaActual
    console.log(this.fecha.value)
    console.log(this.variable.value)
  }

  play(): void {
      let cont = this.btnPlay.value

      const time = setInterval(() => {
          cont++ 
          this.btnPlay.value = cont
          this.imgSource.src = `./assets/T2-Pronostico-2023-06-01h${cont}-00-18.jpeg`
        
          if(cont === 24) {
            clearInterval(time)
            console.log(cont)
            this.btnPlay.value = 0
          }
      }, 1000)
        
  }

  seleccion(): void {
    console.log(this.fecha.value)
    console.log(this.variable.value)
  }

}
