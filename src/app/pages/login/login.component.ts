import { Component, OnInit, ɵflushModuleScopingQueueAsMuchAsPossible } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { LoginInterface } from '../../interfaces/login.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../shared/_alert/alert.service';
import { ModuloInterface } from '../../interfaces/modulo.interface';
import { UsuarioInterface } from '../../interfaces/usuario.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginInterface: LoginInterface;
  loginForm: FormGroup;
  submitted = false;
  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };

  constructor(private router: Router,
              public loginService: LoginService,
              private formBuilder: FormBuilder,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      passw: ['', Validators.required]
    });

    this.loginService.setUserLoggedOn();

  }

  // función para obtener los controles del formulario
  get f() {return this.loginForm.controls; }

  public loginUsuario() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loginService.login(this.loginForm.value.user, this.loginForm.value.passw)
      .toPromise()
      .then((resp: LoginInterface) => {

        this.loginInterface = resp;

        if (this.loginInterface.objResultadoSP.result === 1) {
          this.loginService.setUserLoggedIn(this.loginInterface);

          // revisamos el estatus del usuario
          switch (resp.objUsuario.idEstatusUsuario) {
            case 1: // Usuario Activo
              const modulo: ModuloInterface = {
                idModulo: 5,
                modulo: 'Perfil',
                ruta: '/home'
              };
              this.loginService.setModuloActual(modulo);
              this.router.navigate([modulo.ruta]);
              break;
            case 4: // Cambio contraseña
              this.router.navigate(['/home/cambio-passw']);
              break;
            default:
              this.alertService.error('Acceso denegado.');
              break;
          }

        } else {
          this.alertService.error(this.loginInterface.objResultadoSP.friendlyMessage, this.options);
          console.log(this.loginInterface.objResultadoSP.errorMessage);
        }
      })
      .catch( error => { throw error; });
  }

}
