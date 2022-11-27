import { Component } from '@angular/core';
import { CardType } from 'src/app/models/home.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  cardList = [
    {
      name: CardType.PRODUCT_LIST,
      description: 'See the product list and also add the products!',
    },
    {
      name: CardType.CART,
      description: 'A cart is a wishlist of products!',
    },
  ];
}
