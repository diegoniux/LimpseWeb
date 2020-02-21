import { Component, OnInit } from '@angular/core';
import { InfoAppService } from '../../services/info-app.service';
import { ModulosService } from '../../services/modulos.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor( public infoPagService: InfoAppService,
               public modulosService: ModulosService ) { }

  ngOnInit(): void {
  }

}
