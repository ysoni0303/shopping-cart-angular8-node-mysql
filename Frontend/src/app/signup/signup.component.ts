import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from "jquery";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  register_user: FormGroup;
  submitted = false;

  constructor(private activeRoute: ActivatedRoute, private _router: Router, private formBuilder: FormBuilder,
    private _userService: UserService) { }

  ngOnInit() {

    this.register_user = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
      zipcode: ['', [Validators.required]],
      address: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      mobileno: ['', [Validators.required]]
    }, {
        validator: this.MustMatch('password', 'confirm_password')
      });

  }
  // nullValidator
  // convenience getter for easy access to form fields
  get f() { return this.register_user.controls; }



  alert_messege = '';
  success_flag = false;
  error = true;
  onSubmit() {
    this.submitted = true;
    if (this.register_user.invalid) {
      return;
    }
    document.getElementById('progress_modal').style.display = "block";

    this._userService.registered(this.register_user.value).subscribe(data => {
      document.getElementById('progress_modal').style.display = "none";
      if (data["status"] == 'success') {
        alert(data["message"]);
       this._router.navigateByUrl("/login")
      } else if (data["status"] == 'failed') {
       alert(data["message"]);      
      }
    }, err => {

    });
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

  validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test($email);
  }

}
