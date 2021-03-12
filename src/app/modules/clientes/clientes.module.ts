import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClienteResolver } from '../../pages/cliente-detalle/cliente-resolver.service';


@NgModule({
  declarations: [],
  providers: [ClienteResolver],
  imports: [
    CommonModule,
    ClientesRoutingModule
  ]
})
export class ClientesModule { }
