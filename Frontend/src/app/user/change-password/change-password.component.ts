import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Meta, Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from "jquery"
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class change_passwordComponent implements OnInit {

  change_password: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private _userService: UserService, private _router: Router, private metaService: Meta, private title: Title) {
  }

  user_email;
  user_id;
  ngOnInit() {
    this.title.setTitle('Change Password');
    if (localStorage.getItem("token") == null || localStorage.getItem("token")=="null" || localStorage.getItem("token") == undefined || localStorage.getItem("token") == '')
      this._router.navigateByUrl("/login");

    var verticalOffset = typeof (verticalOffset) != 'undefined' ? verticalOffset : 0;
    var element = $('body');
    var offset = element.offset();
    var offsetTop = offset.top;
    $('html, body').animate({ scrollTop: offsetTop - 70 }, 0, 'linear');
    this.user_email = localStorage.getItem("email");
    this.user_id = localStorage.getItem("id");
    this.change_password = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
    }, {
      validator: this.MustMatch('password', 'confirm_password')
    });

    $(".add-method-btn").css("display", "none");
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("email");
    this._router.navigateByUrl("/login");
  }
  // convenience getter for easy access to form fields
  get f() { return this.change_password.controls; }

  checkPass(event) {
    var checkPass = { password: event.target.value, flag: "check password", email: this.user_email };

    if (event.target.value != null && event.target.value != "") {
      document.getElementById('progress_modal').style.display = "block";
      this._userService.resetPassword(checkPass).subscribe(data => {
        document.getElementById('progress_modal').style.display = "none";
        if (data["status"] == "success") {
          $("#errorMsg").text(data["message"]);
          $("#div1").attr("style", "display:inline-block !important");
          setTimeout(function () { $("#div1").css("display", "none"); }, 3000);
          this.change_password.enable();
          document.getElementById("current")["disabled"] = true;
          $(".add-method-btn").css("display", "block");
        } else {
          $("#errorMsg").text(data["message"]);
          $("#div1").attr("style", "display:inline-block !important");
          setTimeout(function () { $("#div1").css("display", "none"); }, 3000);
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

  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.change_password.invalid) {
      return;
    }
    this.change_password.value.email = this.user_email;
    this.change_password.value.flag = "update password";
    document.getElementById('progress_modal').style.display = "block";
    this._userService.resetPassword(this.change_password.value).subscribe(data => {
      document.getElementById('progress_modal').style.display = "none";
      if (data["status"] == "success") {
        $("#errorMsg").text(data["message"]);
        $("#div1").attr("style", "display:inline-block !important");
        setTimeout(function () { $("#div1").css("display", "none"); }, 3000);
        this.change_password.reset();
        this.change_password.controls['password'].disable();
        this.change_password.controls['confirm_password'].disable();
        document.getElementById("current")["value"] = "";
        document.getElementById("current")["disabled"] = false;
        this.change_password = this.formBuilder.group({
          password: ['', [Validators.required]],
          confirm_password: ['', [Validators.required]],
        }, {
          validator: this.MustMatch('password', 'confirm_password')
        });
        this.submitted = false;
        $(".add-method-btn").css("display", "none");
      } else {
        $("#errorMsg").text(data["message"]);
        $("#div1").attr("style", "display:inline-block !important");
        setTimeout(function () { $("#div1").css("display", "none"); }, 3000);
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
}
