document.addEventListener('deviceready', function(){
	
	console.log("deviceready fired")
	
	$.mobile.defaultPageTransition = 'none';
	$.mobile.defaultDialogTransition = 'none';
	
	$('.page').on('swipeleft', function(){
		toPageHash = '#' + $(this).attr("data-swipeleft")
		$.mobile.changePage(toPageHash)
	})
	
	$('.page').on('swiperight', function(){
		toPageHash = '#' + $(this).attr("data-swiperight")
		$.mobile.changePage(toPageHash)
	})
	
	$('.page').on('pageshow', function () {
		console.log("pageshow fired on " + this.id)
    	eval(this.id + 'init()')
	 });

	fbinit()
	

	
	// document.addEventListener("backbutton", function(){});
    
	$('#page1').trigger('pageshow')



})


// adds an event listener for resume which decides which page we're on and starts the init script for that page.
    document.addEventListener('resume', function(){
        eval($.mobile.activePage.attr("id") + 'init()')
    })
    
$(document).ready(function(){
	$("a").attr("data-transition", "none");
})

