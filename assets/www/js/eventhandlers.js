document.addEventListener('deviceready', function(){
	console.log("deviceready fired")
	fbinit()
	
	// document.addEventListener("backbutton", null);
	
    $(".page").on('pageshow', function(){
    	console.log("pageshow fired on " + this.id)
    	eval(this.id + 'init()')
    })
    
    $('#page1').trigger('pageshow')

    })


// adds an event listener for resume which decides which page we're on and starts the init script for that page. For loop removes any 
    document.addEventListener('resume', function(){
        eval($.mobile.activePage.attr("id") + 'init()')
    })