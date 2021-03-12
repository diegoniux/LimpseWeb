import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClienteInterface } from '../interfaces/cliente.interface';
import { Observable, throwError, concat, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  crearUsuario(cliente: ClienteInterface) {
    return this.http.post('https://localhost:44337/api/Clientes', JSON.stringify(cliente),
    {
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    })
    .pipe(
      catchError ( error => {throw(error || 'Server errror'); })
    );
  }

  actualizarCliente(idCliente: number, cliente: ClienteInterface) {
    return this.http.put('https://localhost:44337/api/Clientes/' + idCliente,
    JSON.stringify(cliente),
    {
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    })
    .pipe(
      catchError ( error => {throw(error || 'Server errror'); })
    );
  }

  getAllClientes(): Observable<ClienteInterface[]> {
    return this.http.get<ClienteInterface[]>('https://localhost:44337/api/Clientes')
    .pipe(
      catchError ( error => {throw(error || 'Server errror'); })
    );
  }

  getCliente(IdCliente): Observable<ClienteInterface> {
    return this.http.get<ClienteInterface>('https://localhost:44337/api/Clientes/' + IdCliente)
    .pipe(
      catchError ( error => {throw(error || 'Server errror'); })
    );
  }

  eliminarCliente(idCliente: number) {
    return this.http.delete('https://localhost:44337/api/Clientes/' + idCliente)
    .pipe(
      catchError ( error => {throw(error || 'Server errror'); })
    );
  }
}
