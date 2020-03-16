import { Component } from '@angular/core';
import { InfoAppService } from './services/info-app.service';
import { LoginService } from './services/login.service';
import { LoginInterface } from './interfaces/login.interface';
import { locale, loadMessages } from 'devextreme/localization';
import esMessage from 'devextreme/localization/messages/es.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public infoLogin: LoginInterface;

  constructor( public infoPaginaService: InfoAppService,
               public loginService: LoginService) {
    this.infoLogin = loginService.getUserLoggedIn();
    loadMessages(esMessage);
    locale(navigator.language);
  }

}
