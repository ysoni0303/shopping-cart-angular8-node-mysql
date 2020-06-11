import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import * as $ from "jquery";
@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {

  name;
  email;
  mobile_number;
  address;
  city;
  state;
  country;
  zipcode;
  constructor(private _router: Router, private _userService: UserService) { }
  user_email;
  user_id;
  ngOnInit() {
    if (localStorage.getItem("token") == null || localStorage.getItem("token") == "null" || localStorage.getItem("token") == undefined || localStorage.getItem("token") == '')
      this._router.navigateByUrl("/login");
    var verticalOffset = typeof (verticalOffset) != 'undefined' ? verticalOffset : 0;
    var element = $('body');
    var offset = element.offset();
    var offsetTop = offset.top;
    $('html, body').animate({ scrollTop: offsetTop - 70 }, 0, 'linear');
    this.user_email = localStorage.getItem("email");
    this.user_id = localStorage.getItem("id");
    this.getuser_data();
  }

  
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("email");
    this._router.navigateByUrl("/login");
  }

  getuser_data() {
    document.getElementById('progress_modal').style.display = "block";
    this._userService.getuser_data(this.user_id).subscribe(data => {
      document.getElementById('progress_modal').style.display = "none";
      this.name = data["users"][0].name;
      this.address = data["users"][0].address;
      $("#email").val(data["users"][0].email);
      this.mobile_number = data["users"][0].mobileno;
      this.city = data["users"][0].city;
      this.state = data["users"][0].state;
      this.country = data["users"][0].country;
      this.zipcode = data["users"][0].zipcode;
    }, err => {
      if (err["error"].response_status == "fail") {
        if (err["error"]["msg"] == "authenticate token expired") {
          localStorage.removeItem("token");
          this._router.navigateByUrl("/login");
        }
      }
    });
  }
}
