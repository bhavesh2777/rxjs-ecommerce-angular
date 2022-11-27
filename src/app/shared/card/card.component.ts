import { Component, Input } from '@angular/core';
import { CardType } from 'src/app/models/home.model';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() item: any;

  constructor(private readonly sharedService: SharedService) {}

  clickCard(cardName: string) {
    if (cardName) this.sharedService.redirectToPage(cardName);
  }
}
