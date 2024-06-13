import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { PronosticosComponent } from './pages/pronosticos/pronosticos.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { PanelComponent } from './pages/auth/panel/panel.component';
import { CalendarioComponent } from './pages/auth/calendario/calendario.component';
import { FechaComponent } from './pages/auth/fecha/fecha.component';
import { AgregarComponent } from './pages/auth/agregar/agregar.component';
import { AutenticadoGuard } from './guard/autenticado.guard';


const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full'},
  { path: 'inicio', component: InicioComponent },
  { path: 'pronosticos', component: PronosticosComponent }, 
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'agradecimientos', component: ContactoComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'administracion', component: PanelComponent, canActivate: [AutenticadoGuard] },
  { path: 'administracion/calendario', component: CalendarioComponent, canActivate: [AutenticadoGuard] },
  { path: 'administracion/calendario/fecha/:fecha', component: FechaComponent, canActivate: [AutenticadoGuard] },
  { path: 'administracion/calendario/agregar/:fecha', component: AgregarComponent, canActivate: [AutenticadoGuard] },
  { path: '**', redirectTo: 'inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
