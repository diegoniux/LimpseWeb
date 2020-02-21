import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { LoginInterface } from '../../interfaces/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginInterface: LoginInterface;

  constructor(private router: Router,
              public loginService: LoginService) {
               }

  ngOnInit(): void {
  }

  public loginUsuario(formData) {
    this.loginService.login(formData.user, formData.passw)
      .subscribe( (resp: LoginInterface) => {
        this.loginInterface = resp;

        if (this.loginInterface.objResultadoSP.result === 1) {
          this.router.navigate(['/home']);
        } else {
          console.log(this.loginInterface.objResultadoSP.errorMessage);
          alert(this.loginInterface.objResultadoSP.friendlyMessage);
        }

    } );



    // if (this.loginService.loginInterface?.objResultadoSP.result === 1) {
    //   this.router.navigate(['/home']);
    // } else {
    //   console.log(this.loginService.loginInterface?.objResultadoSP);
    // }
  }

}
