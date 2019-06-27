$(function(){
    $(".img-container").each(function (i,e) {
        if((i+1)%2==0){
            $(this).css({'border-right':'1px solid #dadada'})
        }
    });
    $(".img-container").eq(0).css({'border-top':'1px solid #dadada'});
    $(".img-container").eq(1).css({'border-top':'1px solid #dadada'});
})