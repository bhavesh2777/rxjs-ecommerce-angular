import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/app/global';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  productTableData$ = new BehaviorSubject<any[]>([]);
  productTableColumns$ = new BehaviorSubject<any[]>([]);

  cartTableData$ = new BehaviorSubject<any[]>([]);
  cartTableColumns$ = new BehaviorSubject<any[]>([]);

  constructor(private readonly http: HttpClient) {}

  getAllProductsApi() {
    return this.http.get(apiUrl + 'products');
  }

  addProductApi(productBody) {
    return this.http.post(apiUrl + 'products/add', productBody);
  }

  getAllCartApi() {
    return this.http.get(apiUrl + 'carts/user/5');
  }

  handleCartMapping(item) {
    if (item.carts?.length != 0) {
      return item.carts[0].products;
    }
    return item;
  }

  addProductsEffects(response) {
    // const tempProductArr = [...this.productTableData$.value];
    const tempProductArr = JSON.parse(
      JSON.stringify(this.productTableData$.value)
    );
    tempProductArr.unshift(response);
    this.productTableData$.next(tempProductArr);
  }
}
