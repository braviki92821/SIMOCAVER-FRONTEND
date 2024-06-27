import { trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  mostrarAnimacion(div: string){
    //this.calendario.classList.add('bg-secondary')
    let divElement: HTMLDivElement = <HTMLDivElement>document.getElementById(div) 
    divElement.children[0].classList.add('bg-secondary')
  }

  quitarAnimacion(div: string) {
    let divElement: HTMLDivElement = <HTMLDivElement>document.getElementById(div) 
    divElement.children[0].classList.remove('bg-secondary')
  }

  divAccion(div: string) {
    if(div != 'close') {
      this.router.navigate([`/administracion/${div}`])
      return
    }
    
    Swal.fire({
        title: '¿Estas Seguro?',
        text: 'Volveras a iniciar sesion',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d60',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'Cancelar'
    }).then((result)=> {
        if(result.value) {
          localStorage.removeItem('token')
          this.router.navigate(['/auth/login'])
        }
    })
  }

}
