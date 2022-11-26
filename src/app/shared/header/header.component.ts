import { Component } from '@angular/core';
import { LoginService } from 'src/app/pages/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private readonly loginService: LoginService) {}

  logoutNow() {
    this.loginService.logout();
  }
}
