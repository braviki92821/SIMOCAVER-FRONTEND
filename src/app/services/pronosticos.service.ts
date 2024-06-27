import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Pronostico } from 'src/app/interfaces/Pronostico.interface';
import { PronosticoTs } from 'src/app/interfaces/PronosticoTs.interface';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/Usuario.interface';

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
    return this.http.get<PronosticoTs>(`${url}/pronostico/${fecha}`)
  }

  obtenerPronosticosTs(): Observable<PronosticoTs[]> {
    return this.http.get<PronosticoTs[]>(`${url}/pronostico`)
  }

  subirPronosticoTs(pronostico: any, fecha: string): Observable<Object> {
    const formData = new FormData()
    formData.append('variable', pronostico.variable)
    formData.append('hora', pronostico.hora)
    formData.append('archivo', pronostico.archivo)
    return this.http.post(`${url}/pronostico/${fecha}`, formData, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  actualizarPronosticoTs(pronostico: any, fecha: string): Observable<Object> {
    const formData = new FormData()
    formData.append('variable', pronostico.variable)
    formData.append('hora', pronostico.hora)
    formData.append('archivo', pronostico.archivo)
    return this.http.put(`${url}/pronostico/${fecha}`, formData, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  subirGrafica(grafica: any, fecha: string): Observable<Object> {
    const formData = new FormData()
    formData.append('variable', grafica.variable)
    formData.append('archivo', grafica.archivo)
    return this.http.post(`${url}/pronostico/grafica/${fecha}`, formData, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  actualizarGrafica(grafica: any, fecha: string): Observable<Object> {
    const formData = new FormData()
    formData.append('variable', grafica.variable)
    formData.append('archivo', grafica.archivo)
    return this.http.put(`${url}/pronostico/grafica/${fecha}`, formData, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  login(email: string, password: string): Observable<Object> {
    let body = {
      email,
      password
    }
    return this.http.post(`${url}/auth/autenticar`, body)
  }

  crearUsuario(body: any) {
    return this.http.post(`${url}/auth/registrar`, body, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  buscarEmail(correo: string): Observable<Object> {
    let body = { correo }
    return this.http.post(`${url}/auth/formReset`, body)
  }

  resetPassword(body: any, token: string): Observable<Object> {
    return this.http.post(`${url}/auth/reset/${token}`, body)
  }

  eliminarPronostico(fecha: string, password: string): Observable<Object> {
    let body = {
      password: password
    }
    return this.http.delete(`${url}/pronostico/${fecha}`, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
      },
      body: body
    })
  }

  sesion() {
    return this.http.get(`${url}/auth/validarSesion`,{
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
      }
    }).pipe( 
      tap( (resp:any) => {console.log(resp)}),
      map( resp => true),
      catchError( error => of(false))
    )
   
  }

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${url}/auth/usuarios`, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

}
