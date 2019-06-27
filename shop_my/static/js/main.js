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
    initMenue();
    initProduct();
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

function initMenue() {
    $.ajax({
        type: "POST",//请求方式
        url: "/shop_my/static/json/menu.json",//地址，就是json文件的请求路径
        dataType: "json",//数据类型可以为 text xml json  script  jsonp
        success: function(result){//返回的参数就是 action里面所有的有get和set方法的参数
            $("#menu-list").html('');
            var $li='';
            $.each(result,function (i,item) {
                $li+=' <li>';
                if(item.children && item.children.length>0){
                    $li+='<a href="#"  class="dropdown-toggle active" data-toggle="dropdown">'+item.name+'</a>';
                    $li+='<ul class="dropdown-menu cld"><table class="table">';
                    var td='';
                    $.each(item.children,function (j,obj) {
                         td+=' <td>'+obj.name+'</td>';
                        if((j+1)%3==0){
                            $li+='<tr>'+td+'</tr>';
                            td='';
                        }
                    })
                    $li+='</table></ul></li>';
                }else{
                    $li+='<a href="#">'+item.name+'</a></li>';
                }
            });
            $("#menu-list").html($li);
        }
    })
}

function initProduct() {
    $.ajax({
        type: "POST",//请求方式
        url: "/shop_my/static/json/list.json",//地址，就是json文件的请求路径
        dataType: "json",//数据类型可以为 text xml json  script  jsonp
        success: function(result){//返回的参数就是 action里面所有的有get和set方法的参数
            $("#item-ctn").html('');
            var $row='';
            var $col='';
            $.each(result,function (i,item) {
                $col+='<div class="col-lg-3"><a><img src="'+item.img+'"></a>' +
                    '<p>'+item.desc+'</p>' +
                    '<span>'+item.price+'</span></div>';
                if((i+1)%5==0 || (i+1) ==result.length){
                    $row+='<div class="row">'+$col+'</div>';
                    $col='';
                }
            });
            $("#item-ctn").html($row);
        }
    })
}
function login() {
    var phone =$('#phone').val();
    var code =$('#code').val();
    if(phone ==='10086' && code=='1234'){
        window.location.href='index.html'
    }else{
        alert('用户名密码不正确！');
    }
}

function register(){
    var phone =$('#phone').val();
    var code =$('#code').val();
    var user =$('#user').val();
    if(isNull(user)){
        alert("请输入用户名！");
        return
    }
    if(isNull(phone)){
        alert("请输入手机号！");
        return
    }else{
        checkMobile(phone)
    }
    if(isNull(code)){
        alert("请输入验证码！");
        return
    }
    alert('注册充')
    window.location.href='login.html';
}

function checkMobile(str) {
    var
        re = /^1\d{10}$/
    if (!re.test(str)) {
        alert("请输入11位手机号！");
        return
    }
}
function isNull(str){
    return str===undefined ||str === null || str ==='' || str.length===0
}