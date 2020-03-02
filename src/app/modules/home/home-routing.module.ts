import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../../pages/home/home.component';
import { PerfilComponent } from '../../pages/perfil/perfil.component';
import { CambioPasswComponent } from '../../pages/cambio-passw/cambio-passw.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'perfil',
        component: PerfilComponent
      },
      {
        path: 'cambio-passw',
        component: CambioPasswComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
