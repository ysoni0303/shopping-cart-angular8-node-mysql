import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
declare var $;
@Component({
  selector: 'app-customer-order',
  templateUrl: './customer-order.component.html',
  styleUrls: ['./customer-order.component.css']
})
export class CustomerOrderComponent implements OnInit {
  constructor(private _userService: UserService, private _router: Router) { }
  user_email;
  user_id;
  order_list = [];

  ngOnInit() {
    if (localStorage.getItem("token") == null || localStorage.getItem("token")=="null" || localStorage.getItem("token") == undefined || localStorage.getItem("token") == '')
      this._router.navigateByUrl("/login");
    var verticalOffset = typeof (verticalOffset) != 'undefined' ? verticalOffset : 0;
    var element = $('body');
    var offset = element.offset();
    var offsetTop = offset.top;
    $('html, body').animate({ scrollTop: offsetTop - 70 }, 0, 'linear');
    this.user_email = localStorage.getItem("email");
    this.user_id = localStorage.getItem("id");
    this.getorder_list();
  }

  
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("email");
    this._router.navigateByUrl("/login");
  }

  getorder_list() {
    var data = { user_id: this.user_id };
    document.getElementById('progress_modal').style.display = "block";
    this._userService.getorder_list(data).subscribe(d => {
      document.getElementById('progress_modal').style.display = "none";
      if (d["status"] == "success") {
        this.order_list = d["orders"];
      } else {
        this.order_list = [];
      }
    }, err => {
      if (err["error"].response_status == "fail") {
        if (err["error"]["msg"] == "authenticate token expired") {
          localStorage.removeItem("token");
          this._router.navigateByUrl("/login");
        }
      }
    });
  }

  viewOrderDetails(order) {

    sessionStorage.setItem("order", order.id);
    this._router.navigateByUrl("/customer-order-details");
  }

}
