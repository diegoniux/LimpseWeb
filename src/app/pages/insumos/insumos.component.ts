import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import ArrayStore from 'devextreme/data/array_store';
import { TipoMaterialInterface } from '../../interfaces/tipoMaterial.interface';
import { MaterialInterface } from '../../interfaces/material.interface';
import { MaterialService } from '../../services/material.service';
import { CatalogosService } from '../../services/catalogos.service';

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.css']
})
export class InsumosComponent implements OnInit {
  @ViewChild('targetGridMateriales', { static: false }) dataGrid: DxDataGridComponent;
  materialesDataSource: CustomStore;
  servicios: ArrayStore;
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  tiposMaterial: TipoMaterialInterface[];

  constructor( private materialService: MaterialService,
               private catalogosService: CatalogosService ) {
    this.cargarMateriales();
   }

  ngOnInit(): void {
    this.cargarTiposMaterial();
  }

  private cargarTiposMaterial() {
    this.catalogosService.gettiposMateriales().subscribe(
      (resp: TipoMaterialInterface[]) => {
        this.tiposMaterial = [];
        this.tiposMaterial = resp;
      }
    );
  }

  private cargarMateriales() {
    const that = this;
    this.materialesDataSource = new CustomStore({
      key: 'idMaterial',
      load: function(loadOptions: any) {
        return that.materialService.getAllMateriales()
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
        console.log(values);
        return that.materialService.registrarMaterial(values)
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
        const materialActual: MaterialInterface = {
          idMaterial: grid.cellValue(rowIndex, 'idMaterial'),
          idTipoMaterial: grid.cellValue(rowIndex, 'idTipoMaterial'),
          material: grid.cellValue(rowIndex, 'material'),
          activo: grid.cellValue(rowIndex, 'activo')
        };

        return that.materialService.actualizarMaterial(key, materialActual)
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
        return that.materialService.eliminarMaterial(key)
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
