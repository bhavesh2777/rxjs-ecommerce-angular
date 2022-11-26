import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly loginService: LoginService,
    private readonly commonService: CommonService
  ) {
    this.loginForm = this._formBuilder.group({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  submitLogin() {
    if (this.loginForm.valid) {
      const loginBody = {
        email: this.loginForm.controls['email'].value,
        password: this.loginForm.controls['password'].value,
      };
      this.loginService.login(loginBody);
    } else {
      this.commonService.openErrorSnackBar('Please enter valid inputs!');
    }
  }
}
