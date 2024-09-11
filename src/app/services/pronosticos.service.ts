import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { PronosticoTs } from 'src/app/interfaces/PronosticoTs.interface';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/Usuario.interface';
import { Response } from '../interfaces/Response.interface';
import { Bitacora } from '../interfaces/Bitacora.inteface';

const url = environment.urlBackend

@Injectable({
  providedIn: 'root'
})

export class PronosticosService {

  constructor(private http: HttpClient) { }

  obtenerPronosticoTs(fecha: string): Observable<PronosticoTs> {
    return this.http.get<PronosticoTs>(`${url}/pronostico/${fecha}`)
  }

  obtenerPronosticosTs(): Observable<PronosticoTs[]> {
    return this.http.get<PronosticoTs[]>(`${url}/pronostico`)
  }

  subirPronosticoTs(pronostico: any, fecha: string): Observable<Response> {
    const formData = new FormData()
    formData.append('variable', pronostico.variable)
    formData.append('hora', pronostico.hora)
    formData.append('archivo', pronostico.archivo)
    return this.http.post<Response>(`${url}/pronostico/${fecha}`, formData, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  actualizarPronosticoTs(pronostico: any, fecha: string): Observable<Response> {
    const formData = new FormData()
    formData.append('variable', pronostico.variable)
    formData.append('hora', pronostico.hora)
    formData.append('archivo', pronostico.archivo)
    return this.http.put<Response>(`${url}/pronostico/${fecha}`, formData, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  subirGrafica(grafica: any, fecha: string): Observable<Response> {
    const formData = new FormData()
    formData.append('variable', grafica.variable)
    formData.append('archivo', grafica.archivo)
    return this.http.post<Response>(`${url}/pronostico/grafica/${fecha}`, formData, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  actualizarGrafica(grafica: any, fecha: string): Observable<Response> {
    const formData = new FormData()
    formData.append('variable', grafica.variable)
    formData.append('archivo', grafica.archivo)
    return this.http.put<Response>(`${url}/pronostico/grafica/${fecha}`, formData, {
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

  crearUsuario(body: any): Observable<Response> {
    return this.http.post<Response>(`${url}/auth/registrar`, body, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  buscarEmail(correo: string): Observable<Response> {
    let body = { correo }
    return this.http.post<Response>(`${url}/auth/formReset`, body)
  }

  resetPassword(body: any, token: string): Observable<Response> {
    return this.http.post<Response>(`${url}/auth/reset/${token}`, body)
  }

  eliminarUsuario(id: string, estado: string): Observable<Response> {
    let body = { id, estado }
    
    return this.http.put<Response>(`${url}/auth/eliminar`, body, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  eliminarPronostico(fecha: string, password: string): Observable<Response> {
    let body = {
      password: password
    }
    return this.http.delete<Response>(`${url}/pronostico/${fecha}`, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
      },
      body: body
    })
  }

  sesion(): Observable<boolean> {
    return this.http.get(`${url}/auth/validarSesion`,{
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
      }
    }).pipe( 
      tap( (resp:any) => resp),
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

  subirImagenes(fecha: string, files:any): Observable<Response> {
    const formData = new FormData()
    for(let file of files) {
      formData.append('archivo', file)
    }
    return this.http.post<Response>(`${url}/imagenes/${fecha}`, formData, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  obtenerBitacora(): Observable<Bitacora[]> {
   return this.http.get<Bitacora[]>(`${url}/bitacora`, {
    headers: {
      "Authorization" : `Bearer ${localStorage.getItem('token')}`
    }
  })
  }

}
