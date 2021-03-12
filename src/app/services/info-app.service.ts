import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InfoAppService {
options = {
  autoClose: false,
  keepAfterRouteChange: false
};

  constructor( private http: HttpClient) {
  }

  getInfoApp() {
      // leemos el archivo
      return this.http.get('assets/data/infoPage.json');
  }
}
