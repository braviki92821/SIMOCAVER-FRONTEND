import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pronostico } from 'src/app/interfaces/Pronostico.interface';
import { PronosticoTs } from 'src/app/interfaces/PronosticoTs.interface';
import { environment } from 'src/environments/environment';

const url = environment.urlBackend

@Injectable({
  providedIn: 'root'
})

export class PronosticosService {

  constructor(private http: HttpClient) { }

  obtenerPronostico(fecha: string): Observable<Pronostico[]>  {
    return this.http.get<Pronostico[]>(`${url}/pronostico/${fecha}`)
  }

  obtenerPronosticos(): Observable<Pronostico[]> {
    return this.http.get<Pronostico[]>(`${url}/pronostico`)
  }

  subirpronostico(pronostico: any, fecha: string): Observable<Object> {
    const formData = new FormData()
    
    formData.append('variable', pronostico.variable)
    formData.append('fecha', fecha)
    formData.append('hora', pronostico.hora)
    formData.append('archivo', pronostico.archivo)
    return this.http.post(`${url}/pronostico`, formData)
  }

  obtenerPronosticoTs(fecha: string): Observable<PronosticoTs> {
    return this.http.get<PronosticoTs>(`${url}/pronosticotest/${fecha}`)
  }

  obtenerPronosticosTs(): Observable<PronosticoTs[]> {
    return this.http.get<PronosticoTs[]>(`${url}/pronosticotest`)
  }

  subirPronosticoTs(pronostico: any, fecha: string): Observable<Object> {
    const formData = new FormData()
    formData.append('variable', pronostico.variable)
    formData.append('hora', pronostico.hora)
    formData.append('archivo', pronostico.archivo)
    return this.http.post(`${url}/pronosticotest/${fecha}`, formData)
  }

  actualizarPronosticoTs(pronostico: any, fecha: string): Observable<Object> {
    const formData = new FormData()
    formData.append('variable', pronostico.variable)
    formData.append('hora', pronostico.hora)
    formData.append('archivo', pronostico.archivo)
    return this.http.put(`${url}/pronosticotest/${fecha}`, formData)
  }

}
