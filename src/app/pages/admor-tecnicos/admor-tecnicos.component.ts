import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import ArrayStore from 'devextreme/data/array_store';
import { UsuarioInterface } from '../../interfaces/usuario.interface';
import { UsuarioService } from '../../services/usuario.service';
import { AlertService } from '../../shared/_alert/alert.service';
import { TecnicoService } from '../../services/tecnico.service';
import { TecnicoInterface } from '../../interfaces/tecnico.interface';

@Component({
  selector: 'app-admor-tecnicos',
  templateUrl: './admor-tecnicos.component.html',
  styleUrls: ['./admor-tecnicos.component.css']
})
export class AdmorTecnicosComponent implements OnInit {
  @ViewChild('targetGridTecnicos', { static: false }) dataGrid: DxDataGridComponent;
  tecnicosDataSource: CustomStore;

  usuarios: UsuarioInterface[];

  constructor( private usuarioService: UsuarioService,
               private alertService: AlertService,
               private tecnicoService: TecnicoService ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarTecnicos();

  }

  cargarUsuarios() {
    this.usuarioService.getAllUsuarios()
      .toPromise()
      .then((data: UsuarioInterface[]) => {
          this.usuarios = data;
      })
      .catch(error => { throw error; });
  }

  private cargarTecnicos() {
    const that = this;
    this.tecnicosDataSource = new CustomStore({
      key: 'idTecnico',
      load: function(loadOptions: any) {
        return that.tecnicoService.getAllTecnicos()
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
        return that.tecnicoService.crearTecnico(values)
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
        const tecnicoActual: TecnicoInterface = {
          IdTecnico: grid.cellValue(rowIndex, 'idTecnico'),
          IdUsuario: grid.cellValue(rowIndex, 'idUsuario'),
          Nombre: grid.cellValue(rowIndex, 'nombre'),
          ApellidoPaterno: grid.cellValue(rowIndex, 'apellidoPaterno'),
          ApellidoMaterno: grid.cellValue(rowIndex, 'apellidoMaterno'),
          Activo: grid.cellValue(rowIndex, 'activo')
        };

        return that.tecnicoService.actualizarTecnico(key, tecnicoActual)
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
        return that.tecnicoService.eliminarTecnico(key)
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

}
