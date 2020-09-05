// photos
let photo_data = [
    {
    photo: './images/pic1.jpg',
    title: 'Title of the first',
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
    $('[data-index]').removeClass('thumbnail-pic-box_selected')
    $('#photo-title').text(photo_data[photoNumber].title);
    $('#photo').attr('src', photo_data[photoNumber].photo);
    $('#photo-description').text(photo_data[photoNumber].description);
    $(`.thumbnail-pic-box[data-index="${photoNumber}"]`).addClass('thumbnail-pic-box_selected');
    currentPhoto=photoNumber;
    if (currentPhoto===photo_data.length-1) {
            $('#nav_right').addClass('nav_last');
        }

    if (currentPhoto > 0) {
                $('#nav_left').removeClass('nav_last');
        }

    if (currentPhoto < photo_data.length-1) {
                $('#nav_right').removeClass('nav_last');
        } 
    if (currentPhoto===0) {
            $('#nav_left').addClass('nav_last');}
        
}


//Nav
let currentPhoto = 0;

/*$('#nav_left').addClass('nav_last');*/
loadPhoto(currentPhoto);
$('#nav_right').click(() => {
    if (currentPhoto < photo_data.length-1) {
        currentPhoto++;
    } 
    loadPhoto(currentPhoto);
});


$('#nav_left').click(() => {
    if (currentPhoto > 0) {
        currentPhoto--;  
    } 
    loadPhoto(currentPhoto);
});

//thumbnails

photo_data.forEach((item, index) => {
    $('#thumbnails').append(`<div class="thumbnail-pic-box" data-index="${index}"><div class="thumb-title" data-index="${index}">${item.title}
    <div class="mark"></div></div><div class="selected_mark"></div><img src="${item.photo}" class="thumbnail-pic" alt=""></div>`);
});

$('.thumbnail-pic-box').click(function(event) {
    let indexClicked = $(event.target).closest('div').attr('data-index');
    let numberIndex = parseInt(indexClicked);
    loadPhoto(numberIndex);
  });

//right arrow

  $('body').on('keydown',function(e) {
    if(e.which == 39) {
        if (currentPhoto < photo_data.length-1) {
            currentPhoto++;
        } 
        loadPhoto(currentPhoto);
    }
});


$('body').on('keydown',function(e) {
    if(e.which == 37) {
        if (currentPhoto > 0) {
            currentPhoto--;  
        } 
        loadPhoto(currentPhoto);
    }
});



