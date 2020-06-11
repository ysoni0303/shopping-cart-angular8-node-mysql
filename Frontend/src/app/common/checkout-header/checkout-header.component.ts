import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout-header',
  templateUrl: './checkout-header.component.html',
  styleUrls: ['./checkout-header.component.css']
})
export class CheckoutHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
sessionStorage.setItem('is_search_page', 'false');
  }

}
