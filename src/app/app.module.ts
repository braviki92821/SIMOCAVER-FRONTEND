import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from "@auth0/angular-jwt"

import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { FooterComponent } from './pages/footer/footer.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { PronosticosComponent } from './pages/pronosticos/pronosticos.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { PanelComponent } from './pages/auth/panel/panel.component';
import { CalendarioComponent } from './pages/auth/calendario/calendario.component';
import { FechaComponent } from './pages/auth/fecha/fecha.component';
import { HeaderAuthComponent } from './pages/auth/header-auth/header-auth.component';
import { UsuariosComponent } from './pages/auth/usuarios/usuarios.component';
import { DatabaseComponent } from './pages/auth/database/database.component';
import { FormOlvidePasswordComponent } from './pages/auth/form-olvide-password/form-olvide-password.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { RespaldoComponent } from './pages/auth/respaldo/respaldo.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InicioComponent,
    FooterComponent,
    ContactoComponent,
    PronosticosComponent,
    NosotrosComponent,
    LoginComponent,
    PanelComponent,
    CalendarioComponent,
    FechaComponent,
    HeaderAuthComponent,
    UsuariosComponent,
    DatabaseComponent,
    FormOlvidePasswordComponent,
    ResetPasswordComponent,
    RespaldoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FullCalendarModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter:  () => localStorage.getItem('token')
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
