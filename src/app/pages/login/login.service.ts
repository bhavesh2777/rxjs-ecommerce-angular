import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private readonly router: Router,
    private readonly commonService: CommonService
  ) {}

  login(loginCredentials: any) {
    this.commonService.openSuccessSnackBar('Successfully logged in!');
    this.router.navigate(['home/main']);
  }

  logout() {
    this.commonService.openSuccessSnackBar('Successfully logged out!');
    this.router.navigate(['login']);
  }
}
