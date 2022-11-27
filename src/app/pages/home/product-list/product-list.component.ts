import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeService } from '../home.service';
import { map } from 'rxjs/operators';
import { CommonService } from 'src/app/services/common.service';
import { productTableColumns } from 'src/app/global';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  listLoader = false;

  constructor(
    private readonly homeService: HomeService,
    private readonly commonService: CommonService
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  private getProducts() {
    this.listLoader = true;
    const productListResObs$ = this.homeService.getAllProductsApi();
    productListResObs$.pipe(map((item: any) => item.products)).subscribe({
      next: this.handleProductListResponse.bind(this),
      error: this.handleProductListError.bind(this),
    });
  }

  private handleProductListResponse(productListRes) {
    this.homeService.productTableData$.next(productListRes);
    this.homeService.productTableColumns$.next(productTableColumns);
    this.listLoader = false;
  }

  private handleProductListError(err) {
    this.commonService.openErrorSnackBar(err.error || 'Something went wrong!');
    this.listLoader = false;
  }

  ngOnDestroy() {
    this.homeService.productTableData$.next(null);
    this.homeService.productTableColumns$.next(null);
  }
}
