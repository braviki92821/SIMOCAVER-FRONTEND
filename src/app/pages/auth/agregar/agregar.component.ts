import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  public fecha: string
  public selecc: HTMLInputElement
  public row: HTMLTableSectionElement
  public tabla = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]

  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.fecha = <string> this.activatedRoute.snapshot.paramMap.get('fecha');
    this.selecc = <HTMLInputElement> document.getElementById('selecc')
    this.row = <HTMLTableSectionElement> document.getElementById('rows')
    console.log(this.row.rows)
  }

  seleccion(): void {
    this.tabla.map( x => {
      console.log(document.getElementById(`file${x}`))
    })
  }


}
