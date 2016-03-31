$(document).ready( function(){

    if( getCookie('user_name') !== ''){
        $('#login_form').hide();
        $('#logindetails').find('span').html( getCookie('user_name') );
        $('#logindetails').show();
    }
    
    $(document).on("click", function(event) {
        checkSession();
    });

    modalPosition();
    $(window).resize(function(){
        modalPosition();
    });
});


function clear(){
    var pool_list = $('#pool_list');
    var details = $('#details');
    
    pool_list.html("");
    details.html("");
    $('#modal').hide();
    $('#details_container').hide();
    $('#welcome').hide();
}

function updateNavMenu(elem){
    var children = $('#menu').find('a');

    $.each( children, function(index, e){
        $(e).removeClass('active');
    });

    $(elem).addClass('active');
}

function msg_callback(message, cb) {
    alert(message);
    cb();
}

function modalPosition() {
    var width = $('.modal').width();
    var pageWidth = $(window).width();
    var x = (pageWidth / 2) - (width / 2);
    $('.modal').css({left: x + "px"});
}

