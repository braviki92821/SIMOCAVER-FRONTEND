import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PronosticosService } from 'src/app/services/pronosticos.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  public fecha: string
  public tabla = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
  public formSubmmited: boolean = false
  public data: any = []
  

  public formPronostico: FormGroup = this.fb.group({
      variable: ['', Validators.required],
      hora: ['', Validators.required],
      archivo: []
  })

  constructor(private activatedRoute:ActivatedRoute, private pronosticoService: PronosticosService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.fecha = <string> this.activatedRoute.snapshot.paramMap.get('fecha');
    this.pronostico()
  }

  subir(): void{
    this.formSubmmited = true
    if(this.formPronostico.invalid) {
      this.formSubmmited = false
      return
    }

    if(this.formPronostico.value.archivo === null) {
      alert('No ha seleccionado una imagen')
      this.formSubmmited = false
      return
    }

    this.pronosticoService.subirPronosticoTs(this.formPronostico.value, this.fecha).subscribe( resp => {
      console.log(resp)
    })
    this.formPronostico.reset()
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formPronostico.get('archivo')?.setValue(file)
    }
  }

  pronostico() {
    this.pronosticoService.obtenerPronosticoTs(this.fecha).subscribe(data => {
      console.log(data)
    })
  }

  
}
