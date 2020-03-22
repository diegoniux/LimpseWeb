import { Component, OnInit } from '@angular/core';
import { InfoAppService } from '../../services/info-app.service';
import { InfoApp } from '../../interfaces/infoPagina.interface';
import { LoginService } from '../../services/login.service';
import { LoginInterface } from '../../interfaces/login.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  anio: number = new Date().getFullYear();
  infoApp: InfoApp;


  constructor( public infoPagService: InfoAppService,
               private loginService: LoginService  ) { }

  ngOnInit(): void {
    this.infoApp = this.loginService.getInfoApp();
  }

}
