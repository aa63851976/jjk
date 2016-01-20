$(function(){
		var aWidth=$(".team-ul li").width();
		var aLen=$(".team-ul li").length;
		$(".team-ul").width(aWidth*aLen);
		var nt=0;
		$(".abtn-left").click(function(){
			nt--;
			if(nt<0){
				nt=0;
			}
			$(".team-ul").stop().animate({
					left:-aWidth*nt
			},700)
			$(".team-ul li").removeClass("team-hover")
			$(".team-ul li").eq(nt).addClass("team-hover")
		})
		$(".abtn-right").click(function(){
			nt++;
			if(nt==aLen){
				nt=aLen-1;
			}
			$(".team-ul").stop().animate({
					left:-aWidth*nt
			},700)
			$(".team-ul li").removeClass("team-hover")
			$(".team-ul li").eq(nt).addClass("team-hover")
		})
		$(".team-conf").hover(function(){
			$(this).addClass("tema-k");
		},function(){
			$(this).removeClass("tema-k");
		})
		$(".te-zj-u li").click(function(){
			$(".team-wb").show();
			$(".tema-sh").eq($(this).index()).fadeIn();
			$(".video-players").eq($(this).index()).trigger('play')
		})
		$(".team-close").click(function(){
			$(".team-wb").hide();
			$(this).parent().fadeOut();
		})
		$(".tgg-si").hover(function(){
			$(".team-btn-w").fadeIn();
		},function(){
			$(".team-btn-w").fadeOut();
		})
})