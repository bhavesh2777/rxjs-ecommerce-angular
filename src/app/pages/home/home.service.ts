import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/app/global';
import { BehaviorSubject, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  productTableData$ = new BehaviorSubject<any[]>(null);
  productTableColumns$ = new BehaviorSubject<any[]>(null);

  cartTableData$ = new BehaviorSubject<any[]>(null);
  cartTableColumns$ = new BehaviorSubject<any[]>(null);

  constructor(private readonly http: HttpClient) {}

  getAllProductsApi() {
    return this.http.get(apiUrl + 'products');
  }

  addProductApi(productBody) {
    return this.http.post(apiUrl + 'products/add', productBody);
  }

  searchProductApi(searchString: string) {
    return this.http.get(apiUrl + 'products/search?q=' + searchString);
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
