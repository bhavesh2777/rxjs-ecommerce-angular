import { Component } from '@angular/core';
import { LoginService } from 'src/app/pages/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  fullName = '';
  constructor(private readonly loginService: LoginService) {
    this.fullName = this.loginService.fetchNameFromStorage();
  }

  logoutNow() {
    this.loginService.logout();
  }
}
