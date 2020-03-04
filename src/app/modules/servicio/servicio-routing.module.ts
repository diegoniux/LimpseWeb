import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicioComponent } from '../../pages/servicio/servicio.component';
import { InsumosComponent } from '../../pages/insumos/insumos.component';
import { KitsComponent } from '../../pages/kits/kits.component';
import { PreciosComponent } from '../../pages/precios/precios.component';
import { AdmorServiciosComponent } from '../../pages/admor-servicios/admor-servicios.component';


const routes: Routes = [
  {
    path: '',
    component: ServicioComponent,
    children: [
      {
        path: 'servicios',
        component: AdmorServiciosComponent
      },
      {
        path: 'insumos',
        component: InsumosComponent
      },
      {
        path: 'kits',
        component: KitsComponent
      },
      {
        path: 'precios',
        component: PreciosComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicioRoutingModule { }
