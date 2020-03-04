import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeModule } from './modules/home/home.module';
import { ServicioModule } from './modules/servicio/servicio.module';
import { ClientesModule } from './modules/clientes/clientes.module';
import { ReportesModule } from './modules/reportes/reportes.module';
import { SistemaModule } from './modules/sistema/sistema.module';


const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
   path: 'home',
   loadChildren: () => import('./modules/home/home.module').then(m => HomeModule)
  },
  {
    path: 'sistema',
    loadChildren: () => import('./modules/sistema/sistema.module').then(m => SistemaModule)
   },
  {
    path: 'servicio',
    loadChildren: () => import('./modules/servicio/servicio.module').then(m => ServicioModule)
   },
   {
    path: 'clientes',
    loadChildren: () => import('./modules/clientes/clientes.module').then(m => ClientesModule)
   },
   {
    path: 'reportes',
    loadChildren: () => import('./modules/reportes/reportes.module').then(m => ReportesModule)
   },
  {
   path: '**',
   redirectTo: 'login'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true } )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
