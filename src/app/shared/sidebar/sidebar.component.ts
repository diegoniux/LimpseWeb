import { Component, OnInit } from '@angular/core';
import { InfoAppService } from '../../services/info-app.service';
import { ModulosService } from '../../services/modulos.service';
import { ModuloInterface } from '../../interfaces/modulo.interface';
import { LoginService } from '../../services/login.service';
import { MenuInterface } from '../../interfaces/menu.interface';
import { OpcionInterface } from '../../interfaces/opcion.interface';
import { LoginInterface } from '../../interfaces/login.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public modulo: ModuloInterface;
  public menus: MenuInterface[] = [];
  public opciones: OpcionInterface[] = [];
  infoLogin: LoginInterface;

  constructor( public infoPagService: InfoAppService,
               public loginService: LoginService ) { }

  ngOnInit(): void {
    this.cargarMenus();
  }

  cargarMenus() {
    this.infoLogin = this.loginService.getUserLoggedIn();
    this.modulo = this.loginService.moduloActual;

    if (!this.modulo) {
      return;
    }

    // Obtenemos los menús para módulo
    this.loginService.getMenus(this.modulo.idModulo, this.infoLogin.objUsuario.idPerfil)
    .subscribe( (resp: MenuInterface[]) => {
      resp.forEach( (menu) => {
        console.log(menu);
        this.loginService.getOpciones(menu.idMenu, this.infoLogin.objUsuario.idPerfil)
        .subscribe( (opciones: OpcionInterface[]) => {
          menu.listOpciones = opciones;
          this.menus.push(menu);
        });
      });
      console.log(this.menus);
    });
  }




}
