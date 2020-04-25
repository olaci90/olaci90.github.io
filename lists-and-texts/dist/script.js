let names = ['John', 'Jack', 'Elrond', 'NÉÉÉÉV', 'Knut', 'Friedrich'];

names.forEach((name) => {
    $('ul').append("<li>" + name + "</li>");
    if (name=="Knut") {
        $('li').last().css('font-weight', 'bold');
    }
    
});



let additionalBlock = {
    title: "Added with javascript",
    text: "This block was added using JavaScript's jQuery library. How awesome!"
  };

  $('body').append("<h1>" + additionalBlock['title'] + "</h1>");
  $('body').append('<p>' + additionalBlock['text'] + '</p>');