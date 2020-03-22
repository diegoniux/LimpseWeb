import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import ArrayStore from 'devextreme/data/array_store';
import { PerfilInterface } from '../../interfaces/perfil.interface';
import { EstatusUsuarioInterface } from 'src/app/interfaces/estatusUsuario.interface';
import { UsuarioService } from '../../services/usuario.service';
import { CatalogosService } from '../../services/catalogos.service';
import { UsuarioInterface } from '../../interfaces/usuario.interface';
import { AlertService } from '../../shared/_alert/alert.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  @ViewChild('targetGridUsuarios', { static: false }) dataGrid: DxDataGridComponent;
  usuariosDataSource: CustomStore;
  usuarios: ArrayStore;

  perfiles: PerfilInterface[];
  estatusUsuarios: EstatusUsuarioInterface[];

  constructor( private usuarioService: UsuarioService,
               private catalogoService: CatalogosService,
               private alertService: AlertService ) {

    this.cargarPerfiles();
    this.cargarEstatusUsuario();

    this.desbloquearUsuarioClick = this.desbloquearUsuarioClick.bind(this);
    this.bloquearUsuarioClick = this.bloquearUsuarioClick.bind(this);
    this.resetPasswClick = this.resetPasswClick.bind(this);

  }

  ngOnInit(): void {

    this.cargarUsuarios();

  }

  private cargarPerfiles() {
    this.catalogoService.getPerfiles().subscribe(
      (resp: PerfilInterface[]) => {
        this.perfiles = [];
        this.perfiles = resp;
      }
    );
  }

  private cargarEstatusUsuario() {
    this.catalogoService.getEstatusUsuario().subscribe(
      (resp: EstatusUsuarioInterface[]) => {
        this.estatusUsuarios = [];
        this.estatusUsuarios = resp;
      }
    );
  }

  private cargarUsuarios() {
    const that = this;
    this.usuariosDataSource = new CustomStore({
      key: 'idUsuario',
      load: function(loadOptions: any) {
        return that.usuarioService.getAllUsuarios()
        .toPromise()
        .then((data: any) => {
            return {
                data: data,
                totalCount: data.length
            };
        })
        .catch(error => { throw error; });
      },
      insert: function(values) {
        return that.usuarioService.crearUsuario(values)
        .toPromise()
        .then((data: any) => {
          if (data.result === 0) {
            console.log(data.errorMessage);
            throw(data.friendlyMessage);
          }
        })
        .catch( error => { throw error; });
      },
      update: function(key, values) {
        // obtenemos el objeto del renglon que se va actualizar
        const grid = that.dataGrid.instance;
        const rowIndex = grid.getRowIndexByKey(key);
        // cargamos el objeto servicio
        const usuarioActual: UsuarioInterface = {
          idUsuario: grid.cellValue(rowIndex, 'idUsuario'),
          idPerfil: grid.cellValue(rowIndex, 'idPerfil'),
          idEstatusUsuario: grid.cellValue(rowIndex, 'idEstatusUsuario'),
          usuario: grid.cellValue(rowIndex, 'usuario'),
          email: grid.cellValue(rowIndex, 'email')
        };

        return that.usuarioService.actualizarUsuario(key, usuarioActual)
        .toPromise()
        .then((data: any) => {
          if (data.result === 0) {
            console.log(data.errorMessage);
            throw(data.friendlyMessage);
          }
        })
        .catch( error => { throw error; });
      },
      remove: function(key) {
        return that.usuarioService.eliminarUsuario(key)
        .toPromise()
        .then((data: any) => {
          if (data.result === 0) {
            console.log(data.errorMessage);
            throw(data.friendlyMessage);
          }
        })
        .catch( error => { throw error; });
      },
    });
  }

  optionLockVisible(e) {
    return e.row.data.idEstatusUsuario !== 2; // Activo
  }

  optionUnlockVisible(e) {
    return e.row.data.idEstatusUsuario === 2; // Bloqueado
  }

  bloquearUsuarioClick(e) {
    const IdUsuario = e.row.data.idUsuario;

    this.usuarioService.bloquearUsuario(IdUsuario)
    .toPromise()
    .then((data: any) => {
      if (data.result === 0) {
        console.log(data.errorMessage);
        throw(data.friendlyMessage);
      }

      this.cargarUsuarios();

    })
    .catch( error => { throw error; });

    e.event.preventDefault();

  }

  desbloquearUsuarioClick(e) {
    const IdUsuario = e.row.data.idUsuario;

    this.usuarioService.desbloquearUsuario(IdUsuario)
    .toPromise()
    .then((data: any) => {
      if (data.result === 0) {
        console.log(data.errorMessage);
        throw(data.friendlyMessage);
      }

      this.cargarUsuarios();

    })
    .catch( error => { throw error; });

    e.event.preventDefault();

  }

  resetPasswClick(e) {

    this.usuarioService.resetPasswordUsuario(e.row.data)
    .toPromise()
    .then((data: any) => {
      if (data.result === 0) {
        console.log(data.errorMessage);
        throw(data.friendlyMessage);
      }

      this.cargarUsuarios();

    })
    .catch( error => { throw error; });

    e.event.preventDefault();

  }

}
