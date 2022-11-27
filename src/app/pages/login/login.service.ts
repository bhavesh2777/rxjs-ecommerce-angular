import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { apiUrl } from 'src/app/global';
import { CommonService } from 'src/app/services/common.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly commonService: CommonService
  ) {}

  loginApi(loginBody) {
    return this.http.post(apiUrl + 'auth/login', loginBody);
  }

  logout() {
    localStorage.clear();
    this.commonService.openSuccessSnackBar('Successfully logged out!');
    this.router.navigate(['login']);
  }

  handleLogin(loginResponse) {
    if (loginResponse.id) {
      const fullName = loginResponse.firstName + ' ' + loginResponse.lastName;
      localStorage.setItem('token', 'Bearer ' + loginResponse.token);
      localStorage.setItem('fullName', fullName);
      this.commonService.openSuccessSnackBar('Successfully logged in!');
      this.router.navigate(['home/main']);
    } else {
      this.commonService.openErrorSnackBar();
    }
  }

  fetchNameFromStorage() {
    return localStorage.getItem('fullName');
  }

  fetchTokenFromStorage() {
    return localStorage.getItem('token');
  }
}
