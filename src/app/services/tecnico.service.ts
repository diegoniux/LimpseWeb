import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TecnicoInterface } from '../interfaces/tecnico.interface';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  constructor( private http: HttpClient ) { }

  public crearTecnico(tecnico: TecnicoInterface) {
    return this.http.post('https://localhost:44337/api/Tecnicos', JSON.stringify(tecnico),
    {
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    });
  }

  public actualizarTecnico(idTecnico: number, tecnico: TecnicoInterface) {
    return this.http.put('https://localhost:44337/api/Tecnicos/' + idTecnico, JSON.stringify(tecnico),
    {
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    });
  }

  public eliminarTecnico(idTecnico: number) {
    return this.http.delete('https://localhost:44337/api/Tecnicos/' + idTecnico);
  }

  public getAllTecnicos() {
    return this.http.get('https://localhost:44337/api/Tecnicos');
  }



}
