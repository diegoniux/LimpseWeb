import { Component } from '@angular/core';
import { InfoAppService } from './services/info-app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( public infoPaginaService: InfoAppService) {

  }

}
