// photos
let photo_data = [
    {
    photo: './images/pic1.jpg',
    title: 'Title of the first image',
    description: 'This is a nice image. Szöveg Mauris diam ante, posuere quis eros tempus'
    },

{
    photo: './images/pic2.jpg',
    title: 'Title of image2',
    description: 'This is a nice image. Szöveg Mauris diam ante, posuere quis eros tempus'
},

{
    photo: './images/pic3.jpg',
    title: 'Title of image3',
    description: 'This is a nice image. Szöveg Mauris diam ante, posuere quis ero'
},

{
    photo: './images/pic4.jpg',
    title: 'Title of image4',
    description: 'This is a nice image. Szöveg Mauris diam ante, posuere quis eros tempus, hendrerit accumsan lacus.'
},
{
    photo: './images/pic5.jpg',
    title: 'Title of image5',
    description: 'This is a nice image. Szöveg Mauris diam ante, posuere'
},
{
    photo: './images/pic6.jpg',
    title: 'Title of image6',
    description: 'This is a nice image. Szöveg Mauris diam ante, posuere quis eros tempus, hendrerit a'
},
{
    photo: './images/pic7.jpg',
    title: 'Title of image7',
    description: 'This is a nice image. Szöveg Mauris diam ante, '
}
];


//load photo to the image slider

let loadPhoto = (photoNumber) => {
    $('#photo-title').text(photo_data[photoNumber].title);
    $('#photo').attr('src', photo_data[photoNumber].photo);
    $('#photo-description').text(photo_data[photoNumber].description);
}
let currentPhoto = 0;
$('#nav_left').addClass('nav_last');
loadPhoto(currentPhoto);
$('#nav_right').click(() => {
    if (currentPhoto < photo_data.length-1) {
        currentPhoto++;
        if (currentPhoto===photo_data.length-1) {
            $('#nav_right').addClass('nav_last');}

        if (currentPhoto > 0) {
                $('#nav_left').removeClass('nav_last');
        }

    } 
    loadPhoto(currentPhoto);
});


$('#nav_left').click(() => {
    if (currentPhoto > 0) {
        currentPhoto--;
        if (currentPhoto < photo_data.length-1) {
                $('#nav_right').removeClass('nav_last');
        } 
        if (currentPhoto===0) {
            $('#nav_left').addClass('nav_last');}
        
    } 
    loadPhoto(currentPhoto);
});

//creating thumbnails

photo_data.forEach((item, index) => {
    $('#thumbnails').append(`<div class="thumbnail-pic-box" data-index="${index}"><img src="${item.photo}" class="thumbnail-pic" alt=""></div>`);
});

$('.thumbnail-pic-box').click(function(event) {
    let indexClicked = $(event.target).closest('div').attr('data-index');
    let numberIndex = parseInt(indexClicked);
    loadPhoto(numberIndex);
  });




