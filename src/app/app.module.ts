import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { FooterComponent } from './pages/footer/footer.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { PronosticosComponent } from './pages/pronosticos/pronosticos.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InicioComponent,
    FooterComponent,
    ContactoComponent,
    PronosticosComponent,
    NosotrosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
