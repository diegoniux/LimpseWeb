import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from '../../pages/clientes/clientes.component';
import { AdmorClientesComponent } from '../../pages/admor-clientes/admor-clientes.component';
import { OrdenesServicioComponent } from '../../pages/ordenes-servicio/ordenes-servicio.component';
import { ClienteDetalleComponent } from '../../pages/cliente-detalle/cliente-detalle.component';
import { ClienteResolver } from '../../pages/cliente-detalle/cliente-resolver.service';


const routes: Routes = [
  {
    path: '',
    component: ClientesComponent,
    children: [
      {
        path: 'clientes',
        component: AdmorClientesComponent,
      },
      {
        path: 'clientes/:id/:accion',
        component: ClienteDetalleComponent,
        resolve: {cliente: ClienteResolver}
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
export class ClientesRoutingModule { }
