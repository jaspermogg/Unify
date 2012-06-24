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
	$('#postPreviewContainerWrapper a').one('click', function(event){
	event.preventDefault();
	
	openChildBrowser($(event.target).attr("href"))
	
	})
}