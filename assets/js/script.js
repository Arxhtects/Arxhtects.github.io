$(document).ready(function() {
    console.log("updated 9");
    
    $.getJSON( "https://raw.githubusercontent.com/Arxhtects/Arxhtects.github.io/main/template/projects.json", function( data ) {
        var items = [];
        $.each( data.project, function( key, val ) {
          items.push("<div id='" + key + "' class='projects'>");
          items.push("<h3>" + val.projecttitle + "</h3>");
          items.push("<ul class='hashtag-list'>");
            $.each( data.project[key].hashtags, function( key, val ) {
              items.push( "<li id='" + key + "'>" + val + "</li>" );
            });
          items.push("</ul>");
          items.push("<figure style='background: " + val.color + "'><img src='https://raw.githubusercontent.com/Arxhtects/Arxhtects.github.io/main/template/project-banner/"+ val.image +"''></figure>");
          items.push("</div>");
        });
       
        $(items.join("")).appendTo("#template-target");
      });
});