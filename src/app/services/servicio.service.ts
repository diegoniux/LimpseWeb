import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServicioInterface } from '../interfaces/servicio.interface';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private http: HttpClient) { }

  public getAllServicios() {
    return this.http.get('https://localhost:44337/api/Servicios');
  }

  public getServicioById(IdServicio: number) {
    return this.http.get('https://localhost:44337/api/Servicios/' + IdServicio);
  }

  public actualizarServicio(idServicio, servicio: ServicioInterface) {
    return this.http.put('https://localhost:44337/api/Servicios/' + idServicio,
    JSON.stringify(servicio),
    {
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    });
  }

  public registrarServicio(servicio: ServicioInterface) {
    return this.http.post('https://localhost:44337/api/Servicios/',
    JSON.stringify(servicio),
    {
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    });
  }

  public eliminarServicio(IdServicio: number) {
    return this.http.delete('https://localhost:44337/api/Servicios/' + IdServicio);
  }

}
