import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeModule } from './modules/home/home.module';
import { PerfilModule } from './modules/perfil/perfil.module';


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
   path: 'perfil',
   loadChildren: () => import('./modules/perfil/perfil.module').then(m => PerfilModule)
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
