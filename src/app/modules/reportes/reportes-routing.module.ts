import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportesComponent } from '../../pages/reportes/reportes.component';
import { ResumenServicioComponent } from '../../pages/resumen-servicio/resumen-servicio.component';
import { UsuariosComponent } from '../../pages/usuarios/usuarios.component';
import { ClientesComponent } from '../../pages/clientes/clientes.component';
import { OrdenesServicioComponent } from '../../pages/ordenes-servicio/ordenes-servicio.component';
import { AdmorClientesComponent } from '../../pages/admor-clientes/admor-clientes.component';


const routes: Routes = [
  {
    path: '',
    component: ReportesComponent,
    children: [
      {
        path: 'resumen',
        component: ResumenServicioComponent
      },
      {
        path: 'usuarios',
        component: UsuariosComponent
      },
      {
        path: 'clientes',
        component: AdmorClientesComponent
      },
      {
        path: 'ordenes',
        component: OrdenesServicioComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule { }
