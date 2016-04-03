function getUsers(){
    var object = $.ajax({
        url: '/users',
        dataType: 'json',
        async: false}).responseText;
    return JSON.parse(object);
}


function loadUsers(elem){
    var users = getUsers();
    updateNavMenu(elem);
    renderUsers(users);
}

// render user table
function renderUsers(data){
    var trHTML = "";
    var pool_list = $('#pool_list');

    clear();

    trHTML += '<tr><td><b>User Name</b></td><td><b>Email</b></td></tr>';

    $.each(data, function(index, user) {
        trHTML += '<tr>' +
            '<td><a href="#" onclick="userDetails(\'' + user._id + '\')"> ' + user.name + '</a>'+ '</td>' +
            '<td>' + user.email + ' </td>';
        if(getCookie('user_group') === 'admin'){
            trHTML +=  '<td><a href="#" onclick="deleteUser(\'' + user._id + '\')">' +
                '<img src="images/trash.png"></a></td>';
        }

        trHTML += '</tr>';

    });
    if(getCookie('user_group') === 'admin')
        trHTML += '<tr><td><button onclick="addUser()">New user</button></td></tr>';
    pool_list.append(trHTML);
}

// function helper for users Search input
function findUsers(input){
    var users = getUsers();
    var preList = [];

    $.each(users,  function(index, user){
        if( user.name.includes(input) )
            preList.push(user);
    });
    renderUsers(preList);
}

function userDetails(id){
    var userGroups = [];
    var details = $('#details');
    $('#details_container').fadeIn('slow');
    details.html("");
    $.getJSON("/users/"+id, function(user){
        $('#details').html('<legend><b>User Details</b></legend>');
        $('#details').append($('<div></div>').html('<b>User Name: </b>' + user.name));
        $('#details').append($('<div></div>').html('<b>Groups: </b>'));
        $('#details').append($('<div></div>').addClass('user_groups'));

        if(getCookie('user_group') === 'admin'){
           renderGroupsSelector(id);
        }

        userGroups = user.groups;
        $.each(userGroups, function(index, group){
            var trHTML = group;

            if(getCookie('user_group') === 'admin'){
                trHTML +=  '<a href="#" onclick="deleteUserGroup(\'' + group + '\',\'' + user._id + '\', true)">x</a>';
            }

            $('.user_groups').append($('<label class="group_tag"></label>').html(trHTML));
        });
    });
}

function deleteUser(id){
    if( confirm('Delete user') ){
        $.post('/users/' + id + '?_method=delete', function (data) {
            console.log('Removed:' +data);
        });
    }
    loadUsers();
}

// modal for adding user
function addUser(){
    $('.modal-header').find('span').html("New User");
    $('.modal-body').load('addUser.html');
    $('.modal, .modal-backdrop').fadeIn('normal');
    $('.modal-footer').html('<button onclick="userModalSubmit()">OK</button>');
}

// function helper. checking if group already exist for user
function addUserGroup(select, id){

    var group = $(select).val();

    $.getJSON("/users/"+id, function(user){
        if(  !userIsInGroup(user, group)){
            console.log('user: ' + user.groups);
            console.log('group: '+ group);
            $.post('/users/addUserGroup/' + id + '/' + group, function (data) {
                userDetails(id);
            });
        } else {
            alert("User is already in this group");
        }
    });


}

// delete group from user
function deleteUserGroup(group, id, loadList){
    $.post('/users/removeUserGroup/' + id + '/' + group + '?_method=delete', function (data) {
        if(loadList)
            userDetails(id);
    });
}


// checking if group already exist for user
function userIsInGroup(user, group){

    var userIsInGroup = false;
    var userGroups = user.groups;

    var index = 0;
    while (!userIsInGroup && index < userGroups.length ){
        userIsInGroup = userGroups[index] === group;
        index++;
    }
    return userIsInGroup;
}

function userModalSubmit(){
    var $form = $('#user_form'),
        name = $form.find( "input[name='name']" ).val(),
        email = $form.find( "input[name='email']" ).val(),
        password = $form.find( "input[name='password']" ).val(),
        password_bis = $form.find( "input[name='password_bis']" ).val(),
        url = $form.attr( "action" );

    if(userExist(name, email)){
        alert(" User or password already exists");
    } else {

        if (password === password_bis) {
            // Send the data using post
            var posting = $.post(url, {name: name, email: email, password: password});
            posting.done(function (user) {
                console.log("new user:\n" + user._id);
                loadUsers();
            });
        }
        else {
            alert("Password does not match")
        }
    }

    $form.trigger("reset");
    $('.modal, .modal-backdrop').fadeOut('fast');
}

function userExist(name,email){

    var users = getUsers();
    var user_exists = false;

    $.each(users, function( index, user){
        console.log(user.name + '--' + name);
        console.log(user.email + '--' + email);
        if(user.name === name || user.email === email) {
            user_exists = true;
        }
    });
    
    return user_exists;
}