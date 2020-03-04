import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from '../../pages/clientes/clientes.component';
import { AdmorClientesComponent } from '../../pages/admor-clientes/admor-clientes.component';
import { OrdenesServicioComponent } from '../../pages/ordenes-servicio/ordenes-servicio.component';


const routes: Routes = [
  {
    path: '',
    component: ClientesComponent,
    children: [
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
export class ClientesRoutingModule { }
