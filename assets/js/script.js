$(document).ready(function() {
    console.log("updated 5");
    
    $.getJSON( "template/projects.json", function( data ) {
        var items = [];
        $.each( data, function( key, val ) {
          items.push( "<li id='" + key.project + "'>" + val.project + "</li>" );
        });
       
        $( "<ul/>", {
          "class": "my-new-list",
          html: items.join( "" )
        }).appendTo( "body" );
      });
});