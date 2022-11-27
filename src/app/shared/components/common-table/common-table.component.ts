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
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.scss'],
})
export class CommonTableComponent implements OnInit, AfterViewInit, OnDestroy {
  dataSource: MatTableDataSource<Product>;
  columns = [];
  displayedColumns = [];

  productDataSub: Subscription;
  productColSub: Subscription;

  cartDataSub: Subscription;
  cartColSub: Subscription;
  // private productUnsubscribe: Subject<void> = new Subject();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private readonly homeService: HomeService) {}

  ngOnInit() {
    // Product subscriptions
    this.productDataSub = this.homeService.productTableData$.subscribe(
      (tableData) => {
        if (tableData?.length != 0) this.arrangeDataSource(tableData);
      }
    );
    this.productColSub = this.homeService.productTableColumns$.subscribe(
      (tableCol) => {
        if (tableCol?.length != 0) this.arrangeDataColumns(tableCol);
      }
    );

    // Cart subscriptions
    this.cartDataSub = this.homeService.cartTableData$.subscribe(
      (tableData) => {
        if (tableData?.length != 0) this.arrangeDataSource(tableData);
      }
    );
    this.cartColSub = this.homeService.cartTableColumns$.subscribe(
      (tableCol) => {
        if (tableCol?.length != 0) this.arrangeDataColumns(tableCol);
      }
    );

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
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addProductInCart() {}

  removeFromCart() {}

  private arrangeDataSource(tableData: any) {
    this.dataSource = new MatTableDataSource(tableData);
  }

  private arrangeDataColumns(dataColumns: any) {
    this.columns = dataColumns;
    this.displayedColumns = dataColumns.map((c) => c.columnDef);
  }

  ngOnDestroy() {
    this.productColSub?.unsubscribe();
    this.productDataSub?.unsubscribe();
    // this.productUnsubscribe.next();
    // this.productUnsubscribe.complete();
  }
}
