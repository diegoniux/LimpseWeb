import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';


const appRoutes: Routes = [
 { path: 'home', component: HomeComponent},
 { path: 'login', component: LoginComponent},
 { path: '**', pathMatch: 'full', redirectTo: 'home' }

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
