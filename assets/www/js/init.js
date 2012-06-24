function page1init() {
	console.log("page 1 initialised")
	if(fbkisloggedin()){
		switchloginbutton("logout");
		fbafterinit(true);
	} else {
		fbafterinit(false);
	}
}

function page2init() {
	console.log("page 2 initialised")
	
	$('div#page4content li').remove()
	
	$('form#searchForm').on('submit', function(event){
	event.preventDefault()
	userSearchFeeds($('input#feedSearchBar').val())
	return false
	})
}

function page3init() {
	console.log("page 3 initialised")
}

function page4init() {
	console.log("page 4 initialised")
	
	$('#postPreviewContainerWrapper li, #postPreviewContainerWrapper a').off('click').on('click', function(event){
	event.preventDefault()
	openChildBrowser($(event.target).parents('li , h2').find('a').attr("data-uri"))
	})
}