$(function(){
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
		$('.new-text').bind({
				focus:function(){
					if (this.value == this.defaultValue){
						this.value="";
						}
				},
				blur:function(){
					if (this.value == ""){
						this.value = this.defaultValue;
					}
				}
		});
})