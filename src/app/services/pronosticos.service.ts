import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pronostico } from 'src/app/interfaces/Pronostico.interface';
import { PronosticoTs } from 'src/app/interfaces/PronosticoTs.interface';

@Injectable({
  providedIn: 'root'
})

export class PronosticosService {

  constructor(private http: HttpClient) { }

  obtenerPronostico(fecha: string): Observable<Pronostico[]>  {
    const url = `http://localhost:3000/pronostico/${fecha}`
    return this.http.get<Pronostico[]>(url)
  }

  obtenerPronosticos(): Observable<Pronostico[]> {
    const url = 'http://localhost:3000/pronostico'
    return this.http.get<Pronostico[]>(url)
  }

  obtenerPronosticoTs(fecha: string): Observable<PronosticoTs[]> {
    const url = `http://localhost:3000/pronosticotest/${fecha}`
    return this.http.get<PronosticoTs[]>(url)
  }

  obtenerPronosticosTs(): Observable<PronosticoTs[]> {
    const url = 'http://localhost:3000/pronosticotest'
    return this.http.get<PronosticoTs[]>(url)
  }

}
