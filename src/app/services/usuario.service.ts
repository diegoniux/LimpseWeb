import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioInterface } from '../interfaces/usuario.interface';
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  public crearUsuario(usuario: UsuarioInterface) {
    return this.http.post('https://localhost:44337/api/Usuarios', JSON.stringify(usuario),
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

  public actualizarUsuario(idUsuario: number, usuario: UsuarioInterface) {
    return this.http.put('https://localhost:44337/api/Usuarios/' + idUsuario,
    JSON.stringify(usuario),
    {
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    });
  }

  public actualizarPasswordUsuario(usuario: UsuarioInterface) {
    const passMd5 = new Md5().appendStr(usuario.password).end();
    usuario.password = passMd5.toString();
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

  public eliminarUsuario(IdServicio: number) {
    return this.http.delete('https://localhost:44337/api/Usuarios/' + IdServicio);
  }

  public bloquearUsuario(idUsuario: number) {
    return this.http.put('https://localhost:44337/BloquearUsuario/',
    idUsuario,
    {
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    });
  }

  public desbloquearUsuario(idUsuario: number) {
    return this.http.put('https://localhost:44337/DesbloquearUsuario/',
    idUsuario,
    {
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    });
  }

}
