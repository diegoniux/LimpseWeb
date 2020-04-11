import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SistemaComponent } from '../../pages/sistema/sistema.component';
import { UsuariosComponent } from '../../pages/usuarios/usuarios.component';
import { CatalogosComponent } from 'src/app/pages/catalogos/catalogos.component';
import { SeguridadComponent } from '../../pages/seguridad/seguridad.component';
import { AdmorTecnicosComponent } from '../../pages/admor-tecnicos/admor-tecnicos.component';


const routes: Routes = [
  {
    path: '',
    component: SistemaComponent,
    children: [
      {
        path: 'usuarios',
        component: UsuariosComponent
      },
      {
        path: 'catalogos',
        component: CatalogosComponent
      },
      {
        path: 'seguridad',
        component: SeguridadComponent
      },
      {
        path: 'tecnicos',
        component: AdmorTecnicosComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SistemaRoutingModule { }
