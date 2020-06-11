import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import * as $ from "jquery";
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product_list;
  current_currency;

  constructor(private _service: ProductService, private _router: Router) { }

  ngOnInit() {
    if (localStorage.getItem("token") == null || localStorage.getItem("token")=="null" || localStorage.getItem("token") == undefined || localStorage.getItem("token") == '')
    this._router.navigateByUrl("/login");
    
    var verticalOffset = typeof (verticalOffset) != 'undefined' ? verticalOffset : 0;
    var element = $('body');
    var offset = element.offset();
    var offsetTop = offset.top;
    $('html, body').animate({ scrollTop: offsetTop - 70 }, 0, 'linear');
    this.current_currency="USD";
    this.getProduct();
  }

  getProduct() {
    this._service.getproduct_list().subscribe(
      data => { this.redirectDataGetproduct_list(data) },
      err => { alert("something went wrong in product") }
    );
  }

  redirectDataGetproduct_list(api_data) {
    if (api_data.status == 'success') {
      this.product_list = "";
      this.product_list = api_data.products;
    }else{
      this.product_list = "";
    }
   $('#record_product').css('visibility', 'visible');
  }

} 
