import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

declare var $;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  cart_item: any = [];
  is_empty = true;
  sub_total = 0;
  total_price=0;
  current_currency;
  exchange;
  
  constructor( private _router: Router) {
  }

  ngOnInit() {
    if (localStorage.getItem("token") == null || localStorage.getItem("token")=="null" || localStorage.getItem("token") == undefined || localStorage.getItem("token") == '')
    this._router.navigateByUrl("/login");

    var verticalOffset = typeof (verticalOffset) != 'undefined' ? verticalOffset : 0;
    var element = $('body');
    var offset = element.offset();
    var offsetTop = offset.top;
    $('html, body').animate({ scrollTop: offsetTop - 70 }, 0, 'linear');
    this.sub_total = 0;
    this.exchange = localStorage.getItem('exchange_rate');
    this.current_currency = "USD";
    $("#record_cart").css("visibility", "visible");
    this.updateCart();
  }


  updateCart() {
    this.cart_item = JSON.parse(localStorage.getItem("cart-items"));
    if (this.cart_item.length > 0) {
      this.is_empty = false;
    } else {
      this.is_empty = true;
    }
    this.cart_item .forEach((element) => {
      this.total_price = this.total_price + (parseInt(element.price) * parseInt(element.qty));
    })
  }


  id;
  removeItemFromCart(id) {
    $("#confirm_popup").css("display", "block");
    this.id = id;
  }

  yesRemoveClick() {
    var record_index = this.cart_item.findIndex(x => x.id == this.id);
    this.cart_item.splice(record_index, 1);
    localStorage.setItem("cart-items", JSON.stringify(this.cart_item));
    $("#confirm_popup").css("display", "none");
    location.reload();
  }

  noRemoveClick() {
    $("#confirm_popup").css("display", "none");
  }

  checkout() {
    localStorage.setItem('voucher_code', $('#txt_voucher').val());
  }

  closePopup() {
    $("#confirm_popup").css("display", "none");
  }
}