import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoApp } from '../interfaces/infoPagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoAppService {

info: InfoApp = {};
cargada = false;

  constructor( private http: HttpClient ) {

    // leemos el archivo
    this.http.get('assets/data/infoPage.json')
    .subscribe( (resp: InfoApp) => {
      this.cargada = true;
      this.info = resp;
    });

   }
}
