import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pronostico } from 'src/interfaces/Pronostico.interface';

@Injectable({
  providedIn: 'root'
})

export class PronosticosService {

  constructor(private http: HttpClient) { }

  obtenerPronostico(fecha: string): Observable<Pronostico[]>  {
    const url = `http://localhost:3000/pronostico/${fecha}`
    return this.http.get<Pronostico[]>(url)
  }

}
