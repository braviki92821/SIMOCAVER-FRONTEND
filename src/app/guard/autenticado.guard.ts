import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { tap } from 'rxjs';
import Swal from 'sweetalert2';
import { PronosticosService } from '../services/pronosticos.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticadoGuard implements CanActivate {

  constructor(private pronosticoService: PronosticosService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.pronosticoService.sesion().pipe(
      tap(autenticado => {
        if(!autenticado) {
          localStorage.removeItem('token')
          Swal.fire('Sesion terminada', 'Vuelva iniciar sesion', 'info')
          this.router.navigate(['/auth/login'])
        }
      })
    )
  }
  
}
