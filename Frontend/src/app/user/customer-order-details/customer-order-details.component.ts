import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
declare var $;
@Component({
  selector: 'app-customer-order-details',
  templateUrl: './customer-order-details.component.html',
  styleUrls: ['./customer-order-details.component.css']
})
export class CustomerOrderDetailsComponent implements OnInit {


  constructor(private _router: Router, private _userService: UserService) { }
  order_deatils_list = [];
  order_id = "";
  total = 0.0;
  msg = "";
  current_currency;
  ngOnInit() {
    var verticalOffset = typeof (verticalOffset) != 'undefined' ? verticalOffset : 0;
    var element = $('body');
    var offset = element.offset();
    var offsetTop = offset.top;
    $('html, body').animate({ scrollTop: offsetTop - 70 }, 0, 'linear');
    if (sessionStorage.getItem("order") != null)
      this.order_id = sessionStorage.getItem("order");

    this.getOrderDetails();
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("email");
    this._router.navigateByUrl("/login");
  }

  getOrderDetails() {
    var id = { order_id: this.order_id };
    document.getElementById('progress_modal').style.display = "block";
    this._userService.getOrderDetails(id).subscribe(data => {
      document.getElementById('progress_modal').style.display = "none";
      if (data["status"] == "success") {
        this.order_deatils_list = data["orders"];
        this.current_currency ="USD";
        this.total =this.order_deatils_list[0].totalprice;
        this.msg = "";
      } else {
        this.order_deatils_list = [];
        this.msg = "No details found";
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
  count = 0;
  print() {

    $("#print,#print1").printThis({
      printContainer: true,
      importCSS: true,
      importStyle: true,
      removeInline: false,
    });

    setTimeout(function () { $("#second").addClass("printClass"); $(".print_btn").css("display", "none"); $("a").css("text-decoration", "none") }, 100);
    setTimeout(function () { $("#second").removeClass("printClass"); $(".print_btn").css("display", "block"); }, 1000);

  }

}
