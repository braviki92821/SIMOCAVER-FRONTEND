import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { PronosticosComponent } from './pages/pronosticos/pronosticos.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { PanelComponent } from './pages/auth/panel/panel.component';
import { CalendarioComponent } from './pages/auth/calendario/calendario.component';
import { FechaComponent } from './pages/auth/fecha/fecha.component';
import { AutenticadoGuard } from './guard/autenticado.guard';
import { UsuariosComponent } from './pages/auth/usuarios/usuarios.component';
import { DatabaseComponent } from './pages/auth/database/database.component';
import { FormOlvidePasswordComponent } from './pages/auth/form-olvide-password/form-olvide-password.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { RespaldoComponent } from './pages/auth/respaldo/respaldo.component';


const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full'},
  { path: 'inicio', component: InicioComponent },
  { path: 'pronosticos', component: PronosticosComponent }, 
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'agradecimientos', component: ContactoComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/olvideContraseña', component: FormOlvidePasswordComponent },
  { path: 'auth/reset-password/:token', component: ResetPasswordComponent },
  { path: 'administracion', component: PanelComponent, canActivate: [AutenticadoGuard] },
  { path: 'administracion/calendario', component: CalendarioComponent, canActivate: [AutenticadoGuard] },
  { path: 'administracion/calendario/fecha/:fecha', component: FechaComponent, canActivate: [AutenticadoGuard] },
  { path: 'administracion/usuarios', component: UsuariosComponent, canActivate: [AutenticadoGuard] },
  { path: 'administracion/datos', component: DatabaseComponent, canActivate: [AutenticadoGuard] },
  { path: 'administracion/respaldo', component: RespaldoComponent, canActivate: [AutenticadoGuard] },
  { path: '**', redirectTo: 'inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
