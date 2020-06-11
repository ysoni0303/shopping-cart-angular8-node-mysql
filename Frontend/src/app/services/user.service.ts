import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonUrl } from '../common-url';

const httpOptionss = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};
@Injectable({
  providedIn: 'root'
})

export class UserService {

  url = CommonUrl.base_url_api;

  constructor(private _http: HttpClient) { }

  registered(data) {
    return this._http.post(this.url + "register-user", data, httpOptionss);
  }

  login(data) {
    return this._http.post(this.url + "login", data, httpOptionss)
  }

  resetPassword(data) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'auth': localStorage.getItem("token"),
        'email':localStorage.getItem("email")
      })
    };
    return this._http.post(this.url + "reset-password", data, httpOptions);
  }

  getuser_data(id) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'auth': localStorage.getItem("token"),
        'email':localStorage.getItem("email")
      })
    };
    return this._http.get(this.url + "user-details?user_id=" + id, httpOptions);
  }



  // user order data
  getorder_list(data) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'auth': localStorage.getItem("token"),
        'email':localStorage.getItem("email")
      })
    };
    return this._http.post(this.url + "orders-list", data, httpOptions);
  }

  getOrderDetails(data) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'auth': localStorage.getItem("token"),
        'email':localStorage.getItem("email")
      })
    };
    return this._http.post(this.url + "order-details", data, httpOptions);
  }


  
}
