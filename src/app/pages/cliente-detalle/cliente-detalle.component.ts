import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, NumberValueAccessor, Validator } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { AlertService } from '../../shared/_alert/alert.service';
import { ClienteInterface } from '../../interfaces/cliente.interface';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { DireccionClienteInterface } from '../../interfaces/direccionCliente.interface';
import { TelefonoClienteInterface } from '../../interfaces/telefonoCliente.interface';
import { TelefonoClienteService } from '../../services/telefono-cliente.service';
import { DireccionClienteService } from '../../services/direccion-cliente.service';
import { TipoTelefonoInterface } from '../../interfaces/tipoTelefono.interface';
import { CatalogosService } from '../../services/catalogos.service';
import { LoginService } from '../../services/login.service';
import { InfoApp } from 'src/app/interfaces/infoPagina.interface';
import { EstadoInterface } from '../../interfaces/estado.interface';

@Component({
  selector: 'app-cliente-detalle',
  templateUrl: './cliente-detalle.component.html',
  styleUrls: ['./cliente-detalle.component.css']
})
export class ClienteDetalleComponent implements OnInit {

  cliente: ClienteInterface;
  direcciones: DireccionClienteInterface[];
  telefonos: TelefonoClienteInterface[];
  tiposTelefono: TipoTelefonoInterface[];
  infoApp: InfoApp;
  estados: EstadoInterface[];

  accion: string;

  clienteForm: FormGroup;

  submitted = false;
  submittedPhone = false;
  submittedAddress = false;
  phoneIsBusy = false;
  addressIdBusy = false;


  pageTitle: string;
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  constructor(private formBuilder: FormBuilder,
              private clienteService: ClienteService,
              private alertService: AlertService,
              private actRoute: ActivatedRoute,
              private telefonoClienteService: TelefonoClienteService,
              private direccionClienteServie: DireccionClienteService,
              private catalogoService: CatalogosService,
              private loginService: LoginService) {
              }

  ngOnInit(): void {

    // Obtenemos la información del cliente por medio del cliente-resolver
    this.cliente = this.actRoute.snapshot.data['cliente'];

    // obtenemos el tipo de acceso ( 1 = Nuevo, 2 = Edición, 3 = Consulta)
    this.accion = this.actRoute.snapshot.paramMap.get('accion');

    switch (this.accion) {
      case '1':
        this.pageTitle = 'RESGITRO DE NUEVO CLIENTE';
        break;
      case '2':
        this.pageTitle = `MODIFICACIÓN DE CLIENTE: 
                          ${this.cliente.idCliente} - 
                          ${this.cliente.nombres} 
                          ${this.cliente.apellidoPaterno} 
                          ${this.cliente.apellidoMaterno} `;
      default:
        this.pageTitle = `DETALLE DE CLIENTE: 
                          ${this.cliente.idCliente} - 
                          ${this.cliente.nombres} 
                          ${this.cliente.apellidoPaterno} 
                          ${this.cliente.apellidoMaterno} `;
        break;
    }


    // Consula los estados
    this.estados = this.loginService.getInfoApp().Estados;

    // Consulta tipos Telefono
    this.catalogoService.getTiposTelefono()
    .subscribe((info: TipoTelefonoInterface[]) => {
      this.tiposTelefono = info;
    }),
    catchError( err => {
      this.alertService.error(err.message, this.options);
      throw err;
    });

    this.clienteForm = this.formBuilder.group({
      idCliente: [this.cliente.idCliente],
      nombres: [this.cliente.nombres, Validators.required],
      apellidoPaterno: [this.cliente.apellidoPaterno, Validators.required],
      apellidoMaterno: [this.cliente.apellidoMaterno],
      razonSocial: [this.cliente.razonSocial],
      rfc: [this.cliente.rfc,Validators.required],
      email: [this.cliente.email,Validators.email],
      activo: [this.cliente.activo],
      telefonosForm: new FormArray([]),
      direciconesForm: new FormArray([])
    });

    if (this.accion === '3') {
      this.clienteForm.disable();
    }

    // Consulta Direcicones Cliente
    this.direccionClienteServie.getDireccionCliente(this.cliente.idCliente)
    .subscribe( (info: DireccionClienteInterface[]) => {
      this.direcciones = info;
      // cargamos los formularios para cada una de las direcciones que tiene el cliente
      this.direcciones.forEach(direccion => {
        this.df.push(
          this.formBuilder.group({
            idDireccionCliente: [direccion.idDireccionCliente],
            idCliente: [direccion.idCliente],
            calle: [direccion.calle, Validators.required],
            noExt: [direccion.noExt, Validators.required],
            noInt: [direccion.noInt],
            colonia: [direccion.colonia,Validators.required],
            cp: [direccion.cp, Validators.required],
            ciudad: [direccion.ciudad, Validators.required],
            estado: [direccion.estado, Validators.required]
          })
        );
      });
    }),
    catchError( err => {
      this.alertService.error(err.message, this.options);
      throw err;
    });

    // Consultar Teléfonos Cliente
    this.telefonoClienteService.getTelefonoCliente(this.cliente.idCliente)
    .subscribe( (info: TelefonoClienteInterface[]) => {
      this.telefonos = info;

      this.telefonos.forEach(telefono => {
        this.tf.push(
          this.formBuilder.group({
            idTelefonoCliente: [telefono.idTelefonoCliente],
            idCliente: [telefono.idCliente],
            idTipoTelefono: [telefono.idTipoTelefono, Validators.required],
            telefono: [telefono.telefono, Validators.required]
          })
        );
      });
    }),
    catchError( err => {
      this.alertService.error(err.message, this.options);
      throw err;
    });
  }

  // convenience getters for easy access to form fields
  get f() { return this.clienteForm.controls; }
  get tf() { return this.f.telefonosForm as FormArray; }
  get df() { return this.f.direciconesForm as FormArray; }

  tfi(i) {
    return this.tf.controls[i] as FormGroup;
  }

  dfi(i) {
    return this.df.controls[i] as FormGroup;
  }

  addTelefono() {
    if (this.phoneIsBusy === true) {
      this.alertService.warn('Registro de teléfono en proceso', this.options);
      return;
    }

    this.phoneIsBusy = true;
    this.tf.push(
      this.formBuilder.group({
        idTelefonoCliente: [0],
        idCliente: [this.cliente.idCliente],
        idTipoTelefono: ['', Validators.required],
        telefono: ['', Validators.required]
      })
    );
  }

  guardarTelefono(index: number) {
    this.submittedPhone = true;

    if (this.tfi(index).invalid) {
      return;
    }

    // cargamos la información que guardaremos en la bd
    const telefono: TelefonoClienteInterface = {
      idTelefonoCliente : this.tfi(index).value.idTelefonoCliente,
      idCliente : this.tfi(index).value.idCliente,
      idTipoTelefono : this.tfi(index).value.idTipoTelefono,
      telefono : this.tfi(index).value.telefono
    };

    // si ya existe idTelefonoCliete actualizamos el registro, si no registramos el telefono
    if (telefono.idTelefonoCliente && telefono.idTelefonoCliente > 0) {
      this.telefonoClienteService.actualizarTelefonoCliente(telefono.idTelefonoCliente, telefono).toPromise()
      .then((resp: any) => {
        if (resp.result === 0) {
          console.error(resp.errorMessage);
          throw(resp.friendlyMessage);
        } else {
          this.alertService.success('Teléfono actualizado correctamente', this.options);
        }
      }),
      catchError( err => {
        this.alertService.error(err.message, this.options);
        throw err;
      });
    } else {
      this.telefonoClienteService.crearTelefonoCliente(telefono).toPromise()
      .then((resp: any) => {
        if (resp.result === 0) {
          console.error(resp.errorMessage);
          throw(resp.friendlyMessage);
        } else {
          this.alertService.success('Teléfono registrado correctamente', this.options);
          this.tfi(index).controls['idTelefonoCliente'].setValue(resp.id);
        }
      })
      .catch( err => {
        this.alertService.error(err.message, this.options);
        throw err;
      });
    }

    this.submittedPhone = false;
    this.phoneIsBusy = false;
  }

  eliminarTelefono(index: any) {
    // obtenemos el idTelefonoCliente que se desea eliminar
    const idTelefonoCliente: number = this.tfi(index).value.idTelefonoCliente;

    // damos de baja el telefono en la bd
    this.telefonoClienteService.eliminarTelefonoCliente(idTelefonoCliente).toPromise()
    .then((result: any) => {
      if (result.result === 0) {
        console.error(result.errorMessage);
        throw(result.friendlyMessage);
      } else {
        this.alertService.success('Teléfono eliminado correctamente', this.options);
        this.tf.removeAt(index);
      }
    }).catch((err) => {
      this.alertService.error(err.message, this.options);
    });
    this.phoneIsBusy = false;
  }

  addDireccion() {
    if (this.addressIdBusy === true) {
      this.alertService.warn('Registro de dirección en proceso', this.options);
      return;
    }

    this.addressIdBusy = true;

    this.df.push(
      this.formBuilder.group({
        idDireccionCliente: [0],
        idCliente: [this.cliente.idCliente],
        calle: ['', Validators.required],
        noExt: ['', Validators.required],
        noInt: [''],
        colonia: ['', Validators.required],
        cp: ['', Validators.required],
        ciudad: ['', Validators.required],
        estado: ['', Validators.required]
      })
    );
  }

  guardarDireccion(index: number) {
    this.submittedAddress = true;

    if (this.dfi(index).invalid) {
      return;
    }

    // cargamos la información que guardaremos en la bd
    const direccion: DireccionClienteInterface = {
      idDireccionCliente : this.dfi(index).value.idDireccionCliente,
      idCliente : this.dfi(index).value.idCliente,
      calle : this.dfi(index).value.calle,
      noExt : this.dfi(index).value.noExt,
      noInt : this.dfi(index).value.noInt,
      colonia : this.dfi(index).value.colonia,
      cp : this.dfi(index).value.cp,
      ciudad : this.dfi(index).value.ciudad,
      estado : this.dfi(index).value.estado
    };

    // si ya existe idDireccionCliente actualizamos el registro, si no registramos la direccion
    if (direccion.idDireccionCliente && direccion.idDireccionCliente > 0) {
      this.direccionClienteServie.actualizarDireccionCliente(direccion.idDireccionCliente, direccion).toPromise()
      .then((resp: any) => {
        if (resp.result === 0) {
          console.error(resp.errorMessage);
          throw(resp.friendlyMessage);
        } else {
          this.alertService.success('Dirección actualizada correctamente', this.options);
        }
      }),
      catchError( err => {
        this.alertService.error(err.message, this.options);
        throw err;
      });
    } else {
      this.direccionClienteServie.crearDireccionCliente(direccion).toPromise()
      .then((resp: any) => {
        if (resp.result === 0) {
          console.error(resp.errorMessage);
          throw(resp.friendlyMessage);
        } else {
          this.alertService.success('Dirección registrada correctamente', this.options);
          this.dfi(index).controls['idDireccionCliente'].setValue(resp.id);
        }
      })
      .catch( err => {
        this.alertService.error(err.message, this.options);
        throw err;
      });
    }

    this.submittedAddress = false;
    this.addressIdBusy = false;
  }

  eliminarDireccion(index: any) {
    // obtenemos el idTelefonoCliente que se desea eliminar
    const idDireccionCliente: number = this.dfi(index).value.idDireccionCliente;

    // damos de baja la direcicón en la bd
    this.direccionClienteServie.eliminarDireccionCliente(idDireccionCliente).toPromise()
    .then((result: any) => {
      if (result.result === 0) {
        console.error(result.errorMessage);
        throw(result.friendlyMessage);
      } else {
        this.alertService.success('Dirección eliminada correctamente', this.options);
        this.df.removeAt(index);
      }
    }).catch((err) => {
      this.alertService.error(err.message, this.options);
    });
    this.addressIdBusy = false;
  }


  submitForm() {
    this.submitted = true;

    if (this.clienteForm.invalid) {
      return;
    }

    // creamos objeto para guardar la información en la bd
    this.cliente = {
      idCliente : this.clienteForm.value.idCliente,
      nombres : this.clienteForm.value.nombres,
      apellidoPaterno : this.clienteForm.value.apellidoPaterno,
      apellidoMaterno : this.clienteForm.value.apellidoMaterno,
      razonSocial : this.clienteForm.value.razonSocial,
      rfc : this.clienteForm.value.rfc,
      email : this.clienteForm.value.email,
      activo : this.clienteForm.value.activo
    };


    // ALta
    if (this.accion === '1') {
      this.clienteService.crearUsuario(this.cliente).toPromise()
      .then((resp: any) => {
        if (resp.result === 0) {
          console.error(resp.errorMessage);
          throw(resp.friendlyMessage);
        } else {
          this.alertService.success('Cliente registrado correctamente', this.options);
          this.accion = '2';
          this.cliente.idCliente = resp.id;
          this.clienteForm.controls['idCliente'].setValue(resp.id);
        }
      })
      .catch( err => {
        this.alertService.error(err.message, this.options);
        throw err;
      });
    }

    // Edición
    if (this.accion === '2') {

      this.clienteService.actualizarCliente(this.cliente.idCliente, this.cliente).toPromise()
      .then((resp: any) => {
        if (resp.result === 0) {
          console.error(resp.errorMessage);
          throw(resp.friendlyMessage);
        } else {
          this.alertService.success('Cliente actualizado correctamente', this.options);
        }
      })
      .catch( err => {
        this.alertService.error(err.message, this.options);
        throw err;
      });
    }
    this.submitted = false;
  }
}
