//Creates accordion menu
function accordion() { 
	
	//Calculates the initial width of the window and applies it to the accordion menu container
	var window_width = $(window).width(); 
	
	$('#accordion').width(window_width);
	
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
	    var padding_inside = $('.inside-content').outerHeight(true) - $('.inside-content').height();
	    
	    //Substracts the height of the menu to the height of the window to fit the content on the page
	    var content_height = window_height - menu_item - padding_inside;
	    
	    //Snaps the clicked item to the top of the window
	    $('html, body').animate({ scrollTop: position.top }, 'slow');
	    
	    //Sets the height of inside-content
	    $('.inside-content').height(content_height)
	    					.css({backgroundColor:"gray"});
	    						    
	    //Sets the height of the paragraph inside the accordion menu					
	    $('.inside-content p').height(content_height);
	    
	    //Sizes the image before openning
	    image_resize(window_width, content_height);
    	
    	//Sizes the content before openning
    	content_resize(window_width, '#accordion ul > li');
	    
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

//Listens to the window size for the content inside the accordion menu
function browser_resize() { 
	
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
    
    	if(height < 720){
    	
	    	content_height = 720;
    	
    	}
    	
    	//Resize width if above 1024
    	if(width < 1024) {
	    	
	    	width = 1024;
    	
    	}
    	
    	accordion_resize();
		    	
		image_resize(width, content_height);
		    	
		content_resize(width, '#accordion ul > li');
    	
    });
	
}

function accordion_resize() {

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
	
}

//Image resize when browser window resizes
function image_resize(width, height) {
	
	// Min width for the image
	var min_width = 350;
	    
	//Min height for the image
	var min_height = 450;
	
	if (width >= min_width && height >= min_height){
	
	    $(this).find('img').each(function() {
	     
	    	// Calculate current image width and height
	    	var current_width = $(this).find('img').width();
	    	var current_height = $(this).find('img').height();
		    
		    // Check if the current width is larger than the height
		    if(width >= height){
		    
		        ratio = current_width / width;   // get ratio for scaling image
		        $(this).css("width", width); // Set new width
		        $(this).css("height", height * ratio); // Scale height based on ratio
		        
		    }else{
		     
		        ratio = current_height / height; // get ratio for scaling image
		        $(this).css("height", height);   // Set new height
		        $(this).css("width", width * ratio);    // Scale width based on ratio
		        
		    }
		    
		});
	
	}
	
}

//Resizes the inside content
function content_resize(browser_width, div_content) {
	
	//Max browser width
	var max_width = 1920;
	
	//Min browser width
	var min_width = 1024;
	
	//Number of pixels the browser changed
	var pixels;
	
	//Total percentage image content should change
	var percentage;
	
	//How much the percentage change is
	var percentage_steps;
	
	//Each 19.17 px increase or decrease image container size by 1%
	var pixels_percentage = 19.17;
	
	if (browser_width >= min_width && browser_width <= max_width){
		
		pixels = max_width - browser_width;
		
		percentage_steps = pixels/pixels_percentage;
		
		percentage = 50 - percentage_steps;
		
		//Find the img and change its width
		$(div_content).find('img').css("width", (percentage + '%'));
		$(div_content).find('img').css("height", 'auto');
		$(div_content).find('img').css("background-color", '#393939');
		
		//Find p and change its width
		$(div_content).find('p').css("width", ((100 - percentage) + '%'));
		$(div_content).find('p').css("background-color", '#dadada');
		
		
	}
	
	
	
}



$(document).ready(function() {
	
	accordion();
	
	browser_resize();
				
});