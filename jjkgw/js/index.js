$(function(){
	var percent=0;          //百分比进度，显示在滚动条后面
	var element="||";      //滚动条单元竖线
	var elements="||";    //滚动条当前竖线
	var sources = ['banner.png'];
	var len = sources.length;
	var loaded = 0;

	function loadImg(cb){
		var newImg, scalc;
		for(var i=0; i<len; i++){
			(function(index){
				newImg = new Image();
				newImg.onload = function(){
					loaded++;
					scalc = Math.floor(loaded/len*100) + '%';
					document.loading.bar.value = scalc;
	    			document.loading.percentage.value= scalc;

					if(loaded == len){
						cb();
						$('#dow').hide();
					}
				}
				newImg.src = 'images/'+sources[index];
			})(i);
		}
	}
	loadImg(function(){
		var html = $('#text').val();
		$('#wrap').empty().html(html);
		var H = $(window).innerHeight(), wrap = $('#wrap');
		var curr = 0, len = $('.cc-d a').size();
		var start, isScroll;

		wrap.css('height', H*len);

		$(window).bind('resize', function(){
			H = $(window).innerHeight();
			wrap.css('height', H*len);
		});


		var scrollings = [], prevTime = new Date().getTime();
	  function getAverage(elements, number){
	      var sum = 0;
	      var lastElements = elements.slice(Math.max(elements.length - number, 1));

	      for(var i = 0; i < lastElements.length; i++){
	          sum = sum + lastElements[i];
	      }

	      return Math.ceil(sum/number);
	  }
	  function scrolling(d){
	    if(d == 'up'){
	      curr > 0 && sw.call($('.cc-d a').get(curr-1));
	    }else{
	      curr+1 < len && sw.call($('.cc-d a').get(curr+1));
	    }
	  }

	  var scrollFn = function(e){
	      var curTime = new Date().getTime();
	      var jqueryEvent = e;
	      e = e.originalEvent;
	      var value = e.wheelDelta || -e.deltaY || -e.detail;
	      var delta = Math.max(-1, Math.min(1, value));

	      var horizontalDetection = typeof e.wheelDeltaX !== 'undefined' || typeof e.deltaX !== 'undefined';
	      var isScrollingVertically = (Math.abs(e.wheelDeltaX) < Math.abs(e.wheelDelta)) || (Math.abs(e.deltaX ) < Math.abs(e.deltaY) || !horizontalDetection);

	      if(scrollings.length > 149){
	          scrollings.shift();
	      }

	      scrollings.push(Math.abs(value));

	      var timeDiff = curTime-prevTime;
	      prevTime = curTime;

	      if(timeDiff > 200){
	          scrollings = [];
	      }

	      var averageEnd = getAverage(scrollings, 10);
	      var averageMiddle = getAverage(scrollings, 70);
	      var isAccelerating = averageEnd >= averageMiddle;

	      !isScroll && isAccelerating && isScrollingVertically && scrolling(delta < 0?'down':'up');

	      jqueryEvent.preventDefault();
	      return false;
	    }
		$(document.body).bind('mousewheel DOMMouseScroll', scrollFn);
		$(document.body).keydown(function(event){
			event.preventDefault?event.preventDefault():(event.returnValue = true);
			if(event.keyCode == 38){
				curr > 0 && sw.call($('.cc-d a').get(curr-1));
			}else if (event.keyCode == 40){
				curr+1 < len && sw.call($('.cc-d a').get(curr+1));
			}
		});
		$(window).bind('touchstart', function(e){
		if(!H){H = $(window).innerHeight()}
		start = {
			y: e.originalEvent.touches[0].pageY,
			t: Date.now()
		};
	}).bind('touchmove', function(e){
		e.preventDefault();
		return false;

	}).bind('touchend', function(e){
		var y = start.y - e.originalEvent.changedTouches[0].pageY;
		if(Math.abs(y) > 40 && Date.now() - start.t < 300){
			if(y > 0){
				if(curr < len - 1){
					sw.call($('.cc-d a').get(curr+1));
				}
			}else{
				if(curr > 0){
					sw.call($('.cc-d a').get(curr-1));
				}
			}
		}
	}).bind('resize', function(){
		H = $(window).innerHeight();
	});
		$('.index_link').on('click', function(){
			if(!isScroll){
				isScroll = true;
				$('.cc-d a').eq(curr).removeClass('curren');
				$('.cc-d a').eq(curr+1).addClass('curren');
				wrap.stop().delay(200).animate({top: -(curr+1)*H}, 300);
				swAnimate(curr+1);
				curr += 1;
			}
		});
		$('.cc-d a').on('click', sw);
		function sw(){
			if(!isScroll){
				var index = $(this).index();
				if(index !== curr){
					isScroll = true;
					$('.cc-d a').eq(curr).removeClass('curren');
					$(this).addClass('curren');
					if(index==5){
						$(".cc-d").fadeOut();
						wrap.stop().delay(300).animate({top: -4*H-330}, 250);
					}else{
						wrap.stop().delay(300).animate({top: -index*H}, 250);
						$(".cc-d").fadeIn();
					}
					swAnimate(index);
					curr = index;
				}
				if(index==1){
					 num(6083,30,".seg-num");
					 num(236,1,".seg-nums");
				}
				if(index==4){
					 num(1671000,6000,".five-nm");
					 num(1195000,4000,".five-nm2");
					 num(53000,200,".five-nm3");
					 num(291000,1000,".five-nm4");
					 num(2589000,8000,".five-nm5");
					 num(656000,2000,".five-nm6");
					 num(2135000,7000,".five-nm7");
					 num(1843000,6500,".five-nm8");
					 num(3523000,12000,".five-nm9");
					 num(2793000,10000,".five-nm10");
					 num(2371000,10000,".five-nm11");
					 num(1664000,6000,".five-nm12");
				}
				$(".hj-r").fadeIn();
				if(typeof document.addEventListener != "undefined"){
					audio.pause();
				}
			}
		}
		function num(num,speed,name){
			var i=0;
			var timers=null;
			var va=num;
			clearInterval(timers);
			$(name).text("0");
			timers=setInterval(function(){
			i=i+speed;
			if(i>va){
				i=va;
				clearInterval(timers);
			}
			$(name).text(i);
			},5)
		}
		function swAnimate(i){
			$('.bh').eq(curr).removeClass('hover').addClass('ace');
			setTimeout(function(){
				$('.bh').eq(i).removeClass('ace').addClass('hover');
				isScroll = false;
			}, 600);
		}
		//导航
		$(".header").hover(function(){
			$(this).children(".a-whites").addClass("covers")
		},function(){
			$(this).children(".a-whites").removeClass("covers")
		})
		$(".hed-a a").hover(function(){
			$(this).children("span").stop().animate({
				opacity:"1",width:"100%"
			},800)
		},function(){
				$(this).children("span").stop().animate({
				opacity:"0",width:"0"
				},400)
		})
		//地图
		$(".dit-a").hover(function(){
			$(this).children(".dt-img").attr("src","images/zzh.png")
		},function(){
			$(this).children(".dt-img").attr("src","images/zz.png")
		})
		$(".o-bgf").click(function(){
			$(".sec-tan").removeClass("hvr")
			$(".sec-tan").addClass("hovers")
		})
		$(".sec-qian").click(function(){
			$(".sec-tan").removeClass("hvr")
			$(".sec-tan").addClass("hovers")
		})
		$(".ser-b").click(function(){
			$(".sec-tan").removeClass("hovers")
			$(".sec-tan").addClass("hvr")
		})
		// $(".sec-tan").hover(function(){
		// },function(){
		// 	$(".sec-tan").removeClass("hovers")
		// 	$(".sec-tan").addClass("hvr")
		// })
		//视频
		var audio = document.getElementById("J_video_player");
		$(".plays").click(function(){
			 $("#J_video_player").fadeIn();
			 $(".hj-r").fadeOut();
			 audio.play();
		})
		if(typeof document.addEventListener != "undefined"){
			audio.addEventListener('ended', function () {
		   $("#J_video_player").fadeOut();
		   $(".hj-r").fadeIn();
		}, false);
		}

		//TAB切换
		$(".third-a a").click(function(){
			$(".third-a a").removeClass("third-hover");
			$(this).addClass("third-hover");
			$(".third-di").hide();
			$(".third-di").eq($(this).index()).show();
		})
		$(".ty-lis a").click(function(){
			$(".ty-lis a").removeClass("ty-hover");
			$(this).addClass("ty-hover");
			 $(".ty-zg").stop().fadeTo("slow",0, function(){$(this).hide()});
             $(".ty-zg").eq($(this).index()).stop().show().fadeTo("slow",1);
		})
		var ti=null;
		var nu=0;
		auto();
		$(".ty-lis").hover(function(){
			clearInterval(ti);
		},function(){
			 auto();
		})
		function auto(){
			clearInterval(ti);
			ti=setInterval(function(){
				nu++;
				if(nu>3){
					nu=0
				}
				$(".ty-lis a").removeClass("ty-hover");
				$(".ty-lis a").eq(nu).addClass("ty-hover");
				 $(".ty-zg").stop().fadeTo("slow",0, function(){$(this).hide()});
             	$(".ty-zg").eq(nu).stop().show().fadeTo("slow",1);
			},3000)
		}
		// var iw=$(".third-tw").width();
		// var aLen=$(".third-t").length;
		// $(".third-t").width(iw);
		// $(".thi-wr").width(iw*aLen);
		$(".third-au a").hover(function(){
			//$(".third-t").removeClass("tg-gf");
			//$(".third-t").eq($(this).index()).addClass("tg-gf");
			var aE=$(this).index();
			$(".third-sa").removeClass("thir-sd");
			$(".third-sa").eq($(this).index()).addClass("thir-sd")
			//$(".thi-wr").animate({left:-iw*aE},300)
		})
		$(".four-btn").click(function(){
			$(".fout-tc").fadeIn();
		});
		$(".fout-tc").hover(function(){},function(){
			$(".fout-tc").fadeOut();
		})
		$(".rgz").click(function(){
			$(".er-w").fadeIn();
			$(".a-nmilt").addClass("a-fic")
		})
		$(".er-close").click(function(){
			$(this).parent().parent().fadeOut();
			$(".a-nmilt").removeClass("a-fic")
		})
	})
})
