import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginInterface } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginInterface: LoginInterface;

  constructor(private http: HttpClient) {}

  public login(usuario: string, password: string) {
    return this.http.post('https://localhost:44337/api/Login', JSON.stringify(
        {
          Usuario: usuario,
          Password: password
        }
      ), { headers: {'Content-Type': 'application/json; charset=utf-8'}}
      );

  }


}
