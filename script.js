// photos
let photo_data = [
    {
    photo: './images/pic1.jpg',
    title: 'Title of the first image',
    description: 'This is a nice image. Szöveg Mauris diam ante, posuere quis eros tempus, hendrerit accumsan lacus. Mauris tincidunt dapibus nisi, ut finibus ligula ultrices ut. Donec hendrerit ante nec lorem rhoncus porta. Suspendisse lacinia nunc in tellus accumsan dapibus. Pellentesque eu pulvinar nibh, accumsan tempus ante. Praesent at laoreet erat'
},

{
    photo: './images/pic2.jpg',
    title: 'Title of image2',
    description: 'This is a nice image. Szöveg Mauris diam ante, posuere quis eros tempus, hendrerit accumsan lacus.'
},

{
    photo: './images/pic3.jpg',
    title: 'Title of image3',
    description: 'This is a nice image. Szöveg Mauris diam ante, posuere quis eros tempus, hendrerit accumsan lacus.'
},

{
    photo: './images/pic4.jpg',
    title: 'Title of image4',
    description: 'This is a nice image. Szöveg Mauris diam ante, posuere quis eros tempus, hendrerit accumsan lacus.'
},
{
    photo: './images/pic5.jpg',
    title: 'Title of image5',
    description: 'This is a nice image. Szöveg Mauris diam ante, posuere quis eros tempus, hendrerit accumsan lacus.'
},
{
    photo: './images/pic6.jpg',
    title: 'Title of image6',
    description: 'This is a nice image. Szöveg Mauris diam ante, posuere quis eros tempus, hendrerit accumsan lacus.'
},
{
    photo: './images/pic7.jpg',
    title: 'Title of image7',
    description: 'This is a nice image. Szöveg Mauris diam ante, posuere quis eros tempus, hendrerit accumsan lacus.'
}
];

/*function c_photo_data(photo, title, description) { /Ez mlg nme kell
    this.photo = photo;
    this.title = title;
    this.description = description;
}*/

//load photo to the image slider

let loadPhoto = (photoNumber) => {
    $('#photo-title').text(photo_data[photoNumber].title);
    $('#photo').attr('src', photo_data[photoNumber].photo);
    $('#photo-description').text(photo_data[photoNumber].description);
   /* if (photoNumber===photo_data.length-1) {
        $('#nav_right').toggleClass('nav_last');
    } else {
        
    }*/ //utolsónál szürküljön ki a nyíl ez még nem jó
}
let currentPhoto = 0;
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