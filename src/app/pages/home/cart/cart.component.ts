import { Component } from '@angular/core';
import { cartTableColumns } from 'src/app/global';
import { CommonService } from 'src/app/services/common.service';
import { HomeService } from '../home.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  listLoader = false;

  constructor(
    private readonly homeService: HomeService,
    private readonly commonService: CommonService
  ) {}

  ngOnInit() {
    this.getCart();
  }

  private getCart() {
    this.listLoader = true;
    const cartListResObs$ = this.homeService.getAllCartApi();
    cartListResObs$
      .pipe(
        map((item: any) => {
          return this.homeService.handleCartMapping(item);
        })
      )
      .subscribe({
        next: this.handleCartResponse.bind(this),
        error: this.handleCartError.bind(this),
      });
  }

  private handleCartResponse(cartListRes) {
    this.homeService.cartTableData$.next(cartListRes);
    this.homeService.cartTableColumns$.next(cartTableColumns);
    this.listLoader = false;
  }

  private handleCartError(err) {
    this.commonService.openErrorSnackBar(err.error || 'Something went wrong!');
    this.listLoader = false;
  }

  ngOnDestroy() {
    this.homeService.cartTableData$.next(null);
    this.homeService.cartTableColumns$.next(null);
  }
}
