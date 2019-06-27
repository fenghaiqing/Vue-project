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


//当点击跳转链接后，回到页面顶部位置
