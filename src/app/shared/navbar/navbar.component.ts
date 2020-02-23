import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { InfoAppService } from '../../services/info-app.service';
import { ModuloInterface } from '../../interfaces/modulo.interface';
import { LoginInterface } from '../../interfaces/login.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  modulos: ModuloInterface[];
  infoLogin: LoginInterface;

  constructor(public loginService: LoginService,
              public router: Router,
              public infoAppService: InfoAppService) { }

  ngOnInit(): void {
    const IdAplicativo = this.infoAppService.info.IdAplicativo;
    this.infoLogin = this.loginService.getUserLoggedIn();
    this.loginService.getModulos(IdAplicativo, this.infoLogin.objUsuario.idPerfil)
      .subscribe((resp: ModuloInterface[]) => {
        this.modulos = resp;
      });
  }

  cerraSession() {
    this.loginService.setUserLoggedOn();
    this.router.navigate(['/login']);
  }

  goModulo(modulo: ModuloInterface) {
    this.loginService.moduloActual = modulo;
    this.router.navigate([modulo.ruta]);
  }

}
