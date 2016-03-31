var COOKIE_EXPIRATION_TIME = 200;
var isUserinSession;

getCookie('user_name') === '' ? isUserinSession = false : isUserinSession = true;

function login(name, password){
    var users = getUsers();
    var userLoged = "";

    var userCount = 0;
    while( !isUserinSession && userCount < users.length){
        var user = users[userCount];
        
        if( user.name === name && user.password === password ){

            var groups = user.groups;
            userLoged = user.name;
            
            $.each(groups, function( index, group){
                if( group === 'admin' )
                    setCookie('user_group', 'admin' , COOKIE_EXPIRATION_TIME);
            });
            
            setCookie('user_name', userLoged , COOKIE_EXPIRATION_TIME);

            $('#login_form').hide();
            $('#logindetails').find('span').html( getCookie('user_name') );
            $('#logindetails').show();

            isUserinSession = true;
        }
        userCount++;
    }

    if(userLoged === ""){
        confirm("User doesn't exist or bad Password", function(){
            location.reload;
        });
    }

    msg_callback("Welcome " + user.name, function() {
        location.reload();
    });

}

function checkSession(){

    var username = getCookie("user_name");
    if (username != "") {
        setCookie("user_name", username, COOKIE_EXPIRATION_TIME);
        setCookie('user_group', getCookie('user_group') , COOKIE_EXPIRATION_TIME);
        console.log('reloading cookie');
    } else {
        if( isUserinSession == true ){
            
            msg_callback("Session Ends", function() {
                location.reload();
            });

        }
        isUserinSession = false;
    }
}

function setCookie(cname, cvalue, exseconds) {
    var d = new Date();
    d.setTime(d.getTime() + (exseconds*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function checkCookie() {
    var username=getCookie("user_name");
    if (username!="") {
        return true;
    }else{
        username = prompt("Please enter your name:", "");
        if (username != "" && username != null) {
            setCookie("user_name", username, COOKIE_EXPIRATION_TIME);
            $('#logindetails').find('span').html(username);
            return true;
        }else{
            return false;
        }
    }
}

function logOut(){
    eraseCookie('user_name');
    eraseCookie('user_group');
}

function eraseCookie(name) {
    setCookie(name, "", -1);
}
