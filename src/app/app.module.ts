import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// para poder hacer peticiones http a servicio Rest
import { HttpClientModule } from '@angular/common/http';

// Rutas
import { AppRoutingModule } from './app-routing.module';

// Forms
// import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Componentes
import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { AlertModule } from './shared/_alert/alert.module';
import { ModalModule } from './shared/_modal';
import { CambioPasswComponent } from './pages/cambio-passw/cambio-passw.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    PerfilComponent,
    CambioPasswComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AlertModule,
    ModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
