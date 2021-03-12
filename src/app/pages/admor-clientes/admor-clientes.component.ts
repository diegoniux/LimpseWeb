import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admor-clientes',
  templateUrl: './admor-clientes.component.html',
  styleUrls: ['./admor-clientes.component.css']
})
export class AdmorClientesComponent implements OnInit {
  @ViewChild('targetGridClientes', { static: false }) dataGrid: DxDataGridComponent;
  clientesDataSource: CustomStore;

  constructor( private clienteService: ClienteService,
               private router: Router) {
    this.VerDetalleClick = this.VerDetalleClick.bind(this);
    this.EditarClick = this.EditarClick.bind(this);
    this.EliminarClick = this.EliminarClick.bind(this);

   }

  ngOnInit(): void {
    this.cargarClientes();
  }

  private cargarClientes() {
    const that = this;
    this.clientesDataSource = new CustomStore({
      key: 'idCliente',
      load: function(loadOptions: any) {
        return that.clienteService.getAllClientes()
        .toPromise()
        .then((data: any) => {
            return {
                data: data,
                totalCount: data.length
            };
        })
        .catch(error => {
          console.error(error);
          throw 'Error en el servicio'; 
        });
      },
    });
  }

  VerDetalleClick(e) {
    const IdCliente = e.row.data.idCliente;
    this.router.navigateByUrl(`/clientes/clientes/${IdCliente}/3`);
  }

  EditarClick(e) {
    const IdCliente = e.row.data.idCliente;
    this.router.navigateByUrl(`/clientes/clientes/${IdCliente}/2`);
  }

  EliminarClick(e) {
    const IdCliente = e.row.data.idCliente;
    alert('Eliminar ' + IdCliente);
  }

  AgregarClick() {
    this.router.navigateByUrl('/clientes/clientes/0/1');
  }
}
