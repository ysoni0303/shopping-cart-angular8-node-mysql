import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() count = 0;
  @Input() cart_item_count = 0;
  current_currency = "USD"
  is_login = false;

  constructor(private _router: Router) { }

  ngOnInit() {

    if (localStorage.getItem("token") == null || localStorage.getItem("token") == "null" || localStorage.getItem("token") == undefined || localStorage.getItem("token") == '')
      this.is_login = false;
    else
      this.is_login = true;

    if (JSON.parse(localStorage.getItem("cart-items")) != null) {
      var items = [];
      items = JSON.parse(localStorage.getItem("cart-items"));
      this.cart_item_count = items.length
      items.forEach((element) => {
        this.count = this.count + (parseInt(element.price) * parseInt(element.qty));
      })
    }
  }

  link = ''
  goToCart(event) {
    if (event.ctrlKey || event.metaKey) {
      event.preventDefault()
      event.stopPropagation()
      window.open('cart', '_blank')
    } else
      this._router.navigate(['cart']);

    this.link = 'cart'
  }

}