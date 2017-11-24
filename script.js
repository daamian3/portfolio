$(window).on( "load", function() {
	// Po poprawnym załadowaniu strony wyłącza przyciemnienie
	$("#przyciemnienie").fadeOut('fast');
	// Po poprawnym załadowaniu strony wyłącza loading
	$("#loading").fadeOut('fast');
	$("scroll").css("z-index","9998");

	menuSticky();
	loading();

});

var down = false, menu = $(".menu");

function menu_slide(direction){
	if(direction == "up"){
		menu.fadeOut({ duration: 350, queue: false }).slideUp(350);
		return false;
	}
	else if(direction == "down"){
		menu.fadeIn({ duration: 350, queue: false }).css('display', 'none').slideDown(350);
		menu.css("display", "flex");
		return true;
	}
}

$("#open").on("click", function(){
	if(menu.css('display') == 'none'){
		menu_slide("down");
		$(this).addClass("exit");
	}
	else{
		$(this).removeClass("exit");
		menu_slide("up");
	}

});

$(".menu__button").on("click", function(){
  if($(document).width() < 1000)	$("#open").click();
});

function throttle(callback, limit) {
  var wait = false;
  return function () {
    if (!wait) {
      callback();
      wait = true;
      setTimeout(function () {
        wait = false;
      }, limit);
    }
  };
}

var allow = true;;

$(".menu__button a").on("click", function(){
  var link = $(this).attr("href");
	event.preventDefault();

	var height = 600 + ($(link).offset().top / 10);

  $('html, body').animate({
        scrollTop: $(link).offset().top
  }, height);
});

function menuSticky(){
	var NavY = $("header").scrollTop();

	$(window).on("scroll", function() {
		if($(document).width() > 1000) menu.css("display", "flex");
		if ($(window).scrollTop() > NavY) {
			$("header").addClass("sticky");
		}
		else{
		 	$("header").removeClass("sticky");
		}
	});

	$(window).on("resize", function() {
		if($(document).width() > 1000) menu.css("display", "flex");
		else if(menu.css('display') != 'none' && (window.innerHeight > window.innerWidth)) menu.css("display", "block");
		else if($(document).width() < 1000 && menu.css('display') != 'none') $("#open").click();
	});
}

function startTyping(id, percent) {

	var number = 0;
	var currentIndex = 0;

	interval = setInterval(function(){
		if (percent > currentIndex) {
			number++;
			$(id).html("( "+number+"% )");
			currentIndex++;
		}
		else{
			clearInterval(interval);
		}
	}, 20);
}

function loading(){
	var design = $("#design"),
	photography = $("#photography"),
	marketing = $("#marketing"),
	branding = $("#branding"),
	allow1 = false, allow2 = false, allow3 = false, allow4 = false;

	var item1 = design.offset().top;
	var item2 = photography.offset().top;
	var item3 = marketing.offset().top;
	var item4 = branding.offset().top;

	var ScrollZ = $(window).height();

	$(window).on("resize", function() {
			ScrollZ = $(window).height();
			item1 = design.offset().top;
			item2 = photography.offset().top;
			item3 = marketing.offset().top;
			item4 = branding.offset().top;
	});

	$(window).on("scroll", throttle(function(){
		var ScrollY = $(window).scrollTop();
		var now = ScrollZ + ScrollY;
		if(now > item1 && allow1 == false){
			design.val(0.8);
			startTyping("#design__percent", 80);
			allow1 = true;
		}
		if(now > item2 && allow2 == false){
			photography.val(0.65);
			startTyping("#photography__percent", 65);
			allow2 = true;
		}
		if(now > item3 && allow3 == false){
			marketing.val(0.5);
			startTyping("#marketing__percent", 50);
			allow3 = true;
		}
		if(now > item4 && allow4 == false){
			branding.val(0.3);
			startTyping("#branding__percent", 30);
			allow4 = true;
		}
	}, 100));
}
