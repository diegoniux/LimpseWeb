import { Component, OnInit } from '@angular/core';
import { UsuarioInterface } from '../../interfaces/usuario.interface';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { PerfilInterface } from '../../interfaces/perfil.interface';
import { CatalogosService } from '../../services/catalogos.service';
import { UsuarioService } from '../../services/usuario.service';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ResultadoSP } from '../../interfaces/result.interface';
import { AlertService } from '../../shared/_alert/alert.service';
import { ModalService } from '../../shared/_modal/modal.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuarioActual: UsuarioInterface;
  perfilForm: FormGroup;
  perfiles: PerfilInterface[];
  submitted = false;
  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };



  constructor(private formBuilder: FormBuilder,
              private catalogosService: CatalogosService,
              private usuarioService: UsuarioService,
              private loginService: LoginService,
              private router: Router,
              private alertService: AlertService,
              private modalService: ModalService) {
    this.usuarioActual = loginService.getUserLoggedIn().objUsuario;
    this.cargarPerfiles();
  }

  ngOnInit(): void {
    this.perfilForm = this.formBuilder.group({
      usuario: [this.usuarioActual.usuario, [Validators.required, Validators.minLength(4)]],
      idPerfil: [this.usuarioActual.idPerfil, Validators.required],
      email: [this.usuarioActual.email, [Validators.required, Validators.minLength(4)]]
    });
  }

  private cargarPerfiles() {
    this.catalogosService.getPerfiles().subscribe(
      (resp: PerfilInterface[]) => {
        this.perfiles = resp;
      }
    );
  }

  get f() { return this.perfilForm.controls; }

  cancelar() {
    this.submitted = false;
    this.router.navigate(['/home']);
  }

  actualizarPerfil() {
    this.submitted = true;

    if (this.perfilForm.invalid) {
      return;
    }

    this.usuarioActual.usuario = this.perfilForm.value.usuario;
    this.usuarioActual.idPerfil = this.perfilForm.value.idPerfil;
    this.usuarioActual.email = this.perfilForm.value.email;

    this.usuarioService.actualizarPerfil(this.usuarioActual).subscribe(
      (resp: ResultadoSP) => {
        if (resp.result === 1) {
          this.alertService.success('Perfil actualizado correctamente', this.options);
          this.closeModal('perfilModal');
        } else {
          this.alertService.error(resp.friendlyMessage, this.options);
          console.log(resp.errorMessage);
        }
      }
    );
  }

  openModal(id: string) {
    this.submitted = true;

    if (this.perfilForm.invalid) {
      return;
    }

    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
