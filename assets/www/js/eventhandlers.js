document.addEventListener('deviceready', function(){
	
	$.mobile.defaultPageTransition = 'none';
	$.mobile.defaultDialogTransition = 'none';
	
	console.log("deviceready fired")
	fbinit()
	
	document.addEventListener("backbutton", function(){});
	
    $(".page").on('pageshow', function(){
    	console.log("pageshow fired on " + this.id)
    	eval(this.id + 'init()')
    })
    
    $('#page1').trigger('pageshow')

    })


// adds an event listener for resume which decides which page we're on and starts the init script for that page.
    document.addEventListener('resume', function(){
        eval($.mobile.activePage.attr("id") + 'init()')
    })
    
$(document).ready(function(){
	$("a").attr("data-transition", "none");
})