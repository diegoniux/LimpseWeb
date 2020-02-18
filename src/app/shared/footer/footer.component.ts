import { Component, OnInit } from '@angular/core';
import { InfoAppService } from '../../services/info-app.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  anio: number = new Date().getFullYear();

  constructor( public infoPagService: InfoAppService ) { }

  ngOnInit(): void {
  }

}
