$(document).ready( function(){

    if( getCookie('user_name') !== ''){
        $('#login_form').hide();
        $('#logindetails').find('span').html( getCookie('user_name') );
        $('#logindetails').show();
    }
    
    $(document).on("click", function(event) {
        // refresh cookie
        checkSession();
    });

    // modal location
    modalPosition();
    $(window).resize(function(){
        modalPosition();
    });

    $("#login_form").submit( function( event ) {

        // Stop form from submitting normally
        event.preventDefault();

        // Get some values from elements on the page:
        var $form = $( this ),
            username = $form.find( "input[name='username']" ).val(),
            password = $form.find( "input[name='password']" ).val(),
            url = $form.attr( "action" );

        login(username, password);
        $form.trigger("reset");
    });

    // search users
    $('#search').find('input').keyup( function(){
        var input = $(this).val();

        if (input.length >= 3) {
            findUsers(input);
        } else {
            loadUsers();
        }
    });

    $('.close-modal').click(function(){
        $('.modal, .modal-backdrop').fadeOut('fast');
    });
});

// hide some dom elements
function clear(){
    var pool_list = $('#pool_list');
    var details = $('#details');
    
    pool_list.html("");
    details.html("");
    $('#modal').hide();
    $('#details_container').hide();
    $('#welcome').hide();
}

// update active item in menu
function updateNavMenu(elem){
    var children = $('#menu').find('a');

    $.each( children, function(index, e){
        $(e).removeClass('active');
    });

    $(elem).addClass('active');
}

// function helper for sync alert msgs.
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