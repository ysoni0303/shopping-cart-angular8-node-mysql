import { Component, OnInit } from '@angular/core';
declare var $;
@Component({
  selector: 'app-side-header',
  templateUrl: './side-header.component.html',
  styleUrls: ['./side-header.component.css']
})
export class SideHeaderComponent implements OnInit {
type="";
  constructor() { }

  ngOnInit() {
sessionStorage.setItem('is_search_page', 'false');
    this.type = localStorage.getItem("type");
    // if($(window).width() < 1025){
    //   $('.filter-title').click(function(){
    //     if($(this).hasClass('myclass')) {
    //       $(this).removeClass('myclass');
    //       $(this).siblings('.mobile-display').slideUp(300);
    //     }
    //     else{
    //       $('.filter-title').removeClass('myclass');
    //       $(this).addClass('myclass');
    //       $('.mobile-display').slideUp(300);
    //       $(this).siblings('.mobile-display').slideDown(300);
    //     }
    //   });
    //   }
  }

}
