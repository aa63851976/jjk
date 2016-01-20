$(function(){
	var percent=0;          //百分比进度，显示在滚动条后面
	var element="||";      //滚动条单元竖线
	var elements="||";    //滚动条当前竖线
	var sources = ['banner5.jpg'];
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
		$('.cc-d a').on('click', sw);
		function sw(){
			if(!isScroll){
				var index = $(this).index();
				if(index !== curr){
					isScroll = true;
					$('.cc-d a').eq(curr).removeClass('curren');
					$(this).addClass('curren');
					wrap.stop().delay(200).animate({top: -index*H}, 250);
					swAnimate(index);
					curr = index;
				}
			}
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
		$(".he-icc").hover(function() {
				$(".he-icc").removeClass("he-icc-action");
				$(".he-05-icon >ul >li").removeClass("he-hover-bgn");
				$(this).addClass("he-icc-action");
				$(this).parent().addClass("he-hover-bgn");
		})
	})
})




