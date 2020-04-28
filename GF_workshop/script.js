console.log("Hello script");

let printNumbersTill = (a) =>{
    for (let i = 0; i<a; i++) {
        console.log(i);
    }

}
var Name;
function getGreetingTo(Name) {
    console.log(Name)
}

$('#click').click(() => {
    console.log('Yeah, Click');
})

$('#change').click(() => {
    $('#click').text("KATTTT");
})

$('#color').one('click', () => {
    let clr = $('#txtColor').val();
    $('button').css("background-color", clr);
})

let noOfClicks = 0;
$('div h2').text(noOfClicks);
$("#increase").click( ()=> {
    noOfClicks+=1;
    $('div h2').text(noOfClicks);
})