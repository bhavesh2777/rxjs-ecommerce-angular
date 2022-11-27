import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface UserData {
  name: string;
  position: number;
  weight: number;
  price: number;
}

const ELEMENT_DATA: UserData[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, price: 1 },
  { position: 2, name: 'Helium', weight: 4.0026, price: 2 },
  { position: 3, name: 'Lithium', weight: 6.941, price: 3 },
  { position: 4, name: 'Beryllium', weight: 9.0122, price: 4 },
  { position: 5, name: 'Boron', weight: 10.811, price: 5 },
  { position: 6, name: 'Carbon', weight: 12.0107, price: 6 },
  { position: 7, name: 'Nitrogen', weight: 14.0067, price: 7 },
  { position: 8, name: 'Oxygen', weight: 15.9994, price: 9 },
  { position: 9, name: 'Fluorine', weight: 18.9984, price: 8 },
  { position: 10, name: 'Neon', weight: 20.1797, price: 10 },
];

@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.scss'],
})
export class CommonTableComponent implements AfterViewInit {
  columns = [
    {
      columnDef: 'position',
      header: 'No.',
      cell: (element: UserData) => `${element.position}`,
    },
    {
      columnDef: 'name',
      header: 'Name',
      cell: (element: UserData) => `${element.name}`,
    },
    {
      columnDef: 'weight',
      header: 'Weight',
      cell: (element: UserData) => `${element.weight}`,
    },
    {
      columnDef: 'price',
      header: 'Price',
      cell: (element: UserData) => `${element.price}`,
    },
    {
      columnDef: 'add_in_cart',
      header: 'Add in cart',
      cell: (element) => `add_in_cart`,
    },
  ];
  dataSource: MatTableDataSource<UserData>;
  displayedColumns = this.columns.map((c) => c.columnDef);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addProductInCart() {}
}
