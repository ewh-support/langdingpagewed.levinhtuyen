;(function () {
	
	'use strict';

	var initCarousel = function(){
		$('.owl-carousel').owlCarousel({
		      loop: true,
			  items: 1,
			  autoplay: true,
			  autoplayTimeout: 6000,
			  autoplaySpeed: 800,
			  lazyLoad:true,
			
			 
		});
	}

	// iPad and iPod detection	
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) || 
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};

	// Main Menu Superfish
	var mainMenu = function() {

		$('#fh5co-primary-menu').superfish({
			delay: 0,
			animation: {
				opacity: 'show'
			},
			speed: 'fast',
			cssArrows: true,
			disableHI: true
		});

	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};


	// Offcanvas and cloning of the main menu
	var offcanvas = function() {

		var $clone = $('#fh5co-menu-wrap').clone();
		$clone.attr({
			'id' : 'offcanvas-menu'
		});
		$clone.find('> ul').attr({
			'class' : '',
			'id' : ''
		});

		$('#fh5co-page').prepend($clone);

		// click the burger
		$('.js-fh5co-nav-toggle,#offcanvas-menu ul li').on('click', function () {

		    if ($('body').hasClass('fh5co-offcanvas')) {
		        $('body').removeClass('fh5co-offcanvas');
			} else {
		        $('body').addClass('fh5co-offcanvas');
			}
			// $('body').toggleClass('fh5co-offcanvas');

		});

		$('#offcanvas-menu').css('height', $(window).height());

		$(window).resize(function(){
			var w = $(window);


			$('#offcanvas-menu').css('height', w.height());

			if ( w.width() > 769 ) {
				if ( $('body').hasClass('fh5co-offcanvas') ) {
					$('body').removeClass('fh5co-offcanvas');
				}
			}

		});	

	}

	

	// Click outside of the Mobile Menu
	var mobileMenuOutsideClick = function() {
		$(document).click(function (e) {
		    var container = $("#offcanvas-menu, .js-fh5co-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	        if ($('body').hasClass('fh5co-offcanvas')) {
	            $('body').removeClass('fh5co-offcanvas');
			}
	    }
		});
	};


	// Animations

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							el.addClass('fadeInUp animated');
							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			} else if( direction === 'up' && !$(this.element).hasClass('animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							el.addClass('fadeInUp animated');
							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};
	
	var initImageUnveilEffect = function(){
		$(".img-lazy").unveil(200);
	}

	var initGoogleAnalytic = function(){
		// banner
		var mouseIsDragging = false;
		var mouseStartingPos = [];
		var touchIsDragging = false;
		var touchStartingPos = [];
		$(".banner")
			.mousedown(function (evt) {
				mouseIsDragging = false;
				mouseStartingPos = [evt.pageX, evt.pageY];
			})
			.mousemove(function (evt) {
				if (!(Math.abs(evt.pageX - mouseStartingPos[0]) < 5 && (Math.abs(evt.pageY - mouseStartingPos[1]) < 5))) {
					mouseIsDragging = true;
				}
			})
			.mouseup(function () {
				if (mouseIsDragging) {

				} else {
					// alert($(this).attr('name'));
					if ("ga" in window) {
						tracker = ga.getAll()[0];
						if (tracker)
							tracker.send('event', 'Banner', 'Click', $(this).attr('name'));
					}
				}
				mouseIsDragging = false;
				mouseStartingPos = [];
			})
		$(".banner").on(
			{
				'touchstart': function (evt) {
					touchIsDragging = false;
					touchStartingPos = [evt.pageX, evt.pageY];
				}
			},
			{
				'touchmove': function (evt) {
					if (!(Math.abs(evt.pageX - touchStartingPos[0]) < 5 && (Math.abs(evt.pageY - touchStartingPos[1]) < 5))) {
						touchIsDragging = true;
					}
				}
			}, {
				'touchend': function () {
					if (touchIsDragging) {

					} else {
						//alert($(this).attr('name'));
						if ("ga" in window) {
							tracker = ga.getAll()[0];
							if (tracker)
								tracker.send('event', 'Banner', 'Click', $(this).attr('name'));
						}
					}
					touchIsDragging = false;
					touchStartingPos = [];
				}
			}
		);
	}

	// Document on load.
	$(function(){
		initImageUnveilEffect();
		initCarousel();
		mainMenu();
		parallax();
		offcanvas();
		mobileMenuOutsideClick();
		contentWayPoint();
		initGoogleAnalytic();
	});


}());