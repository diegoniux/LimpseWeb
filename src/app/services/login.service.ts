import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginInterface } from '../interfaces/login.interface';
import { Md5 } from 'ts-md5/dist/md5';
import { ModuloInterface } from '../interfaces/modulo.interface';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public isUserLoggedIn;
  public infoLogin: LoginInterface;
  public moduloActual: ModuloInterface;

  constructor(private http: HttpClient) {
    this.isUserLoggedIn = false;
    this.infoLogin = null;
    this.moduloActual = null;
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

  public getModulos(IdUsuario, IdAplicativo) {
    return this.http.get('https://localhost:44337/api/Login/Modulos/' + IdAplicativo + '/' + IdUsuario);
  }

  setUserLoggedIn(login: LoginInterface) {
    this.isUserLoggedIn = true;
    this.infoLogin = login;
    localStorage.setItem('sessionUser', JSON.stringify(login));
  }

  getUserLoggedIn() {
    const loginInterface: LoginInterface = JSON.parse(localStorage.getItem('sessionUser'));
    return loginInterface;
  }

  setUserLoggedOn() {
    this.isUserLoggedIn = false;
    this.infoLogin = null;
    localStorage.setItem('sessionUser', '');
    localStorage.setItem('moduloActual', '');
  }


}
