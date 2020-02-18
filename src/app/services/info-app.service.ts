import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/infoPagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoAppService {

info: InfoPagina = {};
cargada = false;

  constructor( private http: HttpClient ) {

    // leemos el archivo
    this.http.get('assets/data/infoPage.json')
    .subscribe( (resp: InfoPagina) => {
      this.cargada = true;
      this.info = resp;

      console.log(this.info.titulo);
    });

   }
}
