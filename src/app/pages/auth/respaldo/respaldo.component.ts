import { Component, OnInit } from '@angular/core';
import { PronosticosService } from 'src/app/services/pronosticos.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-respaldo',
  templateUrl: './respaldo.component.html',
  styleUrls: ['./respaldo.component.css']
})
export class RespaldoComponent implements OnInit {

  constructor(private pronosticoService: PronosticosService) { }

  ngOnInit(): void {
  }

  descargar(): void{
    this.pronosticoService.obtenerPronosticosTs().subscribe(resp => {
      const a = document.createElement("a");
      const archivo = new Blob([JSON.stringify(resp, undefined, 2)], { type: 'application/json;charset=utf-8' });
      const urla = URL.createObjectURL(archivo);
      a.href = urla;
      a.download = 'CopiaSeguridadDatos';
      a.click();
      URL.revokeObjectURL(urla);
    }, error => {
      Swal.fire('Error', error.error.mensaje, 'error')
    })
  }

}
