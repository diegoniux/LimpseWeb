import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DireccionClienteInterface } from '../interfaces/direccionCliente.interface';

@Injectable({
  providedIn: 'root'
})
export class DireccionClienteService {

  constructor(private http: HttpClient) { }

  public crearDireccionCliente(direccionCliente: DireccionClienteInterface) {
    return this.http.post('https://localhost:44337/api/DireccionesCliente', JSON.stringify(direccionCliente),
    {
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    });
  }

  public actualizarDireccionCliente(idDireccionCliente: number, direccionCliente: DireccionClienteInterface) {
    return this.http.put('https://localhost:44337/api/DireccionesCliente/' + idDireccionCliente,
    JSON.stringify(direccionCliente),
    {
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    });
  }

  public getAllDireccionesClientes() {
    return this.http.get('https://localhost:44337/api/DireccionesCliente');
  }

  public getDireccionCliente(idDireccionCliente) {
    return this.http.get('https://localhost:44337/api/DireccionesCliente/' + idDireccionCliente);
  }

  public eliminarDireccionCliente(idDireccionCliente: number) {
    return this.http.delete('https://localhost:44337/api/DireccionesCliente/' + idDireccionCliente);
  }

}
