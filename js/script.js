// JavaScript Document
$(window).on('load',function(){
	var dataInt = {"data":[{'src':'24.jpg'},{'src':'25.jpg'},{'src':'26.jpg'},{'src':'27.jpg'},{'src':'28.jpg'},{'src':'29.jpg'},{'src':'30.jpg'},{'src':'31.jpg'},{'src':'32.jpg'},{'src':'33.jpg'},{'src':'34.jpg'},{'src':'35.jpg'},{'src':'36.jpg'},{'src':'37.jpg'},{'src':'38.jpg'},{'src':'39.jpg'},{'src':'40.jpg'},{'src':'41.jpg'},{'src':'42.jpg'},{'src':'43.jpg'},{'src':'44.jpg'},{'src':'45.jpg'},{'src':'46.jpg'},{'src':'47.jpg'},{'src':'48.jpg'},{'src':'49.jpg'},{'src':'50.jpg'},{'src':'51.jpg'},{'src':'52.jpg'},{'src':'53.jpg'}]};//加载的数据
	waterfall();
	$(window).on('scroll',function(){
		if(checkScrollSlide){
			$.each(dataInt.data,function(key,value){//key值索引，value为值{
				var  $oBox = $('<div>').addClass('box').appendTo($('#main'));//jquery可以连缀
				var oPic= $('<div>').addClass('pic').appendTo($oBox);
				 $('<img>').attr('src','images/'+$(value).attr('src')).appendTo($(oPic));//一个参数返回值，两个参数设置值 value是原生对象
			});
		waterfall();
		}
	})
})
function waterfall(){
	var $boxs = $('#main>div');//main下的一级div
	var w =$boxs.eq(0).outerWidth();//outerwidth获取的宽是包括padding和border..width是原始宽度，content的
	var cols = Math.floor($(window).width()/w);//窗口除以一列的宽度，算出多少列
	$('#main').width(w*cols).css('margin','0 auto');//不用写单位给main算好后固定宽度
	var hArr= [];
	$boxs.each(function(index,value){
		var h=$boxs.eq(index).outerHeight();//分别获取前六个的高度
		if(index<cols){
			hArr[index] = h;	
			
		}
		else{
			var minH =Math.min.apply(null,hArr);//找最小
			var minHIndex = $.inArray(minH,hArr);//.inarry(minH,hArr)可以返回minH在harr的索引
			$(value).css({//value是dom对象，得转
				'position':'absolute',
				'top':minH+'px',
				'left':w * minHIndex+'px'
			});
			hArr[minHIndex]+=$boxs.eq(index).outerHeight();
			
		}
		
	});
}
//加载更多图片
function checkScrollSlide(){
	var $lastBox = $('#main>div').last();
	var lastBoxDis = $lastBox.offset().top+Math.floor($lastBox.outerHeight()/2);//最后一个元素高度的一半+这个元素到父元素顶的高度
	var scrollTop = $(window).scrollTop();//浏览器滚动的距离
	var documentH = $(window).height();//浏览器可视区域的高度
	return (lastBoxDis<scrollTop+documentH)?ture:false;
}