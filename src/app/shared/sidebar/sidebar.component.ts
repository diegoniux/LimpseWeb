import { Component, OnInit } from '@angular/core';
import { InfoAppService } from '../../services/info-app.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor( public infoPagService: InfoAppService ) { }

  ngOnInit(): void {
  }

}
