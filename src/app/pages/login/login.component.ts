import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { LoginForm } from 'src/app/models/login.model';
import { CommonService } from 'src/app/services/common.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loginLoader = false;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly loginService: LoginService,
    private readonly commonService: CommonService
  ) {
    this.prepareLoginForm();
  }

  submitLogin() {
    this.loginLoader = true;
    if (this.loginForm.valid) {
      const loginReqBody: LoginForm = {
        username: this.loginForm.controls['username'].value,
        password: this.loginForm.controls['password'].value,
        expiresInMins: 60,
      };
      const loginResObs$ = this.loginService.loginApi(loginReqBody);
      loginResObs$.subscribe({
        next: this.handleLoginResponse.bind(this),
        error: this.handleLoginError.bind(this),
      });
      // Observable triggered only once no need to unsubscribe
    } else {
      this.commonService.openErrorSnackBar('Please enter valid inputs!');
      this.loginLoader = false;
    }
  }

  private handleLoginResponse(response) {
    this.loginService.handleLogin(response);
    this.loginLoader = false;
  }

  private handleLoginError(error) {
    this.commonService.openErrorSnackBar(
      error?.error?.message || 'Something went wrong!'
    );
    this.loginLoader = false;
  }

  private prepareLoginForm() {
    this.loginForm = this._formBuilder.group({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }
}
