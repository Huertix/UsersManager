function getGroups(){
    var object = $.ajax({
        url: '/groups',
        dataType: 'json',
        async: false}).responseText;
    return JSON.parse(object);
}


function loadGroups(elem){
    var trHTML = "";
    var pool_list = $('#pool_list');

    clear();
    updateNavMenu(elem);

    trHTML += '<tr><td><b>Group Name</b></td></tr>';

    $.getJSON("/groups", function(groups){
        $(groups).each( function(index, group) {
            trHTML += '<tr>'+
                '<td><a href="#" onclick="groupDetails(\'' + group._id + '\')"> ' + group.name + '</a>'+ '</td>';
            if(getCookie('user_group') === 'admin'){
                trHTML +=  '<td><a href="#" onclick="deleteGroup(\'' + group._id + '\')"><img src="images/trash.png"></a></td>';
            }

            trHTML += '</tr>';
        });
        if(getCookie('user_group') === 'admin')
            trHTML += '<tr><td><button onclick="addGroup()">New Group</button></td></tr>';

        pool_list.append(trHTML);
    });
}

function groupDetails(id){
    var details = $('#details');
    details.html("");
    $('#details_container').fadeIn('slow');
    $.getJSON("/groups/"+id, function(group){

        $('#details').html('<legend><b>Users in group</b></legend>');
        $('#details').append($('<div></div>').html('<b>Group Name: </b>' + group.name));
        $('#details').append($('<div></div>').html('<b>Users: </b>'));
        $('#details').append($('<div></div>').addClass('group_users'));

        var users = getUsers();
        for( var i = 0; i < users.length; i++){
            var userGroups = users[i].groups;
            for( var j = 0; j < userGroups.length; j++){
                console.log(userGroups[j] + '-----' + group.name );
                if( userGroups[j] === group.name )
                    $('.group_users').append($('<label class="group_tag"></label>').html(users[i].name));
            }
        }
    });
}


function deleteGroup(id){
    if( confirm('Delete Group') ){
        $.post('/groups/' + id + '?_method=delete', function (group) {
            
            var users = getUsers();
            $.each( users, function(index, user){
                if( userIsInGroup(user, group.name))
                    deleteUserGroup(group.name, user._id, false);
            });
        });
    }
    loadGroups();
}

function addGroup(){
    var rHtml = '<form id="group_form" method="post" action="/groups">' +
                    '<label>name</label><input type="text" name="name"><br></form>'
    $('.modal-header').find('span').html("New Group");
    $('.modal-body').html(rHtml);
    $('.modal, .modal-backdrop').fadeIn('normal');
    $('.modal-footer').html('<button onclick="groupModalSubmit()">OK</button>')
}

function renderGroupsSelector(id){
    var groups =  getGroups();
    $('#details').append($('<label>Add Group</label>'));
    $('#details').append($('<select onchange="addUserGroup(this,\'' + id + '\')"></select>')
         .append($('<option></option>').html('Select Group')));
            $.each(groups, function(index, group){
                $('#details').find('select').append($('<option></option>').html(group.name));
            });
}

function groupModalSubmit(){
    var $form = $('#group_form'),
        name = $form.find( "input[name='name']" ).val(),
        url = $form.attr( "action" );

    var groups = getGroups();
    var groupExists = false;

    $.each(groups, function(index, group){
        if(group.name === name){
            groupExists = true;
        }
    })

    if(!groupExists){
        // Send the data using post
        var posting = $.post( url, { name: name } );

        posting.done(function( data ) {
            console.log(data);
            loadGroups();
        });
    } else {
        alert("Group already exist");
    }




    $form.trigger("reset");
    $('.modal, .modal-backdrop').fadeOut('fast');
}