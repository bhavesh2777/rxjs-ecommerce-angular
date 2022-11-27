import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CardType } from '../models/home.model';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private readonly router: Router) {}

  redirectToPage(cardName: string) {
    if (cardName == CardType.PRODUCT_LIST)
      this.router.navigate(['home/product-list']);
    else if (cardName == CardType.CART) this.router.navigate(['home/cart']);
  }
}
