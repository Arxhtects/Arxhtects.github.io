$(document).ready(function() {
    console.log("updated 12");
    
    $.getJSON( "https://raw.githubusercontent.com/Arxhtects/Arxhtects.github.io/main/template/projects.json", function( data ) {
        var items = [];
        $.each( data.project, function( key, val ) {
          items.push("<div id='project-id-" + key + "' class='projects'>");
          items.push("<h3>" + val.projecttitle + "</h3>");
          items.push("<ul class='hashtag-list'>");
            $.each( data.project[key].hashtags, function( key, val ) {
              items.push( "<li id='hashtag-id-" + key + "'>" + val + "</li>" );
            });
          items.push("</ul>");
          items.push("<figure style='background: " + val.color + "'><img src='https://raw.githubusercontent.com/Arxhtects/Arxhtects.github.io/main/template/project-banner/"+ val.image +"''></figure>");
          //items.push("<p>" + val.shortdescription + "</p>");
          items.push("</div>");
        });
       
        $(items.join("")).appendTo("#template-target");
      });
      
      
    var distance = $('#Projects').offset().top,
    $window = $(window);

    $window.scroll(function() {
        if ( $window.scrollTop() >= distance ) {
            console.log("woop woop");
        }
    });
});