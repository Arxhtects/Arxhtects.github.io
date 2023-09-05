$(document).ready(function() {
    console.log("updated 1");
    
    $.getJSON( "template/projects.json", function( data ) {
        var items = ["projects"];
        $.each( data, function( key, val ) {
          items.push( "<li id='" + key + "'>" + val + "</li>" );
        });
       
        $( "<ul/>", {
          "class": "my-new-list",
          html: items.join( "" )
        }).appendTo( "body" );
      });
});