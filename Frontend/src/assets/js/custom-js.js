
  $(document).ready(function() {
	$("#filter_link_on_off").click(function(){
		//alert("gkegherkhg")
		$(this).toggleClass('active');
		$(".newside-bar-div").toggle();
		 return false;
	  });
  });
  
  $(document).ready(function () {
	wow = new WOW({
		boxClass: 'wow',
		animateClass: 'animated',
		offset: 140,
		mobile: false,
		live: true
	}
	)
	wow.init();

	var cities = [
		"Bogota",
		"Buenos Aires",
		"Brasília",
		"Mexico City",
		"São Paulo",
	];

	$("#cities").autocomplete({
		appendTo: '.city_list',
		source: cities
	});

	//slick js
	$('#favourite_destination').slick({

		slidesToShow: 1,
		slidesToScroll: 1,
		dots: true,
		speed: 2000,
		arrows: false,
		autoplay: true,
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			}

		}]
	});






	$('.detail_pro_slider').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        dots: true,
        speed: 2000,
        arrows: true,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ]
    });





	//slick js
	$('#value-bundles ul').slick({
		slidesToShow: 2,
		slidesToScroll: 2,
		dots: false,
		speed: 2000,
		arrows: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			},
		]
	});


	//slick js
	$('#brand-logo').slick({
		slidesToShow: 5,
		slidesToScroll: 5,
		dots: false,
		speed: 2000,
		arrows: true,
		autoplay: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				}
			},
		]
	});


	$('#review-slider').slick({
		slidesToShow: 2,
		slidesToScroll: 2,
		dots: true,
		speed: 2000,
		arrows: true,
		autoplay: true,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			},
		]
	});
	
	$('.product-list_more').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		dots: true,
		speed: 2000,
		arrows: true,
		autoplay: true,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			},
		]
	});


	$('#case-study-logo').slick({
		slidesToShow: 5,
		slidesToScroll: 5,
		dots: false,
		speed: 2000,
		arrows: true,
		autoplay: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				}
			},
		]
	});

	$('.navbar-toggler').click(function () {
		$('.overlay_div').addClass('active');
	});

	$('.close_btn').click(function () {
		$('.overlay_div').removeClass('active');
		$('.navbar-collapse').removeClass('show');
	});

	$('#datepicker').datepicker({
		uiLibrary: 'bootstrap4'
	});

	$('#time-picker li').on('click', function () {
		var getValue = $(this).text();
		$('.dropdown-select').text(getValue);
	});

	// if($(window).width() < 1025){
	// $('.filter-title').click(function(){
	//   if($(this).hasClass('myclass')) {
	//   	$(this).removeClass('myclass');
	//   	$(this).siblings('.mobile-display').slideUp(300);
	//   }
	//   else{
	//   	$('.filter-title').removeClass('myclass');
	//   	$(this).addClass('myclass');
	//   	$('.mobile-display').slideUp(300);
	//   	$(this).siblings('.mobile-display').slideDown(300);
	//   }
	// });
	// }

	// $('.filter-title').click(function(){
	// 	;
	//   if ( $(this).addClass('myclass')){


	// 	  $(this).siblings('.mobile-display').slideUp(300);
	//   }
	//   else{
	// 	  $('.mobile-display').slideUp(300);
	// 	  $(this).siblings('.mobile-display').slideDown(300);
	//   }
	// });


	$('.order').click(function () {
		if ($(this).prop("checked") == true) {
			$(this).parent().parent().find('button').removeAttr('disabled');
		}
		else {
			$(this).parent().parent().find('button').attr('disabled', 'disabled');
		}
		// $('#view-detail').prop("disabled", !$("#order").prop("checked")); 
	})

	var slider = tns({
		arrowKeys: true,
		container: ".js-sliderImageViewer",
		controls: false,
		loop: false,
		mouseDrag: true,
		navContainer: ".js-imageViewerNav",
	});

	$('.add').click(function () {
		if ($(this).prev().val()) {
			$(this).prev().val(+$(this).prev().val() + 1);
		}
	});
	$('.sub').click(function () {
		if ($(this).next().val() > 1) {
			if ($(this).next().val() > 1) $(this).next().val(+$(this).next().val() - 1);
		}
	});

	$('.mycolor').on('change', function () {
		var colorvalue = $(this).val();
		var tabid = $(this).parent().parent().parent().attr('id');
		$('#' + tabid + ' .my_text_preview h4').css('color', colorvalue);
	});
	$('.my_text').on('change', function () {
		var entertext = $(this).val();
		var tabid = $(this).parent().parent().parent().attr('id');
		$('#' + tabid + ' .my_text_preview h4').html(entertext);
	});
	// $('.my_font').on('change', function () {
	// 	
	// 	var selected_f = $(this).children('option:selected').val();
	// 	var selected_t = $(this).children('option:selected').text();
	// 	var tabid = $(this).parent().parent().parent().attr('id');
	// 	var f_f = $('#menu1 #text_preview, #menu3 #text_preview_2').append('<link href="https://fonts.googleapis.com/css?family=' + selected_f + '" rel="stylesheet">')
	// 	$('#' + tabid + ' .my_text_preview h4').css('font-family', "'" + selected_t + "'");
	// 	// console.log(selected_t);
	// });

	$('.more-filter .btn').click(function () {
		$(this).toggleClass('active');
		if ($('.collapse').hasClass('show')) {
			$('.more-filter .btn').html('More');
		} else {
			$(this).html('Less');
		}
	});




});


// $(window).on('load', function () {
// 	$('#myModal').modal('show');
// });

// $(window).on('load', function () {
// 	$('.myModal_new').modal('show');
// });

$(document).ready(function() {
	$('#myimage').elevateZoom();
  });


//   $(document).ready(function() {
// 	$("#filter_link_on_off").click(function(){
// 		$(this).toggleClass('active');
// 		$(".newside-bar-div").toggle();
// 		 return false;
// 	  });
//   });
//   $(document).ready(function() {
// 	$('.newside-bar-div .filter').click(function(){
// 		$(this).toggleClass('active');
// 		if($(window).width() < 600){
// 			$('.filter-title').click(function(){
// 			  if($(this).hasClass('myclass')) {
// 				  $(this).removeClass('myclass');
// 			  }
// 			  else{
// 				  $('.filter-title').removeClass('myclass');
// 				  $(this).addClass('myclass');
// 			  }
// 			});
// 			}
// 		return false;
// 	});
//   });

  