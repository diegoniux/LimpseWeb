import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { ServicioInterface } from '../../interfaces/servicio.interface';
import { ServicioService } from '../../services/servicio.service';
import { ModalService } from '../../shared/_modal/modal.service';
import { AlertService } from '../../shared/_alert/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoServicioInterface } from '../../interfaces/tipoServicio.interface';
import { CatalogosService } from '../../services/catalogos.service';
import { ResultadoSP } from '../../interfaces/result.interface';

@Component({
  selector: 'app-admor-servicios',
  templateUrl: './admor-servicios.component.html',
  styleUrls: ['./admor-servicios.component.css']
})
export class AdmorServiciosComponent implements OnInit, AfterViewInit {
  dtServicios: any = {};
  servicios: ServicioInterface[] = [];

  public tiposServicio: TipoServicioInterface[];
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  servicioForm: FormGroup;
  servicioActual: ServicioInterface;
  submitted = false;

  constructor(private servicioService: ServicioService,
    private renderer: Renderer2,
    private modalService: ModalService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private router: Router,
    private catalogosService: CatalogosService) {

    this.servicioActual = {};

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

  ngOnInit(): void {

    // Construcción del formulario para alta/modificación del servicio
    this.servicioForm = this.formBuilder.group({
      idServicio: [this.servicioActual.idServicio],
      servicio: [this.servicioActual.servicio, Validators.required],
      idTipoServicio: [null, Validators.required],
      activo: [this.servicioActual.activo, Validators.required]
    });
    this.cargartiposServicio();

    const that = this;
    // Configuración del TataTable
    this.dtServicios = {
      pagingType: 'full_numbers',
      pageLength: 2,
      serverSide: true,
      processing: true,
      language: {
        processing: 'Procesando...',
        search: 'Buscar:',
        lengthMenu: 'Mostrar _MENU_ elementos',
        info: 'Mostrando desde _START_ al _END_ de _TOTAL_ elementos',
        infoEmpty: 'Mostrando ningún elemento.',
        infoFiltered: '(filtrado _MAX_ elementos total)',
        infoPostFix: '',
        loadingRecords: 'Cargando registros...',
        zeroRecords: 'No se encontraron registros',
        emptyTable: 'No hay datos disponibles en la tabla',
        paginate: {
          first: 'Primero',
          previous: 'Anterior',
          next: 'Siguiente',
          last: 'Último'
        },
        aria: {
          sortAscending: ': Activar para ordenar la tabla en orden ascendente',
          sortDescending: ': Activar para ordenar la tabla en orden descendente'
        }
      },
      ajax: (dataTablesParameters: any, callback) => {
        that.servicioService
          .getAllServicios().subscribe((resp: ServicioInterface[]) => {
            that.servicios = resp;
            callback({
              recordsTotal: resp.length,
              recordsFiltered: resp.length,
              data: that.servicios
            });
          });
      },
      columns: [
        { data: 'idServicio', title: 'ID' },
        { data: 'idTipoServicio', visible: false },
        { data: 'servicio', title: 'Servicio' },
        { data: 'tipoServicio', title: 'Tipo Servicio' },
        { data: 'activo', title: 'Activo', type: 'intput', visible: false },
        {
          sortable: false,
          render: function (data: any, type: any, full: any) {
            return '<button data-accion= "Editar"' +
              ' data-idServicio ="' + full.idServicio + '"' +
              ' class="btnEdit btn btn-info btn-sm">Editar</button>';
          }
        },
        {
          sortable: false,
          render: function (data: any, type: any, full: any) {
            return '<button data-accion= "Eliminar"' +
              ' data-Idservicio = "' + full.idServicio + '"' +
              ' class="btnEdit btn btn-danger btn-sm">Eliminar</button>';
          }
        }
      ],
      // Declare the use of the extension in the dom parameter
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
        'copy',
        'print',
        'excel'
      ]
    };
  }

  ngAfterViewInit(): void {
    this.renderer.listen('document', 'click', (event) => {
      if (event.target.getAttribute('data-accion') === 'Editar') {
        const IdServicio = event.target.getAttribute('data-idServicio');
        this.servicioService.getServicioById(IdServicio).subscribe((resp: ServicioInterface) => {
          this.servicioActual = resp;
          const tipoServicio: TipoServicioInterface = this.tiposServicio.find(
            item => item.idTipoServicio === this.servicioActual.idTipoServicio
          );
          this.servicioForm.patchValue({
            idServicio: this.servicioActual.idServicio,
            idTipoServicio: tipoServicio,
            servicio: this.servicioActual.servicio,
            activo: this.servicioActual.activo
          });
          this.openModal('servicioModal');
        });
      } else if (event.target.getAttribute('data-accion') === 'Eliminar') {
        const IdServicio = event.target.getAttribute('data-idServicio');
        this.servicioActual.idServicio = IdServicio;
        this.openModal('eliminarModal');
      }
    });
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
        } else {
          this.alertService.error(resp.friendlyMessage, this.options);
          console.log(resp.errorMessage);
        }
      });
    } else {
      // Actualización
      this.servicioService.actualizarServicio(this.servicioActual).subscribe((resp: ResultadoSP) => {
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
