import {
  AfterViewInit,
  Component,
  ViewChild,
  OnInit,
  OnDestroy,
} from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/home.model';
import { HomeService } from 'src/app/pages/home/home.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Subscription, of } from 'rxjs';
import { debounceTime, switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.scss'],
})
export class CommonTableComponent implements OnInit, AfterViewInit, OnDestroy {
  searchControl = new FormControl(null);
  dataSource: MatTableDataSource<Product>;
  columns = [];
  displayedColumns = [];

  productDataSub: Subscription;
  productColSub: Subscription;

  cartDataSub: Subscription;
  cartColSub: Subscription;
  searchProductSub: Subscription;
  newProductSub: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  currentURL = '';

  constructor(
    private readonly router: Router,
    private readonly homeService: HomeService
  ) {}

  ngOnInit() {
    this.currentURL = this.router.url;
    // Product subscriptions
    this.productDataSub = this.homeService.productTableData$.subscribe(
      (tableData) => {
        if (tableData) this.arrangeDataSource(tableData);
      }
    );
    this.productColSub = this.homeService.productTableColumns$.subscribe(
      (tableCol) => {
        if (tableCol) this.arrangeDataColumns(tableCol);
      }
    );

    // Cart subscriptions
    this.cartDataSub = this.homeService.cartTableData$.subscribe(
      (tableData) => {
        if (tableData) this.arrangeDataSource(tableData);
      }
    );
    this.cartColSub = this.homeService.cartTableColumns$.subscribe(
      (tableCol) => {
        if (tableCol) this.arrangeDataColumns(tableCol);
      }
    );

    this.searchProductSub = this.searchControl.valueChanges
      .pipe(
        map((item) => item.trim().toLowerCase()),
        debounceTime(100),
        switchMap((value) => {
          if (this.currentURL.includes('product-list'))
            return this.homeService.searchProductApi(value);
          else return of(value);
        })
      )
      .subscribe((searchRes) => this.handleSearch(searchRes));

    // this.productSub = combineLatest([
    //   this.homeService.productTableData$,
    //   this.homeService.productTableColumns$,
    // ])
    //   .pipe(takeUntil(this.productUnsubscribe.asObservable()))
    //   .subscribe(([tableData, tableColumns]) => {
    //     if (tableData?.length != 0 && tableColumns?.length != 0) {
    //       this.arrangeDataSource(tableData);
    //       this.arrangeDataColumns(tableColumns);
    //     }
    //   });
  }

  ngAfterViewInit() {
    this.assignPaginationNSort();
  }

  addProductInCart() {}

  removeFromCart() {}

  private arrangeDataSource(tableData: any) {
    this.dataSource = new MatTableDataSource(tableData);
    this.assignPaginationNSort();
  }

  private arrangeDataColumns(dataColumns: any) {
    this.columns = dataColumns;
    this.displayedColumns = dataColumns.map((c) => c.columnDef);
  }

  private assignPaginationNSort() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  private handleCartSearch(cartStr: string) {
    this.dataSource.filter = cartStr;
  }

  private handleSearch(searchRes: any) {
    if (this.currentURL.includes('cart')) this.handleCartSearch(searchRes);
    else if (this.currentURL.includes('product-list'))
      this.handleProductSearch(searchRes);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private handleProductSearch(productResObj: any) {
    const productObs$ = of(productResObj).pipe(
      map((item: any) => item.products)
    );
    this.newProductSub = productObs$.subscribe((productList) => {
      this.homeService.productTableData$.next(productList);
    });
  }

  ngOnDestroy() {
    this.productColSub?.unsubscribe();
    this.productDataSub?.unsubscribe();
    this.cartDataSub?.unsubscribe();
    this.cartColSub?.unsubscribe();
    this.searchProductSub?.unsubscribe();
    this.newProductSub?.unsubscribe();
  }
}
