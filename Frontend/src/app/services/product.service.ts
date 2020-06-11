import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonUrl } from '../common-url'


var httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'auth': localStorage.getItem("token"),
    'email':localStorage.getItem("email")
  })
};

@Injectable({
  providedIn: 'root'
})


export class ProductService {

  url = CommonUrl.base_url_api;

  constructor(private _http: HttpClient) { }

  getproduct_list() {
    return this._http.get(this.url + "product", httpOptions)
  }

  getProductDetails(id) {
    return this._http.get(this.url + "productById?id=" + id,httpOptions)
  }

  checkout(data) {
    return this._http.post(this.url + "order-insert", data, httpOptions)
  }

  paypal(data) {
    return this._http.post(this.url + "paypal", data, httpOptions)
  }

}
