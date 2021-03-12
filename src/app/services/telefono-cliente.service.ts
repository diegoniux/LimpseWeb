import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TelefonoClienteInterface } from '../interfaces/telefonoCliente.interface';

@Injectable({
  providedIn: 'root'
})
export class TelefonoClienteService {

  constructor(private http: HttpClient) { }

  public crearTelefonoCliente(telefonoCliente: TelefonoClienteInterface) {
    console.log(JSON.stringify(telefonoCliente));
    return this.http.post('https://localhost:44337/api/TelefonosCliente', JSON.stringify(telefonoCliente),
    {
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    });
  }

  public actualizarTelefonoCliente(idTelefonoCliente: number, telefonoCliente: TelefonoClienteInterface) {
    return this.http.put('https://localhost:44337/api/TelefonosCliente/' + idTelefonoCliente,
    JSON.stringify(telefonoCliente),
    {
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    });
  }

  public getAllTelefonosClientes() {
    return this.http.get('https://localhost:44337/api/TelefonosCliente');
  }

  public getTelefonoCliente(idTelefonoCliente) {
    return this.http.get('https://localhost:44337/api/TelefonosCliente/' + idTelefonoCliente);
  }

  public eliminarTelefonoCliente(idTelefonoCliente: number) {
    return this.http.delete('https://localhost:44337/api/TelefonosCliente/' + idTelefonoCliente);
  }
}
