import { Component, OnInit } from '@angular/core';
import { UsuarioInterface } from '../../interfaces/usuario.interface';
import { FormGroup, FormBuilder, Validators, Validator } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { AlertService } from '../../shared/_alert/alert.service';
import { ModalService } from '../../shared/_modal/modal.service';
import { ResultadoSP } from '../../interfaces/result.interface';
import { MustMatch } from '../../shared/_helpers/must-match.validator';
import { LoginInterface } from '../../interfaces/login.interface';

// import custom validator to validate that password and confirm password fields match

@Component({
  selector: 'app-cambio-passw',
  templateUrl: './cambio-passw.component.html',
  styleUrls: ['./cambio-passw.component.css']
})
export class CambioPasswComponent implements OnInit {
  usuarioActual: UsuarioInterface;
  passwForm: FormGroup;
  submitted = false;
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  constructor(private formBuilder: FormBuilder,
              private usuarioService: UsuarioService,
              private loginService: LoginService,
              private router: Router,
              private alertService: AlertService,
              private modalService: ModalService) {

    this.usuarioActual = loginService.getUserLoggedIn().objUsuario;
  }

  get f() { return this.passwForm.controls; }

  ngOnInit(): void {
    this.passwForm = this.formBuilder.group({
      oldPassw: ['', Validators.required],
      newPassw: ['', Validators.required],
      confirm: ['', Validators.required]
    }, {
      validator: MustMatch('newPassw', 'confirm')
    });
  }

  openModal(id: string) {
    this.submitted = true;

    if (this.passwForm.invalid) {
      return;
    }

    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  cancelar() {
    this.submitted = false;
    this.router.navigate(['/home']);
  }

  cambioPassword() {
    this.submitted = true;

    if (this.passwForm.invalid) {
      return;
    }

    this.loginService.login(this.usuarioActual.usuario, this.passwForm.value.oldPassw)
      .subscribe( (res: LoginInterface) => {
        if (res.objResultadoSP.result === 1) {
          this.usuarioActual.password = this.passwForm.value.newPassw;

          this.usuarioService.actualizarPasswordUsuario(this.usuarioActual).subscribe(
            (resp: ResultadoSP) => {
              if (resp.result === 1) {
                this.alertService.success('Contraseña actualizada correctamente', this.options);
                this.closeModal('passwModal');
              } else {
                this.alertService.error(resp.friendlyMessage, this.options);
                console.log(resp.errorMessage);
              }
            }
          );
        } else {
          this.alertService.error('La contraseña actual es incorrecta.', this.options);
          this.closeModal('passwModal');
        }
    });
  }

}
