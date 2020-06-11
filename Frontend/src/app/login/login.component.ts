import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import * as $ from "jquery"
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login_user: FormGroup;
  submitted = false;

  constructor(private _router: Router, private formBuilder: FormBuilder, private _userService: UserService) {
  }

  ngOnInit() {
    if (localStorage.getItem("token") != null || localStorage.getItem("token")!="null" || localStorage.getItem("token") != undefined || localStorage.getItem("token") != '')
      this._router.navigateByUrl("/customer-profile");

    this.login_user = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.login_user.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.login_user.invalid) {
      return;
    }
    document.getElementById('progress_modal').style.display = "block";
    this.login_user.value.type = "system";
    this._userService.login(this.login_user.value).subscribe(s => {
      document.getElementById('progress_modal').style.display = "none";
      if (s["status"] == "success") {
        localStorage.setItem("type", 'system');
        localStorage.setItem("token", s["token"]);
        localStorage.setItem("email", s["data"][0].email);
        localStorage.setItem("id", s["data"][0].id);
        this._router.navigateByUrl("/customer-profile");
      } else {
        localStorage.setItem("type", null);
        localStorage.setItem("token", null);
        localStorage.setItem("email", null);
        localStorage.setItem("id", null);
        alert(s["message"]);
      }

    }, err => {

    })
  }


  validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test($email);
  }
 
}
