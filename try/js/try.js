$('.block').hover(
		function(e) {
				$(this).stop().animate({opacity: 1}, 10);
				$(this).find(".bottom").stop().animate({bottom: 0}, 100);
		}, function(e) {
				$(this).stop().animate({opacity: 0.5}, 1000);
				$(this).find(".bottom").stop().animate({bottom: -40}, 100);
	});

var gt300 = false;
$(window).scroll(function() {
        if ($(window).scrollTop() > 300) {
            if (gt300) {
                return;
            }
            $("header").animate({
                top: -100
            },
            200);
            gt300 = !gt300;
        } else {
            if (!gt300) {
                return;
            }
            $("header").animate({
                top: 0
            },
            200);
            gt300 = !gt300;
        }
});
$("button").bind("click",function(){
	$(".modal").css('display',"none");
	$(".shade").css('z-index',-1);
	$(".shade").css('opacity',0);
});
$("#about").bind("click",function(){
	$(".modal").animate({top:200},300);
	$(".shade").css('z-index',999);
	$(".shade").css('opacity',0.6);
});
$("#intro").bind("click",function(){
	$("body,html").animate({scrollTop: $('.intro').offset().top},500);
});