
// image source
var img_chk = "./icons/check.svg"
var img_chk_green = "./icons/check_green.svg"
var img_delete = "./icons/delete.svg"

$('#btnAdd').click(() => {
    $('ul').append('<li><span class="li_text">'+$('#txtToAdd').val()+'</span>'+
        '<div class="liButtons"><img class="del" src='+ img_delete + ' alt="Delete"><img class="chk" src='+ img_chk + ' alt="Completed"></div></li>');

    $('#txtToAdd').val('');
});

//Completed button
$('.todoList').on('click', '.chk', (event) => {
    $(event.target).attr('src', img_chk_green);
    $(event.target).closest('li').toggleClass('completed');
    console.log("KLIKK");
})

// delete button
$('.todoList').on('click', '.del', (event) => {
    $(event.target).closest('li').remove();
})

$('.todoList').on('keypress',function(e) {
    if(e.which == 13) {
        $('ul').append('<li><span class="li_text">'+$('#txtToAdd').val()+'</span>'+
        '<div class="liButtons"><img class="del" src='+ img_delete + ' alt="Delete"><img class="chk" src='+ img_chk + ' alt="Completed"></div></li>');
        $('#txtToAdd').val('');
    }
});