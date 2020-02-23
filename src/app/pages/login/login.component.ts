import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { LoginInterface } from '../../interfaces/login.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginInterface: LoginInterface;
  loginForm: FormGroup;
  submitted = false;

  constructor(private router: Router,
              public loginService: LoginService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      passw: ['', Validators.required]
    });

    this.loginService.setUserLoggedOn();

  }

  // función para obtener los controles del formulario
  get f() {return this.loginForm.controls; }

  public loginUsuario() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loginService.login(this.loginForm.value.user, this.loginForm.value.passw)
      .subscribe( (resp: LoginInterface) => {
        this.loginInterface = resp;

        if (this.loginInterface.objResultadoSP.result === 1) {
          this.loginService.setUserLoggedIn(this.loginInterface);
          this.router.navigate(['/home']);
        } else {
          console.log(this.loginInterface.objResultadoSP.errorMessage);
          alert(this.loginInterface.objResultadoSP.friendlyMessage);
        }

    } );
  }

}
