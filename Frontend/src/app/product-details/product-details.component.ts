import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from "jquery";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {
  product_slug;
  product_info: any = {};
  first_image;
  cart_array: any = [];
  count = 0;
  current_currency;
  flag = false;
  cart_item;
  add_cart_err_msg = "";
  constructor(private _service: ProductService,
    private _router: Router, private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    if (localStorage.getItem("token") == null || localStorage.getItem("token")=="null" || localStorage.getItem("token") == undefined || localStorage.getItem("token") == '')
    this._router.navigateByUrl("/login");

    var verticalOffset = typeof (verticalOffset) != 'undefined' ? verticalOffset : 0;
    var element = $('body');
    var offset = element.offset();
    var offsetTop = offset.top;
    $('html, body').animate({ scrollTop: offsetTop - 70 }, 0, 'linear');
    this.product_slug = this.activatedRoute.snapshot.paramMap.get('product_slug');

    this.count = 0;
    if (localStorage.getItem("cart-items") != null) {
      this.cart_array = JSON.parse(localStorage.getItem("cart-items"));
    }
    this.getProductDetails(this.product_slug);
  }

  getProductDetails(product_slug) {
    document.getElementById('progress_modal').style.display = "block";
    this._service.getProductDetails(product_slug).subscribe(
      data => { this.redirect_getProductDetails(data) },
      err => { alert("something went wrong geting product details") }
    );
  }

  redirect_getProductDetails(api_data) {
    $("#record_product_details").css("visibility", "visible");
    document.getElementById('progress_modal').style.display = "none";
    this.flag = true;
    if (api_data.status == "success") {
      this.product_info = api_data.product[0];
      this.first_image = this.product_info.imageurl;
    }
    else {
      this.product_info = {};
    }
  }

  validate(evt) {
    var theEvent = evt || window.event;

    // Handle paste
    if (theEvent.type === 'paste') {
      key = evt.clipboardData.getData('text/plain');
    } else {
      // Handle key press
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  }

  cart_item_count = 0;
  addToCart() {
    if ($("#qty").val() != "") {
      $("#divadd_cart_err_msg").css("display", "none");
      this.cart_item = JSON.parse(localStorage.getItem("cart-items"));
      if (this.cart_item == null) {
        this.product_info.qty = $("#qty").val();
        var item = []
        item.push(this.product_info);
        localStorage.setItem("cart-items", JSON.stringify(item));
        alert("Item added successfuly");
        this._router.navigateByUrl("cart")
      } else {
        if (this.cart_item.find(x => x.id == this.product_info.id)) {
          var record = this.cart_item.find(x => x.id == this.product_info.id);
          var record_index = this.cart_item.findIndex(x => x.id == this.product_info.id);
          this.cart_item.splice(record_index, 1);
          record.qty = parseInt(record.qty) + parseInt($("#qty").val());
          this.cart_item.push(record)
          localStorage.setItem("cart-items", JSON.stringify(this.cart_item));
        } else {
          this.product_info.qty = $("#qty").val();
          this.cart_item.push(this.product_info);
          localStorage.setItem("cart-items", JSON.stringify(this.cart_item));
        }
        alert("Item added successfuly");
        this._router.navigateByUrl("cart");
      }
    } else {
      this.add_cart_err_msg = "Please enter quantity"
      $("#divadd_cart_err_msg").css("display", "block");
    }
  }
}
