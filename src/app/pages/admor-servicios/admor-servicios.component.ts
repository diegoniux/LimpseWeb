import { Component, OnInit, AfterViewInit, ViewChild, Renderer2, ErrorHandler } from '@angular/core';
import { ServicioInterface } from '../../interfaces/servicio.interface';
import { ServicioService } from '../../services/servicio.service';
import { ModalService } from '../../shared/_modal/modal.service';
import { AlertService } from '../../shared/_alert/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoServicioInterface } from '../../interfaces/tipoServicio.interface';
import { CatalogosService } from '../../services/catalogos.service';
import { ResultadoSP } from '../../interfaces/result.interface';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import CustomStore from 'devextreme/data/custom_store';
import { DxDataGridComponent, DxDataGridModule } from 'devextreme-angular/ui/data-grid';

@Component({
  selector: 'app-admor-servicios',
  templateUrl: './admor-servicios.component.html',
  styleUrls: ['./admor-servicios.component.css']
})
export class AdmorServiciosComponent implements OnInit, AfterViewInit {
  @ViewChild('targetGridServicios', { static: false }) dataGrid: DxDataGridComponent;
  serviciosDataSource: CustomStore;
  servicios: ArrayStore;
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  public tiposServicio: TipoServicioInterface[];
  servicioForm: FormGroup;
  servicioActual: ServicioInterface;
  submitted = false;

  constructor(private servicioService: ServicioService,
              private modalService: ModalService,
              private alertService: AlertService,
              private formBuilder: FormBuilder,
              private router: Router,
              private catalogosService: CatalogosService) {

    this.servicioActual = {};

    this.cargarServicios();
  }

  get f() { return this.servicioForm.controls; }

  private cargartiposServicio() {
    this.catalogosService.gettiposServicio().subscribe(
      (resp: TipoServicioInterface[]) => {
        this.tiposServicio = [];
        this.tiposServicio = resp;
      }
    );
  }

  private cargarServicios() {
    const that = this;
    this.serviciosDataSource = new CustomStore({
      key: 'idServicio',
      load: function(loadOptions: any) {
        return that.servicioService.getAllServicios()
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
        return that.servicioService.registrarServicio(values)
        .toPromise()
        .then((data: any) => {
          console.log(data);
        })
        .catch( error => { throw error; });
      },
      update: function(key, values) {
        // obtenemos el objeto del renglon que se va actualizar
        const grid = that.dataGrid.instance;
        const rowIndex = grid.getRowIndexByKey(key);
        // cargamos el objeto servicio
        const servicioActualizar: ServicioInterface = {
          idServicio: grid.cellValue(rowIndex, 'idServicio'),
          idTipoServicio: grid.cellValue(rowIndex, 'idTipoServicio'),
          servicio: grid.cellValue(rowIndex, 'servicio'),
          activo: grid.cellValue(rowIndex, 'activo')
        };

        return that.servicioService.actualizarServicio(key, servicioActualizar)
        .toPromise()
        .then((data: any) => {
        })
        .catch( error => { throw error; });
      },
      remove: function(key) {
        return that.servicioService.eliminarServicio(key)
        .toPromise()
        .then((data: any) => {
        })
        .catch( error => { throw error; });
      },
    });
  }

  ngOnInit(): void {

    // Construcción del formulario para alta/modificación del servicio
    this.servicioForm = this.formBuilder.group({
      idServicio: [this.servicioActual.idServicio],
      servicio: [this.servicioActual.servicio, Validators.required],
      idTipoServicio: [null, Validators.required],
      activo: [this.servicioActual.activo, Validators.required]
    });
    this.cargartiposServicio();
  }

  ngAfterViewInit(): void {

  }

  public agregarServicio() {
    this.servicioActual = {
      idServicio: 0,
      servicio: '',
      idTipoServicio: null,
      activo: true
    };
    this.servicioForm.setValue(this.servicioActual);
    this.openModal('servicioModal');
  }

  public guardarServicio() {
    this.submitted = true;

    if (this.servicioForm.invalid) {
      return;
    }

    this.servicioActual = {
      idServicio: this.servicioForm.value.idServicio,
      servicio: this.servicioForm.value.servicio,
      activo: this.servicioForm.value.activo,
      idTipoServicio: this.servicioForm.value.idTipoServicio.idTipoServicio
    };

    // verificamos si se trata de una actualización o de un alta de servicio
    if (this.servicioActual.idServicio === 0) {
      // Alta
      this.servicioService.registrarServicio(this.servicioActual).subscribe((resp: ResultadoSP) => {
        if (resp.result === 1) {
          this.alertService.success('Servicio Registrado correctamente.', this.options);
          // Reload DataTable
          this.cargarServicios();
        } else {
          this.alertService.error(resp.friendlyMessage, this.options);
        }
      });
    } else {
      // Actualización
      this.servicioService.actualizarServicio(this.servicioActual.idServicio, this.servicioActual).subscribe((resp: ResultadoSP) => {
        if (resp.result === 1) {
          this.alertService.success('Servicio actualizado correctamente.', this.options);
          // Reload DataTable
        } else {
          this.alertService.error(resp.friendlyMessage, this.options);
          console.log(resp.errorMessage);
        }
      });
    }

    this.closeModal('servicioModal');
    this.submitted = false;
  }

  public cancelar() {
    this.submitted = false;
    this.closeModal('servicioModal');
  }

  public eliminarServicio() {
    // eliminar servicio
    this.servicioService.eliminarServicio(this.servicioActual.idServicio).subscribe((resp: ResultadoSP) => {
      if (resp.result === 1) {
        this.alertService.success('Servicio eliminado correctamente.', this.options);
        // Reload DataTable
      } else {
        this.alertService.error(resp.friendlyMessage, this.options);
        console.log(resp.errorMessage);
      }
    });
    this.closeModal('eliminarModal');
  }

  public closeModal(id: string) {
    this.modalService.close(id);
  }

  public openModal(id: string) {

    this.modalService.open(id);
  }

}
