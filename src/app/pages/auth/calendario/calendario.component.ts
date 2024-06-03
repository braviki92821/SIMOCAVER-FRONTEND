import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { DateClickArg } from '@fullcalendar/interaction';
import { PronosticosService } from 'src/app/services/pronosticos.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  public events: any = []
  calendarOptions: CalendarOptions

  constructor(private pronosticoService: PronosticosService, private router: Router) { }

  ngOnInit(): void {
    //this.pronostico()
    this.pronosticoTest()
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, interactionPlugin],
      dateClick: (arg) => this.handleDateClick(arg),
    };
  }

  handleDateClick(arg: DateClickArg) {
  
    // let index: number = this.events.findIndex((x:any) => x.date === arg.dateStr)

    // if( index === -1) {
    //   this.router.navigate([`administracion/calendario/agregar/${arg.dateStr}`])
    //   return
    // }
    this.router.navigate([`administracion/calendario/fecha/${arg.dateStr}`])
  }

  pronostico(): void{
    this.pronosticoService.obtenerPronosticos().subscribe(datos => {
      let data: Object[] = []
      datos.map(x => {
        data.push({ title: x.variable, date: x.fecha, backgroundColor: 'blue' })
      })
      this.events = data
    })
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
