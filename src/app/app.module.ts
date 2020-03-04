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
import { ServicioComponent } from './pages/servicio/servicio.component';
import { InsumosComponent } from './pages/insumos/insumos.component';
import { KitsComponent } from './pages/kits/kits.component';
import { PreciosComponent } from './pages/precios/precios.component';
import { SistemaComponent } from './pages/sistema/sistema.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { OrdenesServicioComponent } from './pages/ordenes-servicio/ordenes-servicio.component';
import { ResumenServicioComponent } from './pages/resumen-servicio/resumen-servicio.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { CatalogosComponent } from './pages/catalogos/catalogos.component';
import { SeguridadComponent } from './pages/seguridad/seguridad.component';
import { AdmorServiciosComponent } from './pages/admor-servicios/admor-servicios.component';
import { AdmorClientesComponent } from './pages/admor-clientes/admor-clientes.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    PerfilComponent,
    CambioPasswComponent,
    ServicioComponent,
    InsumosComponent,
    KitsComponent,
    PreciosComponent,
    SistemaComponent,
    ClientesComponent,
    ReportesComponent,
    OrdenesServicioComponent,
    ResumenServicioComponent,
    UsuariosComponent,
    CatalogosComponent,
    SeguridadComponent,
    AdmorServiciosComponent,
    AdmorClientesComponent
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
