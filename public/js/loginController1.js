var COOKIE_EXPIRATION_TIME = 5;
var isUserinSession = false;

function login(name, password){
    var users = getUsers();
    var userLoged = "";
    var userGroup = "";

    var userCount = 0;
    while( !isUserinSession && userCount < users.length){
        var user = users[userCount];
        console.log(user);
        if( user.name === name && user.password === password ){
            userLoged = user.name;
            userGroup = user.group;

            setCookie('user_name', userLoged , COOKIE_EXPIRATION_TIME);
            setCookie('user_group', userGroup , COOKIE_EXPIRATION_TIME);

            $('#login_form').hide();
            $('#logindetails').find('span').html( getCookie('user_name') );
            $('#logindetails').show();

            isUserinSession = true;

        }
        userCount++;
    }

    if(userLoged === ""){
        alert("User doesn't exist or bad Password", function(){
            location.reload;
        });
    }

}

function checkSession(){

    var username = getCookie("user_name");
    if (username != "") {
        setCookie("user_name", username, COOKIE_EXPIRATION_TIME);
        setCookie('user_group', getCookie('user_group') , COOKIE_EXPIRATION_TIME);
        console.log('reloading cookie');
    }else{
        if( isUserinSession == true ){

            location.reload();
            alert("Session Ends");
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


function eraseCookie(name) {
    setCookie(name, "", -1);
}
