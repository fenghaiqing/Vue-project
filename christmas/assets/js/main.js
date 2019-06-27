var scroller=true;
$(document).ready(function () {
    $('body').sectionScroll();
    setInterval(function () {
        if(scroller){
            if($('.carousel-indicators li.active').next().length!=0){
                $('.carousel-indicators li.active').next().click();
            }else{
                $('.carousel-indicators li').first().click();
            }
        }
    },4000);

});

$('.carousel-inner').on('mouseover',function (e) {
    e.stopPropagation();
    scroller=false;
});
$('.carousel-inner').on('mouseleave',function (e) {
    e.stopPropagation();
    scroller=true;
});
$(window).scroll(function(){
    if ($(window).scrollTop()>100){
        $(".back-to-top").fadeIn(1500);
    }
    else
    {
        $(".back-to-top").fadeOut(1500);
    }
});
//当点击跳转链接后，回到页面顶部位置
$("body").on('click','.back-to-top',function(){
    //$('body,html').animate({scrollTop:0},1000);
    if ($('html').scrollTop()) {
        $('html').animate({ scrollTop: 0 }, 1000);
        return false;
    }
    $('body').animate({ scrollTop: 0 }, 1000);
    return false;
});

$('.back-to-top').on("mouseover",function (e) {
    e.stopPropagation();
   $(this).find('img').attr('src','images/up-1.png');
});
$('.back-to-top').on("mouseleave",function (e) {
    e.stopPropagation();
    $(this).find('img').attr('src','images/up-2.png');
});

function doSubmit(){
    $(".sub-slt").css({display:'block'});
    setTimeout(function () {
        $(".sub-slt").css({display:'none'});
    },3000);
}