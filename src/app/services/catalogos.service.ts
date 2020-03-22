import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PerfilInterface } from '../interfaces/perfil.interface';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  constructor(private http: HttpClient) { }

  public getPerfiles() {
    return this.http.get('https://localhost:44337/api/Catalogos/Perfiles');
  }

  public gettiposServicio() {
    return this.http.get('https://localhost:44337/api/Catalogos/TiposServicio');
  }

  public gettiposMateriales() {
    return this.http.get('https://localhost:44337/api/Catalogos/TiposMaterial');
  }

  public getEstatusUsuario() {
    return this.http.get('https://localhost:44337/api/Catalogos/EstatusUsuario');
  }


}
