$(document).ready(function() {
    console.log("updated 2");
    
    $.getJSON( "template/projects.json", function( data ) {
        var items = [];
        $.each( data, function( key, val ) {
          items.push( "<li id='" + key.project_title + "'>" + val.project_title + "</li>" );
        });
       
        $( "<ul/>", {
          "class": "my-new-list",
          html: items.join( "" )
        }).appendTo( "body" );
      });
});