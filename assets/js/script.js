$(document).ready(function() {
    var x;
    var y;

    console.log("updated 21");
    
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
            items.push("<section class='description'>");
            items.push("<h4>About the project</h4>");
            items.push(val.shortdescription);
            
            $.each( data.project[key].link[0], function( key, val ) {
                items.push( "<a href='" + val + "'>" + key + "</a>" );
            });

            items.push("</section>");
            items.push("</div>");
        });
       
        $(items.join("")).appendTo("#template-target");

    });
        
    var offset = $('#header').outerHeight();
    
    $('nav li').find('a[href^="#"]').on("click", function(event) { 
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
                    // console.log(target.position().top);
                    // console.log(target);
                    $('nav li a').removeClass("active");
                    anchorId.addClass("active");
                }
            }
        });
    }
            
    $(window).scroll(function() {
        setActiveListElements();
    });

    setTimeout(() => {
        $(".projects").on("click", function() {
            if(!$(this).hasClass("focus")) {
                var target = $("#Projects").offset().top - offset + 5;
                $("body").addClass("projects-hide");
                $(".projects").removeClass("focus");  
                $(this).addClass("focus");

                x = $(this).position().left;
                y = $(this).position().top;

                setTimeout(() => {  
                    $(this).css({
                        'position' : 'absolute',
                        'top' : y,
                        'left' : x
                    });
                    setTimeout(() => {  
                        $('html, body').animate({ 
                            scrollTop: target	
                        }, 500);
                        $("body").addClass("projects-change");
                        $(this).css({
                            'position' : 'absolute',
                            'top' : 0,
                            'left' : 0
                        });
                        setTimeout(() => { 
                            $("body").addClass("project-focus");
                            $(this).css({
                                'position' : 'relative',
                            });
                            setTimeout(() => { 
                                $(this).addClass("expand");
                            }, 1000);
                        }, 1000);
                    }, 300);
                }, 300);
            }
        });
    }, 700);

    $("#back").on("click", function() {
        $(".projects").removeClass("expand");
        setTimeout(() => { 
            $("body").removeClass("project-focus");
            $(".focus").css({
                'position' : 'absolute',
                'top' : 0,
                'left' : 0
            });
            setTimeout(() => { 
                $(".focus").css({
                    'position' : 'absolute',
                    'top' : y,
                    'left' : x
                });
                $("body").removeClass("projects-change");
                setTimeout(() => { 
                    $(".focus").css({
                        'position' : 'static',
                        'top' : "auto",
                        'left' : "auto"
                    });
                    $("body").removeClass("projects-hide");
                    $(".projects").removeClass("focus");  
                }, 800);
            }, 500);
        }, 300);
    });
});