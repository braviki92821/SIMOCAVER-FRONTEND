import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  public calendario: HTMLDivElement

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.calendario = <HTMLDivElement> document.getElementById('calendario')
    
  }

  mostrarAnimacion(){
    this.calendario.classList.add('bg-secondary')
  }

  quitarAnimacion() {
    this.calendario.classList.remove('bg-secondary')
  }

  calendarioLink() {
    this.router.navigate(['/administracion/calendario'])
  }

}
