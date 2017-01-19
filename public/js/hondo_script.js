(function($) {
	"use strict";

	// Particles
	if ($('.hon_particles').length>0) {
		$('.hon_particles').particleground( {
			dotColor: '#000',
			lineColor: '#4b536b',
			particleRadius: '7',
			lineWidth: '1'

		});
	};
	// Slider Text lettering

	$('.hon_slide_title_animation').lettering();
	$('.hon_slide_title_animation').each(function(){
		var i = 0;
		$(this).find('span').each(function(){
			$(this).css('transition-delay',i+'ms');
			i = i + 60;
		})
	})
	// Skin Settings
	$(".hon_skin_set span").on('click', function(){
		var href = $(this).attr('class');
		$('body').attr('class',$('body').attr('class').replace(/\hon_color.*?\b/g, ''));
		$("body").addClass(href);
	});
	// Open Close Skin Settings
	$('.hon_skins .ti').on('click', function(){
		$('.hon_skin_set').toggleClass('active');
	});

	/*CountTo*/
	$('.hon_timer').appear(function() {
		var e = $(this);
		e.countTo({
			from: 0,
			to: e.html(),
			speed: 1300,
			refreshInterval: 60
		})
	})
	$('.date_picker').datepicker();

	// Moove IMG
	$(".bg").moove_bg({
		strength: 35,
		scale: 1.1,
		animationSpeed: "360ms",
		contain: false,
		wrapContent: false
	});

	/*RSVP Form*/
	$("#hon_form, #booking_form").validate({
		submitHandler: function(form) {
			var type = $(form).attr('id');
			send_form(type);
			return false;
		}
	});

	function send_form(type){
		var arr = [];
		$("#"+type+" .form-control").each(function(){

			var element = $(this).attr('name');
			var value = $(this).val();
			$(this).css({border:"1px solid #c4c4c4"});
			if($(this).prop('required') && value =="") {
				$(this).css({border:"2px solid red"});
				$(this).focus();
				return false;
			}
			if (!value == '') {
				arr.push('&'+element+'='+value);
			}
		})


		var dataString = (arr.join (' '));
		$.ajax({
			method: "POST",
			url: "https://formspree.io/verothemes@gmail.com",
			data: dataString,
			dataType: "json",
			success: function() {
				$("#"+type).html("<div id='form_send_message'>Thank you for your request, we will contact you as soon as possible.</div>", 1500);
			}
		});


	}

	/*Gallery Lightbox*/
	$('.lightbox').magnificPopup({
		type: 'image',
		gallery:{
			enabled:true
		}
	});
	$('.video').magnificPopup({
		type: 'iframe',
		iframe: {
			markup: '<div class="mfp-iframe-scaler">'+
				'<div class="mfp-close"></div>'+
				'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
				'</div>', // HTML markup of popup, `mfp-close` will be replaced by the close button

			patterns: {
				youtube: {
					index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).

						id: 'v=', // String that splits URL in a two parts, second part should be %id%
					// Or null - full URL will be returned
					// Or a function that should return %id%, for example:
					// id: function(url) { return 'parsed id'; }

					src: 'http://www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe.
				},
				vimeo: {
					index: 'vimeo.com/',
					id: '/',
					src: 'http://player.vimeo.com/video/%id%?autoplay=1'
				},
				gmaps: {
					index: '//maps.google.',
					src: '%id%&output=embed'
				}

				// you may add here more sources

			},

			srcAction: 'iframe_src', // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
		}

	});


	/*Youtube Player*/

	if ($('#bgndVideo').length>0) {
		$('#bgndVideo').YTPlayer();
	};

	/*OWL Intro Slider*/
	$(".hon_slider_carousel").owlCarousel({
		navigation : true,
		responsive: true,
		responsiveRefreshRate : 500,
		responsiveBaseElement:window,
		slideSpeed : 500,
		addClassActive:true,
		paginationSpeed : 500,
		rewindSpeed : 500,
		items:1,
		autoPlay : false,
		singleItem:true,
		autoHeight : false,
		touchDrag:false,
		navigationText:['<i class="ti ti-angle-left"></i>','<i class="ti ti-angle-right"></i>']
	});

	/*OWL Team*/
	$(".hon_team_slider").owlCarousel({
		navigation : true,
		responsive: true,
		responsiveRefreshRate : 900,
		responsiveBaseElement:window,
		slideSpeed : 900,
		addClassActive:true,
		paginationSpeed : 900,
		rewindSpeed : 900,
		items:3,
		itemsTablet:[1000,2],
		itemsMobile : [569,1],
		itemsDesktop:5,
		autoPlay : true,
		touchDrag:false,
		navigationText:['<i class="ti ti-angle-left"></i>','<i class="ti ti-angle-right"></i>']
	});
	/*OWL Portfolio*/
	$(".hon_portfolio_slider").owlCarousel({
		navigation : true,
		responsive: true,
		responsiveRefreshRate : 900,
		responsiveBaseElement:window,
		slideSpeed : 900,
		addClassActive:true,
		paginationSpeed : 900,
		rewindSpeed : 900,
		items:3,
		itemsTablet:[1000,2],
		itemsMobile : [569,1],
		itemsDesktop:3,
		autoPlay : true,
		touchDrag:false,
		navigationText:['<i class="ti ti-angle-left"></i>','<i class="ti ti-angle-right"></i>']
	});


	/* OWL Team Single*/
	$(".hon_team_slider_single, .hon_slider_single, .hon_slider_txt ").owlCarousel({
		navigation : true,
		responsive: true,
		responsiveRefreshRate : 900,
		responsiveBaseElement:window,
		slideSpeed : 900,
		addClassActive:true,
		paginationSpeed : 900,
		rewindSpeed : 900,
		items:1,
		autoPlay : true,
		singleItem:true,
		autoHeight : true,
		touchDrag:false,
		navigationText:['<i class="ti ti-angle-left"></i>','<i class="ti ti-angle-right"></i>']
	});
	/* OWL Vision Single*/
	$(".hon_vision_slider").owlCarousel({
		navigation : true,
		responsive: true,
		responsiveRefreshRate : 900,
		responsiveBaseElement:window,
		slideSpeed : 900,
		addClassActive:true,
		paginationSpeed : 900,
		rewindSpeed : 900,
		transitionStyle : "goDown",
		items:1,
		autoPlay : true,
		singleItem:true,
		autoHeight : true,
		touchDrag:false,
		navigationText:['<i class="ti ti-angle-left"></i>','<i class="ti ti-angle-right"></i>']
	});
	/* OWL Team Single*/
	$(".hon_slider_img").owlCarousel({
		navigation : true,
		responsive: true,
		responsiveRefreshRate : 900,
		responsiveBaseElement:window,
		slideSpeed : 900,
		addClassActive:true,
		paginationSpeed : 900,
		rewindSpeed : 900,
		transitionStyle : "goDown",
		items:1,
		autoPlay : true,
		singleItem:true,
		autoHeight : true,
		touchDrag:false,
		navigationText:['<i class="ti ti-angle-left"></i>','<i class="ti ti-angle-right"></i>']
	});
	/*OWL Slide Gallery*/
	$(".hon_slide_gallery").owlCarousel({
		navigation : true,
		responsive: true,
		responsiveRefreshRate : 600,
		responsiveBaseElement:window,
		slideSpeed : 1500,
		addClassActive:true,
		paginationSpeed : 700,
		rewindSpeed : 3000,
		items:3,
		itemsTablet:[1000,2],
		itemsMobile : [569,1],
		itemsDesktop:3,
		autoPlay : true,
		touchDrag:false,
		navigationText:['<i class="ti ti-angle-left"></i>','<i class="ti ti-angle-right"></i>']
	});


	// Twitter Feed
	$('.tweets-feed').each(function(index) {
		jQuery(this).attr('id', 'tweets-' + index);
	}).each(function(index) {

		var TweetConfig = {
			"id": jQuery('#tweets-' + index).attr('data-widget-id'),
			"domId": '',
			"maxTweets": 2,
			"enableLinks": true,
			"showUser": true,
			"showTime": true,
			"dateFunction": '',
			"showRetweet": false,
			"customCallback": handleTweets
		};
		function handleTweets(tweets) {
			var x = tweets.length;
			var n = 0;
			var element = document.getElementById('tweets-' + index);
			var html = '<ul class="slides">';
			while (n < x) {
				html += '<li>' + tweets[n] + '</li>';
				n++;
			}
			html += '</ul>';
			element.innerHTML = html;
			return html;
		}
		twitterFetcher.fetch(TweetConfig);
	});

	/*Countdown*/
	$('.hon_countdown').each(function(){
		var year = $(this).attr('data-year');
		var month = $(this).attr('data-month');
		var day = $(this).attr('data-day');
		$(this).countdown({until: new Date(year,month-1,day)});

	});


	/* Section Background */
	$('.hon_image_bck').each(function(){
		var image = $(this).attr('data-image');
		var gradient = $(this).attr('data-gradient');
		var color = $(this).attr('data-color');
		var blend = $(this).attr('data-blend');
		var opacity = $(this).attr('data-opacity');
		var position = $(this).attr('data-position');
		var height = $(this).attr('data-height');
		if (image){
			$(this).css('background-image', 'url('+image+')');
		}
		if (gradient){
			$(this).css('background-image', gradient);
		}
		if (color){
			$(this).css('background-color', color);
		}
		if (blend){
			$(this).css('background-blend-mode', blend);
		}
		if (position){
			$(this).css('background-position', position);
		}
		if (opacity){
			$(this).css('opacity', opacity);
		}
		if (height){
			$(this).css('height', height);
		}

	});



	/* Over */
	$('.hon_over, .hon_head_bck, .hon_over_under').each(function(){
		var color = $(this).attr('data-color');
		var image = $(this).attr('data-image');
		var opacity = $(this).attr('data-opacity');
		var blend = $(this).attr('data-blend');
		if (color){
			$(this).css('background-color', color);
		}
		if (image){
			$(this).css('background-image', 'url('+image+')');
		}
		if (opacity){
			$(this).css('opacity', opacity);
		}
		if (blend){
			$(this).css('mix-blend-mode', blend);
		}
	});

	/* Map */
	$('.hon_map_over').on("click", function(e){
		$(this).parents('.hon_section').toggleClass('active_map');
	});

	/* Mobile Menu */
	$('.hon_top_menu_mobile_link').on("click", function(e){
		$(this).next('.hon_top_menu_cont').fadeToggle();
		$(this).parents('.hon_light_nav').toggleClass('active');
	});
	// Vertical Menu
	$('.hon_top_menu_vertical').on("click", function(e){
		$(this).toggleClass('white');
		$('.hon_left_mnu_content').toggleClass('active');
	});

	/*Scroll Effect*/
	$('.hon_go').on("click", function(e){
		var anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $(anchor.attr('href')).offset().top
		}, 1300);
		e.preventDefault();
	});

	/*Animation Block Delay*/

	$('div[data-animation=animation_blocks]').each(function(){
		var i = 0;
		$(this).find('.hon_icon_box, .skill-bar-content, .hon_anim_box').each(function(){
			$(this).css('transition-delay','0.'+i+'s');
			i++;
		})
	})

	/*Increase-Decrease*/
	$('.increase-qty').on("click", function(e){
		var qtya = $(this).parents('.add-to-cart').find('.qty').val();
		var qtyb = qtya * 1 + 1;
		$(this).parents('.add-to-cart').find('.qty').val(qtyb);
		e.preventDefault();
	});
	$('.decrease-qty').on("click", function(e){
		var qtya = $(this).parents('.add-to-cart').find('.qty').val();
		var qtyb = qtya * 1 - 1;
		if (qtyb < 1) {
			qtyb = 1;
		}
		$(this).parents('.add-to-cart').find('.qty').val(qtyb);
		e.preventDefault();
	});

	/* Shortcode Nav */
	var top_offset = $('header').height() - 1;

	$('#nav-sidebar').onePageNav({
		currentClass: 'current',
		changeHash: false,
		scrollSpeed: 700,
		scrollOffset: top_offset,
		scrollThreshold: 0.5,
		filter: '',
		easing: 'swing',
	});

	/* Bootstrap */
	$('[data-toggle="tooltip"]').tooltip();
	$('[data-toggle="popover"]').popover();

	/* Anchor Scroll */
	$(window).scroll(function(){
		if ($(window).scrollTop() > 100) {
			$(".hon_logo").addClass('active');
			$('body').addClass('hon_first_step');

		}
		else {
			$('body').removeClass('hon_first_step');
			$(".hon_logo").removeClass('active');
		}
		if ($(window).scrollTop() > 500) {
			$('body').addClass('hon_second_step');
		}
		else {
			$('body').removeClass('hon_second_step');
		}
		if ($(window).scrollTop() > 800) {
			$('body').addClass('hon_third_step');
		}
		else {
			$('body').removeClass('hon_third_step');
		}
	});

	/* Fixed for Parallax */
	$(".hon_fixed").css("background-attachment","fixed");


	/* Submenu */
	$('.hon_parent').on({
		mouseenter:function(){
			$(this).find('ul').stop().fadeIn(500);
		},mouseleave:function(){
			$(this).find('ul').stop().fadeOut(500);
		}
	});

	/* Mobile Menu */

	$('.hon_mobile_menu_content .hon_parent').on("click", function(e){
		$(this).find('ul').slideToggle(300);
	});
	$('.hon_mobile_menu').on("click", function(e){
		$(this).toggleClass('active');
		$('.hon_mobile_menu_hor').toggleClass('active');
	});
	$('.hon_header_search span').on("click", function(e){
		$(this).next('.hon_header_search_cont').fadeToggle();
	});

	/* Block Autheight */
	if( !device.tablet() && !device.mobile() ) {
		$('.hon_auto_height').each(function(){
			setEqualHeight($(this).find('div[class^="col"]'));
		});
	}
	if( device.tablet() && device.landscape() ) {
		$('.hon_auto_height').each(function(){
			setEqualHeight($(this).find('div[class^="col"]'));
		});
	}

	$(window).resize(function() {
		if( !device.tablet() && !device.mobile() ) {
			$('.hon_auto_height').each(function(){
				setEqualHeight($(this).find('div[class^="col"]'));
			});
		}
		if( device.tablet() && device.landscape() ) {
			$('.hon_auto_height').each(function(){
				setEqualHeight($(this).find('div[class^="col"]'));
			});
		}
	});

	/*Boxes AutoHeight*/
	function setEqualHeight(columns)
	{
		var tallestcolumn = 0;
		columns.each(
			function()
			{
				$(this).css('height','auto');
				var currentHeight = $(this).height();
				if(currentHeight > tallestcolumn)
					{
						tallestcolumn = currentHeight;
					}
			}
		);
		columns.height(tallestcolumn);
	}

	$(window).on('load',function(){

		// Page loader
		$("body").imagesLoaded(function(){
			$(".hon_page_loader div, .hon_page_loader_black div").fadeOut();
			$(".hon_page_loader, .hon_page_loader_black").delay(200).fadeOut("slow");
		});


		/*SkroolR*/
		if( !device.tablet() && !device.mobile() ) {
			var s = skrollr.init({
				forceHeight: false,
			});
			$(window).stellar({
				horizontalScrolling: false,
				responsive: true,
			});
		}

		/*Masonry*/

		var $grid = $('.grid').isotope({
			itemSelector: '.grid-item',
			percentPosition: true,
			masonry: {
				columnWidth: '.grid-item'
			}
		});
		$grid.imagesLoaded().progress( function() {
			$grid.isotope('layout');
		});
		$(window).resize(function(){
			$grid.isotope('layout');
		});



		$('.masonry').masonry({
			itemSelector: '.masonry-item',
		});

		$('.filter-button-group').on( 'click', 'a', function() {
			var filterValue = $(this).attr('data-filter');
			$grid.isotope({ filter: filterValue });
		});


	});


})(jQuery);



