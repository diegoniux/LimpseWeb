import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { InfoAppService } from '../../services/info-app.service';
import { ModuloInterface } from '../../interfaces/modulo.interface';
import { LoginInterface } from '../../interfaces/login.interface';
import { ModalService } from '../_modal/modal.service';
import { AlertService } from '../_alert/alert.service';
import { InfoApp } from '../../interfaces/infoPagina.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  modulos: ModuloInterface[];
  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };
  infoApp: InfoApp;
  infoLogin: LoginInterface;

  constructor(public loginService: LoginService,
              public router: Router,
              public infoAppService: InfoAppService,
              private modalService: ModalService,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.infoApp = this.loginService.getInfoApp();
    this.infoLogin =  this.loginService.getUserLoggedIn();

    this.loginService.getModulos(this.infoApp.IdAplicativo, this.infoLogin.objUsuario.idPerfil)
      .toPromise()
      .then((resp: any[]) => {
        this.modulos = resp;
      })
      .catch( error => {
        this.alertService.error(error.message, this.options);
      });
  }

  cerraSession() {
    this.loginService.setUserLoggedOn();
    this.router.navigate(['/login']);
  }

  goModulo(modulo: ModuloInterface) {
    this.loginService.setModuloActual(modulo);
    this.router.navigate([modulo.ruta]);
  }

  goModuloPerfil() {
    const modulo: ModuloInterface = {
      idAplicativo: 1,
      idModulo: 5,
      ruta: 'home/perfil'
    };
    this.loginService.setModuloActual(modulo);
    this.router.navigate([modulo.ruta]);
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
