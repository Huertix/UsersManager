// variables for pagination
var pageSize = 4;
var currentPage = 1;
var pagedResults = [];
var totalResults;

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

    $('.close-modal').click( function(){
        $('.modal, .modal-backdrop').fadeOut('fast');
    });


});


function updateList(){
    var end = (currentPage * pageSize);
    var start = (end - pageSize);
    var collection =  [];
    var list_type = $('#data_container').attr('data-name');

    if( list_type === 'users'){
        collection = getUsers();
        totalResults = collection.length;
        pagedResults = collection.slice(start, end);
        renderUsers(pagedResults);
    } else if( list_type === 'groups'){
        collection = getGroups();
        totalResults = collection.length;
        pagedResults = collection.slice(start, end);
        renderGroups(pagedResults);
    }


    if (currentPage <= 1) {
        $('.previous').prop("disabled", true);
    } else {
        $('.previous').prop("disabled", false);
    }

    if ((currentPage * pageSize) >= totalResults) {
        $('.next').prop("disabled", true);
    } else {
        $('.next').prop("disabled", false);
    }

    $('.next').click( function(){
        if ((currentPage * pageSize) <= totalResults) currentPage++;
        updateList();
    });

    $('.previous').click( function(){
        if (currentPage > 1) currentPage--;
        updateList();
    });
}


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

function resetPagination(){
    currentPage = 1;
    pagedResults = [];
}

// update active item in menu
function updateNavMenu(elem){
    var children = $('#menu').find('a');

    $.each( children, function(index, e){
        $(e).removeClass('active');
    });

    $(elem).addClass('active');

    resetPagination();
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