import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginInterface } from '../interfaces/login.interface';
import { Md5 } from 'ts-md5/dist/md5';
import { ModuloInterface } from '../interfaces/modulo.interface';
import { ReportesRoutingModule } from '../modules/reportes/reportes-routing.module';
import { InfoAppService } from './info-app.service';
import { InfoApp } from '../interfaces/infoPagina.interface';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
              private infoAppService: InfoAppService) {

  }

  public login(usuario: string, password: string) {
    const passMd5 = new Md5().appendStr(password).end();
    return this.http.post('https://localhost:44337/api/Login', JSON.stringify(
        {
          Usuario: usuario,
          Password: passMd5
        }
      ), { headers: {'Content-Type': 'application/json; charset=utf-8'}}
      );
  }

  public getModulos(IdAplicativo, IdPerfil) {
    return this.http.get('https://localhost:44337/api/Login/Modulos/' + IdAplicativo + '/' + IdPerfil);
  }

  public getMenus(IdModulo, IdPerfil) {
    return this.http.get('https://localhost:44337/api/Login/Menus/' + IdModulo + '/' + IdPerfil);
  }

  public getOpciones(IdMenu, IdPerfil) {
    return this.http.get('https://localhost:44337/api/Login/Opciones/' + IdMenu + '/' + IdPerfil);
  }

  public setUserLoggedIn(login: LoginInterface) {
    this.infoAppService.getInfoApp()
    .toPromise()
    .then( (resp: InfoApp) => {
      localStorage.setItem('infoApp', JSON.stringify(resp));
    })
    .catch( error => {
      throw error;
    });

    localStorage.setItem('sessionUser', JSON.stringify(login));
  }

  public getInfoApp() {
    let infoApp: InfoApp;
    if (localStorage.getItem('infoApp') !== '') {
      infoApp = JSON.parse(localStorage.getItem('infoApp'));
    }
    return infoApp;
  }

  public setModuloActual(modulo: ModuloInterface) {
    localStorage.setItem('moduloActual', JSON.stringify(modulo));
  }

  public getModuloActual() {
    let modulo: ModuloInterface;
    if (localStorage.getItem('moduloActual') !== '') {
      modulo = JSON.parse(localStorage.getItem('moduloActual'));
    }
    return modulo;
  }

  public getUserLoggedIn() {
    let loginInterface: LoginInterface;
    if (localStorage.getItem('sessionUser') !== '') {
      loginInterface = JSON.parse(localStorage.getItem('sessionUser'));
    }
    return loginInterface;
  }

  public setUserLoggedOn() {
    localStorage.setItem('isUserLoggedIn', null);
    localStorage.setItem('moduloActual', null);
  }
}
