import { Platform } from '@angular/cdk/platform';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _platform: Platform, private router: Router) {}

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401 || err.status === 403) {
      // Unauthorized
      localStorage.clear();
      this.router.navigate(['login']);
      return of(err.message);
    }
    return throwError(() => err);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      const modifiedReq = req.clone({
        headers: req.headers.set('access-token', token),
      });
      return next
        .handle(modifiedReq)
        .pipe(catchError((x) => this.handleAuthError(x)));
    } else {
      return next.handle(req);
    }
  }
}
