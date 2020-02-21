import { Injectable, ɵflushModuleScopingQueueAsMuchAsPossible } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModuloInterface } from '../interfaces/modulo.interface';

@Injectable({
  providedIn: 'root'
})
export class ModulosService {

  modulos: ModuloInterface[] = [];


  constructor(private http: HttpClient) {
    this.cargarModulos();
   }

   private cargarModulos() {
    this.http.get('https://localhost:44337/api/Login/Modulos/1/1').subscribe( (resp: ModuloInterface[]) => {
      this.modulos = resp;
    });
   }
}
