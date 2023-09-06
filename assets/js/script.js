$(document).ready(function() {
    console.log("updated 18");
    
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
        
    var offset = $('#header').outerHeight();
    
    $('nav li').find('a[href^="#"]').click(function(event) { 
            event.preventDefault();

            $('nav li a').removeClass("active");
            $(this).addClass("active");
        
            var anchorId = $(this).attr("href");
            var target = $(anchorId).offset().top - offset + 5;
            
            $('html, body').animate({ 
                scrollTop: target	
            }, 500);

        });
        
        function setActiveListElements(event){
            var windowPos = $(window).scrollTop();

            $('nav li a[href^="#"]').each(function() { 
                var anchorId = $(this);
                var target = $(anchorId.attr("href"));
                
                if (target.length > 0) {
                    if (target.position().top - $('#header').outerHeight() <= windowPos) {
                        console.log(target.position().top);
                        console.log(target);
                        $('nav li a').removeClass("active");
                        anchorId.addClass("active");
                    }
                }
            });
        }
            
        $(window).scroll(function() {
            setActiveListElements();
        });
});