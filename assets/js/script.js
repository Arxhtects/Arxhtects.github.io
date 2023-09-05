$(document).ready(function() {
    console.log("updated 6");
    
    $.getJSON( "template/projects.json", function( data ) {
        var items = [];
        $.each( data.project, function( key, val ) {
          items.push( "<li id='" + key + "'>" + val + "</li>" );
        });
       
        $( "<ul/>", {
          "class": "my-new-list",
          html: items.join( "" )
        }).appendTo( "body" );
      });
});