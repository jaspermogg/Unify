	var searchType = ""
	var page1hasinited = false	
	var page2hasinited = false
	var page3hasinited = false
	var isUserCloseAction = false
	var isFirstAdd = true

document.addEventListener('deviceready', function(){
		
	$('#page0').hide()	
		
	console.log("deviceready fired")
	
	$.event.special.tap.tapholdThreshold = 100;
	$.event.special.swipe.horizontalDistanceThreshold = 130;
	$.mobile.defaultPageTransition = 'none';
	$.mobile.defaultDialogTransition = 'none';
	
	$('.page').on('swipeleft', function(){
		if($(this).attr("data-swipeleft") != ""){
			toPageHash = '#' + $(this).attr("data-swipeleft")
			$.mobile.changePage(toPageHash)
		}
	})
	
	$('.page').on('swiperight', function(){
		if($(this).attr("data-swiperight") != ""){
			toPageHash = '#' + $(this).attr("data-swiperight")
			$.mobile.changePage(toPageHash)
		}
	})
	
	$('.page').on('pageshow', function () {
		console.log("pageshow fired on " + this.id)
    	eval(this.id + 'init()')
	 });

	fbinit()
	
	// document.addEventListener("backbutton", function(){console.log("pressed the back button")});

	$('#customFeedAddWrapper').hide()
	$('#searchBarContainer').hide()
	$('#customFeedAddConfirmationButtons').hide()
	$('#urlBarContainer').hide()
	$('#byFeedWrapper').hide()
	$('#initialInstructions').hide()
	$('#initialInstructions2').hide()
	$('#customInstructions').hide()


	$('#page0').trigger('pageshow')

})


// adds an event listener for resume which decides which page we're on and starts the init script for that page.
    document.addEventListener('resume', function(){
        eval($.mobile.activePage.attr("id") + 'init()')
    })
    
$(document).ready(function(){
	$("a").attr("data-transition", "none");
})

