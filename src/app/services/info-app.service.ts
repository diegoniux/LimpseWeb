import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoApp } from '../interfaces/infoPagina.interface';
import { AlertService } from '../shared/_alert/alert.service';

@Injectable({
  providedIn: 'root'
})
export class InfoAppService {
options = {
  autoClose: false,
  keepAfterRouteChange: false
};

  constructor( private http: HttpClient,
               private alertService: AlertService ) {
  }

  getInfoApp() {
      // leemos el archivo
      return this.http.get('assets/data/infoPage.json');
  }
}
