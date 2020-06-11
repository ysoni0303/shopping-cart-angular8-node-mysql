import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-checkout-process',
  templateUrl: './checkout-process.component.html',
  styleUrls: ['./checkout-process.component.css']
})

export class CheckoutProcessComponent implements OnInit {
  user_data: any = {};
  cart_item = [];
  current_currency;
  submit_array:any={};
  total_price=0;
  mastercard;
  visa;
  amex;


  constructor(private _service: ProductService, private _userService: UserService ,private _router: Router) {
  }

  ngOnInit() {
    if (localStorage.getItem("token") == null || localStorage.getItem("token")=="null" || localStorage.getItem("token") == undefined || localStorage.getItem("token") == '')
    this._router.navigateByUrl("/login");

    var verticalOffset = typeof (verticalOffset) != 'undefined' ? verticalOffset : 0;
    var element = $('body');
    var offset = element.offset();
    var offsetTop = offset.top;
    $('html, body').animate({ scrollTop: offsetTop - 70 }, 0, 'linear');
    $("#record_checkout").css("visibility", "visible");

    $("#ACCT").payform('formatCardNumber');

    $("#CVV").payform('formatCardCVC');
    this.mastercard = $("#mastercard");
    this.visa = $("#visa");
    this.amex = $("#amex");
    this.updateCart();
  }

  updateCart() {
    this.cart_item = JSON.parse(localStorage.getItem("cart-items"));
 
    this.cart_item .forEach((element) => {
      this.total_price = this.total_price + (parseInt(element.price) * parseInt(element.qty));
    });
    this.getuser_data();
  }
   
  getuser_data() {
    document.getElementById('progress_modal').style.display = "block";
    this._userService.getuser_data(localStorage.getItem("id")).subscribe(data => {
      document.getElementById('progress_modal').style.display = "none";
     this.user_data= data["users"][0];
    }, err => {
      if (err["error"].response_status == "fail") {
        if (err["error"]["msg"] == "authenticate token expired") {
          localStorage.removeItem("token");
          this._router.navigateByUrl("/login");
        }
      }
    });
  }

 
  alert_messege = '';

  CREDITCARDTYPE = "MasterCard";


  checkout(paypal_response, transaction_id) {
    this.submit_array.paypal_response = JSON.stringify(paypal_response);
    this.submit_array.products = this.cart_item;
    this.submit_array.transaction_id = transaction_id;
    this.submit_array.user_id = localStorage.getItem("id");
    this.submit_array.total_price = paypal_response.AMT
    document.getElementById('progress_modal').style.display = "block";
    this._service.checkout(this.submit_array).subscribe(
      data => { this.responseCheckout(data) },
      err => { alert("something went wrong in checkout") }
    );
  }

  exp_month = "00";
  exp_year = "00";
  monthError = false;
  yearError = false;

  onValid() {
    this.monthError = false;
    this.yearError = false;
    if ($('#exp_month').val() == "00") {
      if ($('#exp_year').val() == "00") {
        this.yearError = true;
      }
      this.monthError = true;
      return true;
    }
    if ($('#exp_year').val() == "00") {
      this.yearError = true;
      return true;
    }
  }

  submitCardPayment(data) {
    this.monthError = false;
    this.yearError = false;
    if (data.exp_month == "00") {
      if (data.exp_year == "00") {
        this.yearError = true;
      }
      this.monthError = true;
      return true;
    }
    if (data.exp_year == "00") {
      this.yearError = true;
      return true;
    }
    this.cardTrue(data);
  }

  cardTrue(data) {
    var nm = data.username.split(" ");
    var FIRSTNAME = nm[0];
    var LASTNAME = "";
    for (let k = 1; k < nm.length; k++) {
      LASTNAME = LASTNAME + nm[k] + " ";
    }
    var AMT = this.total_price.toFixed(2);
    var STREET = this.user_data.address;
    var CITY = this.user_data.city;
    var STATE = this.user_data.state;
    var ZIP = this.user_data.zipcode;
    var COUNTRYCODE = this.user_data.country;

    data.ACCT = data.ACCT.replace(/ /g, '');
    data.FIRSTNAME = FIRSTNAME;
    data.LASTNAME = LASTNAME;
    data.AMT = AMT;
    data.CREDITCARDTYPE = this.CREDITCARDTYPE;
    data.EXPDATE = data.exp_month + this.exp_year;
    data.STREET = STREET;
    data.CITY = CITY;
    data.STATE = STATE;
    data.ZIP = ZIP;
    data.COUNTRYCODE = COUNTRYCODE;
    document.getElementById('progress_modal').style.display = "block";
    this._service.paypal(data).subscribe(
      data => { this.responsePaypal(data["data"]) },
      err => { alert("something went wrong in paypal") }
    );
  }

  amexCardnumber(inputtxt) {
    var cardno = /^(?:3[47][0-9]{13})$/;
    return cardno.test(inputtxt);
  }

  visaCardnumber(inputtxt) {
    var cardno = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    return cardno.test(inputtxt);
  }

  masterCardnumber(inputtxt) {
    var cardno = /^(?:5[1-5][0-9]{14})$/;
    return cardno.test(inputtxt);
  }

  selectCardType() {

    var cardNumber = $("#ACCT").val();
    this.amex.removeClass('transparent');
    this.visa.removeClass('transparent');
    this.mastercard.removeClass('transparent');

    if ($.payform.parseCardType(cardNumber) == 'visa') {
      this.mastercard.addClass('transparent');
      this.amex.addClass('transparent');
      this.CREDITCARDTYPE = "Visa";
    } else if ($.payform.parseCardType(cardNumber) == 'amex') {
      this.mastercard.addClass('transparent');
      this.visa.addClass('transparent');
      this.CREDITCARDTYPE = "Amex";
    } else if ($.payform.parseCardType(cardNumber) == 'mastercard') {
      this.amex.addClass('transparent');
      this.visa.addClass('transparent');
      this.CREDITCARDTYPE = "MasterCard";
    }
  }

  responsePaypal(queryString) {
    if (queryString.indexOf('?') > -1) {
      queryString = queryString.split('?')[1];
    }
    var pairs = queryString.split('&');
    var result: any = {};
    pairs.forEach(function (pair) {
      pair = pair.split('=');
      result[pair[0]] = decodeURIComponent(pair[1] || '');
    });
    if (result.ACK == "Failure") {
      document.getElementById('progress_modal').style.display = "none";
      if (result.L_LONGMESSAGE0 != undefined)
        this.alert_messege = result.L_LONGMESSAGE0;
      else
        this.alert_messege = result.L_LONGMESSAGE1;

      $('#commonAlertModalCheckout').modal('show');
    } else if (result.ACK == "Success") {
      this.checkout(result, result.TRANSACTIONID)
    }

  }

  responseCheckout(api_data) {
    document.getElementById('progress_modal').style.display = "none";
    if (api_data.status == 'success') {
      alert('Order submitted successfully!')
      this.alert_messege = "Order submitted successfully!";
      localStorage.removeItem('cart-items');
      this._router.navigateByUrl("/customer-order")
    }
  }

}
