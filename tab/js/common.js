/**
 * common.js
 *
 *  version --- 1.0
 *  updated --- 2017/11/30
 */


/* !stack ------------------------------------------------------------------- */
jQuery(document).ready(function($) {
	pageScroll();
	rollover();
	common();
	var os = function (){
      var ua = navigator.userAgent,
      isWindowsPhone = /(?:Windows Phone)/.test(ua),
      isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
      isAndroid = /(?:Android)/.test(ua),
      isFireFox = /(?:Firefox)/.test(ua),
      isChrome = /(?:Chrome|CriOS)/.test(ua),
      isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
      isPhone = /(?:iPhone)/.test(ua) && !isTablet,
      isPc = !isPhone && !isAndroid && !isSymbian;
      return {
          isTablet: isTablet,
          isPhone: isPhone,
          isAndroid: isAndroid,
          isPc: isPc
      };	
  }();
  if (os.isAndroid || os.isPhone) {   
    // 手机
      $('head').append('<meta name="viewport" content="width=375px,user-scalable=no">');
  } else if (os.isTablet) {
    // 平板
      $('head').append('<meta name="viewport" content="width=1200,user-scalable=no">');
      $('body').addClass('isTablet');
  } else if (os.isPc) {
    // pc
      $('head').append('<meta name="viewport" content="width=device-width,user-scalable=no">');
  }
});

/* !isUA -------------------------------------------------------------------- */
var isUA = (function(){
	var ua = navigator.userAgent.toLowerCase();
	indexOfKey = function(key){ return (ua.indexOf(key) != -1)? true: false;}
	var o = {};
	o.ie      = function(){ return indexOfKey("msie"); }
	o.fx      = function(){ return indexOfKey("firefox"); }
	o.chrome  = function(){ return indexOfKey("chrome"); }
	o.opera   = function(){ return indexOfKey("opera"); }
	o.android = function(){ return indexOfKey("android"); }
	o.ipad    = function(){ return indexOfKey("ipad"); }
	o.ipod    = function(){ return indexOfKey("ipod"); }
	o.iphone  = function(){ return indexOfKey("iphone"); }
	return o;
})();

/* !rollover ---------------------------------------------------------------- */
var rollover = function(){
	var suffix = { normal : '_no.', over   : '_on.'}
	$('a.over, img.over, input.over').each(function(){
		var a = null;
		var img = null;

		var elem = $(this).get(0);
		if( elem.nodeName.toLowerCase() == 'a' ){
			a = $(this);
			img = $('img',this);
		}else if( elem.nodeName.toLowerCase() == 'img' || elem.nodeName.toLowerCase() == 'input' ){
			img = $(this);
		}

		var src_no = img.attr('src');
		var src_on = src_no.replace(suffix.normal, suffix.over);

		if( elem.nodeName.toLowerCase() == 'a' ){
			a.bind("mouseover focus",function(){ img.attr('src',src_on); })
			 .bind("mouseout blur",  function(){ img.attr('src',src_no); });
		}else if( elem.nodeName.toLowerCase() == 'img' ){
			img.bind("mouseover",function(){ img.attr('src',src_on); })
			   .bind("mouseout", function(){ img.attr('src',src_no); });
		}else if( elem.nodeName.toLowerCase() == 'input' ){
			img.bind("mouseover focus",function(){ img.attr('src',src_on); })
			   .bind("mouseout blur",  function(){ img.attr('src',src_no); });
		}

		var cacheimg = document.createElement('img');
		cacheimg.src = src_on;
	});
};
/* !pageScroll -------------------------------------------------------------- */
var pageScroll = function(){
	jQuery.easing.easeInOutCubic = function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	}; 
	
	$(window).on('load resize',function(){
		//var scrolltop = $('#headerIn').height(); //header fixed
		$('a.scroll, .scroll a').each(function(){
			$(this).unbind('click').bind("click keypress",function(e){
				e.preventDefault();
				var target  = $(this).attr('href');
				//var targetY = $(target).offset().top-scrolltop; //header fixed
				var targetY = $(target).offset().top;
				var parent  = ( isUA.opera() )? (document.compatMode == 'BackCompat') ? 'body': 'html' : 'html,body';
				$(parent).animate(
					{scrollTop: targetY },
					400
				);
				return false;
			});
		});
	});
	
	$('.pageTop a').click(function(){
		$('html,body').animate({scrollTop: 0}, 'slow','swing');
		return false;
	});
}



/* !common --------------------------------------------------- */
var common = (function(){
	
	//スマホグローバルナビ
	$('.btnMenu').on('click',function(){
		var target = $(this).data('target');
		if($(target).hasClass("on")){
			$(target).removeClass("on");
			$('.btnMenu').removeClass("active"); 
			$('.navBg').fadeOut();
		}else{
			$(target).addClass("on");
			$('.btnMenu').addClass("active"); 
			$('.navBg').fadeIn();
		}
    });   
	$('.gNavi li a,.navBg').click(function(){ 
		$('.gNavi').removeClass("on");
		$('.btnMenu').removeClass("active"); 
	});
	
	
	$('.imgBox').each(function(){
		$(this).css({backgroundImage: 'url('+$(this).data('img')+')'});
	});
	
	
});




/* !top --------------------------------------------------- */
$(document).ready(function(){
    $("#topBtn").hide(); //とりあえず隠す
    $(window).on("scroll", function() {
        if ($(this).scrollTop() > 100) { //100以上にスクロールされた／されている時は
            $("#topBtn").fadeIn("fast"); //ふわっと表示
        } else { //それ意外は
            $("#topBtn").fadeOut("fast"); //ふわっと非表示
        }
    });
    $('#topBtn').click(function () {
        $('body,html').animate({
        scrollTop: 0
        }, 400);
        return false;
    });
});
$(document).ready(function(){
    $("#topBtn").hide();
    $(window).on("scroll", function() {
        if ($(this).scrollTop() > 100) {
            $("#topBtn").fadeIn("fast");
        } else {
            $("#topBtn").fadeOut("fast");
        }
        scrollHeight = $(document).height(); //ドキュメントの高さ 
        scrollPosition = $(window).height() + $(window).scrollTop(); //現在地 
        footHeight = $("footer").innerHeight(); //footerの高さ（＝止めたい位置）
        if ( scrollHeight - scrollPosition  <= footHeight ) { //ドキュメントの高さと現在地の差がfooterの高さ以下になったら
            $("#topBtn").css({
                "position":"absolute", //pisitionをabsolute（親：wrapperからの絶対値）に変更
                "bottom": footHeight + 20 //下からfooterの高さ + 20px上げた位置に配置
            });
        } else { //それ以外の場合は
            $("#topBtn").css({
                "position":"fixed", //固定表示
                "bottom": "0px" //下から20px上げた位置に
            });
        }
    });
   
});