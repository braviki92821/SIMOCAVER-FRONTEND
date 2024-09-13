import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { DateClickArg } from '@fullcalendar/interaction';
import { PronosticosService } from 'src/app/services/pronosticos.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Router } from '@angular/router';
import { Eventos } from 'src/app/interfaces/Eventos.interface';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  public events: Eventos[]
  calendarOptions: CalendarOptions

  constructor(private pronosticoService: PronosticosService, private router: Router) { }

  ngOnInit(): void {
    this.pronosticoTest()
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, interactionPlugin],
      dateClick: (arg) => this.handleDateClick(arg),
    };
  }

  handleDateClick(arg: DateClickArg) {
    this.router.navigate([`administracion/calendario/fecha/${arg.dateStr}`])
  }

  pronosticoTest(): void{
    this.pronosticoService.obtenerPronosticosTs().subscribe(datos => {
      let data: any = []
      datos.map( x => {
        data.push({ title: 'Visualizar Datos', date: x.fecha, backgroundColor: 'blue' })
      })
      this.events = data
    })
  }

}
