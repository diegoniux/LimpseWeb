import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MaterialInterface } from '../interfaces/material.interface';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private http: HttpClient) { }

  public getAllMateriales() {
    return this.http.get('https://localhost:44337/api/Materiales');
  }

  public getMaterialById(IdMaterial: number) {
    return this.http.get('https://localhost:44337/api/Materiales/' + IdMaterial);
  }

  public actualizarMaterial(idMaterial, material: MaterialInterface) {
    return this.http.put('https://localhost:44337/api/Materiales/' + idMaterial,
    JSON.stringify(material),
    {
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    });
  }

  public registrarMaterial(material: MaterialInterface) {
    return this.http.post('https://localhost:44337/api/Materiales/',
    JSON.stringify(material),
    {
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    });
  }

  public eliminarMaterial(IdMaterial: number) {
    return this.http.delete('https://localhost:44337/api/Materiales/' + IdMaterial);
  }

}
