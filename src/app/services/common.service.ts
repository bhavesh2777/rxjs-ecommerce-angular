import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from 'src/app/global';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private readonly _snackBar: MatSnackBar) {}

  openErrorSnackBar(message = 'Something went wrong!') {
    this._snackBar.open(message, '', {
      ...snackBarConfig,
      panelClass: ['error-snackbar'],
    });
  }

  openSuccessSnackBar(message = 'Success!') {
    this._snackBar.open(message, '', {
      ...snackBarConfig,
      panelClass: ['success-snackbar'],
    });
  }
}
