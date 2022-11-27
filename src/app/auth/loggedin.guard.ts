import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../pages/login/login.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedinGuard implements CanActivate {
  constructor(
    private readonly myRoute: Router,
    private readonly loginService: LoginService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = this.loginService.fetchTokenFromStorage();
    if (token) {
      this.myRoute.navigate(['home/main']);
      return false;
    }
    return true;
  }
}
