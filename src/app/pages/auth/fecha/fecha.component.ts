import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PronosticoTs } from 'src/app/interfaces/PronosticoTs.interface';
import { PronosticosService } from 'src/app/services/pronosticos.service';

@Component({
  selector: 'app-fecha',
  templateUrl: './fecha.component.html',
  styleUrls: ['./fecha.component.css']
})
export class FechaComponent implements OnInit {

  public fecha: string
  public data: PronosticoTs
  public tabla: any = []
  public variable: HTMLSelectElement
  public referencia: number[] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]

  constructor(private activatedRoute:ActivatedRoute, private pronosticoService: PronosticosService) { }

  ngOnInit(): void {
    this.fecha = <string> this.activatedRoute.snapshot.paramMap.get('fecha');
    this.variable = <HTMLSelectElement>document.getElementById('variable')
    this.pronostico()
  }

  pronostico(): void {
    this.pronosticoService.obtenerPronosticoTs(this.fecha).subscribe(data => {
       this.data = data
       this.seleccion()
    })
  }

  seleccion(): void {
    if(this.variable.value.length == 0 || this.variable.value == '') {
      alert('Hola, ¿eres hacker?')
      return
    }
    this.tabla = this.data.propiedades.filter(x => x.variable === this.variable.value).sort((a:any, b:any) => a.hora - b.hora )
    this.referencia = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
  }

  subirpronostico(row: number): void {
    let file: HTMLInputElement = <HTMLInputElement> document.getElementById(`upload${row}`)
    console.log(file.files?.item(0))
    if(file.files?.item(0) === null) {
      alert('No se ha selecionado una imagen en la fila: ' + row)
      return
    }
    let pronostico = {
      variable: this.variable.value,
      hora: row,
      archivo: file.files?.item(0)
    }
    this.pronosticoService.subirPronosticoTs(pronostico, this.fecha).subscribe( resp => {
      this.pronostico()
    })
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
        event.target.files[0];
    }
  }
}
