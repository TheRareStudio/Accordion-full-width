//Creates accordion menu
function accordion() { 
	
	//Calculates the initial width of the window and applies it to the accordion menu container
	var window_width = $(window).width(); 
	$('#accordion').width(window_width)
	
	//Hides the content that will be shown when clicked on the accordion menu
	$('#accordion ul > li .inside-content')
    .click(function(e){
      e.stopPropagation();
    })
    .hide();
    
    //Shows content on click (accordion menu)
    $('#accordion ul > li').click(function(){
    	
    	//Determines the position to snap to top
	    var snap_top = $(this);
	    var position = snap_top.position();
	    
	    //Determines the height of the window
	    var window_height = $(window).height();
	    
	    //Determines the total height of the menu including padding and margin
	    var menu_item = $('#accordion ul > li').outerHeight(true);
	    
	    //Calculates the padding and margin of the inside content
	    var inside_height = $('.inside-content').outerHeight(true) - $('.inside-content').height();
	    
	    //Substracts the height of the menu to the height of the window to fit the content on the page
	    var content_height = window_height - menu_item - inside_height;
	    
	    //Snaps the clicked item to the top of the window
	    $('html, body').animate({ scrollTop: position.top }, 'slow');
	    
	    //Sets the height of inside-content
	    $('.inside-content').height(content_height)
	    					.css({backgroundColor:"gray"});
	    
	    //Sets the height of the paragraph inside the accordion menu					
	    $('.inside-content p').height(content_height);
	    
	    //Determines if the clicked item is visible
	    var selfClick = $(this).find('.inside-content').is(':visible');
	    
	    //Close item if another is open
	    if(!selfClick) {
	    
	      $(this)
	        .parent()
	        .find('.inside-content:visible')
	        .slideToggle();
	        
	    }
	    
	    //Accordion menu
	    $(this)
	      .toggleClass('show')
	      .find('.inside-content')
	      .stop(true, true)
	      .slideToggle();
	    
	    //Hide or show the rest of the menu when clicked
	    $('#accordion ul > li').not('.show').toggle();
	    
	    //If self click show item
	    if(selfClick) {
		    
		    $(this).show();
		    
		    //Determines the position to snap to top
		    var snap_top = $(this);
		    var position = snap_top.position();
		    
		    $('html, body').animate({ scrollTop: position.top }, 'slow');
		    
	    }
	    
    });
	
}

//Listens to when the window is resized for the content inside the accordion menu
function window_resize() { 
	
	//Listens to the event of window resize
    $(window).resize(function() {
    	
    	//Determines the width of the window
    	var width = $(window).width();
    	
    	//Determines the height of the window
    	var height = $(window).height();
    	
    	//Determines the total height of the menu including padding and margin
	    var menu_item = $('#accordion ul > li').outerHeight(true);
	    
	    //Calculates the padding and margin of the inside content
	    var inside_height = $('.inside-content').outerHeight(true) - $('.inside-content').height();
	    
	    //Substracts the height of the menu to the height of the window to fit the content on the page
	    var content_height = height - menu_item - inside_height;
    	
    	//Sets the width of the content
    	$('#accordion').width(width)
    	
    	//Sets the height of the visible content
    	$('#accordion ul > li').parent().find('.inside-content:visible').height(content_height)
    	
    	//Sets the height of the visible paragraph
    	$('#accordion ul > li').parent().find('.inside-content:visible p').height(content_height)
    	
    });
	
}



$(document).ready(function() {
	
	accordion();
	
	window_resize();
				
});