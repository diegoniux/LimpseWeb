import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioInterface } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  public crearUsuario(usuario: UsuarioInterface) {
    return this.http.put('https://localhost:44337/api/Usuarios', JSON.stringify(usuario),
    {
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    });
  }

  public actualizarPerfil(usuario: UsuarioInterface) {
    return this.http.put('https://localhost:44337/api/Usuarios/' + usuario.idUsuario,
    JSON.stringify(usuario),
    {
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    });
  }

  public actualizarPasswordUsuario(usuario: UsuarioInterface) {
    return this.http.put('https://localhost:44337/CambioPass/' + usuario.idUsuario,
    JSON.stringify(usuario),
    {
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    });
  }

  public resetPasswordUsuario(usuario: UsuarioInterface) {
    return this.http.put('https://localhost:44337/ResetPass/' + usuario.idUsuario,
    JSON.stringify(usuario),
    {
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    });
  }

  public getAllUsuarios() {
    return this.http.get('https://localhost:44337/api/Usuarios');
  }

  public getUsuario(IdUsiario) {
    return this.http.get('https://localhost:44337/api/Usuarios/' + IdUsiario);
  }

}
