import { Component, OnInit, OnChanges } from '@angular/core';
import { InfoAppService } from '../../services/info-app.service';
import { ModulosService } from '../../services/modulos.service';
import { ModuloInterface } from '../../interfaces/modulo.interface';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnChanges {

  public modulo: ModuloInterface;

  constructor( public infoPagService: InfoAppService,
               public loginService: LoginService ) { }

  ngOnInit(): void {
    console.log(this.loginService.moduloActual);
    if (this.loginService.moduloActual) {
      this.modulo = this.loginService.moduloActual;
      console.log(this.modulo);
    }
  }

  ngOnChanges(): void {
    console.log(this.loginService.moduloActual);
  }

}
