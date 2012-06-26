function page0init(){
	console.log("page 0 initialised")
	
	
	localStorage.getItem("authData") != null ? $.mobile.changePage('#page1') : function(){}
	
		
	$("#institutionSearchField").autocomplete({
	    method: 'GET', // allows POST as well
	    icon: 'arrow-r', // option to specify icon
	    target: $('#institutionSuggestions'), // the listview to receive results
	    source: ["Newcastle University", "Hogwarts School of Witchcraft and Wizardry", "Police Academy 3"], // or URL to return JSON data
	    callback: function(e){
	    	var institution = $(e.currentTarget).text(); // access the selected item
	        $("#institutionSearchField").autocomplete('clear'); // clear the listview
	        auth(institution);
	    }, // optional callback function fires upon result selection
	    link: '', // link to be attached to each result
	    minLength: 0, // minimum length of search string
	    transition: ''// page transition, default is fade
	});
	
	$('#page0').find('*:not(#institutionSearchWrapper)').on('click', function(){
		$("#institutionSearchField").text("")
		$('#institutionSuggestions').empty()
		})
	
	if (localStorage.getItem("shibXml")){
		shibData = JSON.parse(localStorage.getItem("shibXml"))
		var data = shibData.attributes
		$('#welcomeText').text("Nice to see you, " + data.HTTP_SHIB_PROG_TYPE.text + " " + data.HTTP_SHIB_EP_STAFFORSTUDENT.text + " " +
		data.HTTP_SHIB_PN_GIVENNAME.text + " " + data.HTTP_SHIB_PN_SN.text + "!"
		)
	} 
}



function page1init() {
	console.log("page 1 initialised")

	//position bar code [start]	
	if(!page1hasinited){
	var fullWidth = $('#page1 .indicatorBarWrapper').width()
	var smallWidth = (fullWidth/3) *0.95
	var bigWidth = fullWidth - (2*smallWidth)
	$('#page1 div.iB-middle, #page1 div.iB-right').width(smallWidth)
	$('#page1 div.iB-left').width(bigWidth)
	}
	//position bar code [end]
	
	// if(fbkisloggedin()){
		// fbafterinit(true);
	// } else {
		// fbafterinit(false);
	// }
	
	$('#page1accordioncontainer').on('click', 'a:not(.ui-collapsible-heading-toggle)', function(event){
	event.preventDefault()
	openChildBrowser($(event.target).parents('li').find('a').attr("data-uid"))
	})

	window.page1hasinited = true
}

function page2init() {
	
	console.log("page 2 initialised")
	
	$('div#page4content li').remove()
	
	//position bar code [start]	
	if(!page2hasinited){
	var fullWidth = $('#page2 .indicatorBarWrapper').width()
	var smallWidth = (fullWidth/3) *0.9
	var bigWidth = fullWidth - (2*smallWidth)
	$('#page2 div.iB-left, #page2 div.iB-right').width(smallWidth)
	$('#page2 div.iB-middle').width(bigWidth)
	}
	//position bar code [end]

	$('form#searchForm').off('submit').on('submit', function(event){
		event.preventDefault()
		
		switch(searchType){
			case "twitter":
				userSearchFeeds('site:twitter.com ' + $('input#feedSearchBar').val())
				break;
			case "site":
				userSearchFeeds('site:' + $('input#feedSearchBar').val())
				break;
			default:
				userSearchFeeds($('input#feedSearchBar').val())
		}
	})
	
	$('#feedSelectorViewOfficial').off('click').on('click', feedSelectorViewOfficial)	
	$('#feedSelectorViewCustom').off('click').on('click', feedSelectorViewCustom)	
	$('#feedSelectorViewCurrent').off('click').on('click', feedSelectorViewCurrent)
	
	window.page2hasinited = true
}

function page3init() {
	
	
	
	//position bar code [start]
	if(!page3hasinited){
	var fullWidth = $('#page3 .indicatorBarWrapper').width()
	var smallWidth = (fullWidth/3) *0.95
	var bigWidth = fullWidth - (2*smallWidth)
	$('#page3 div.iB-left, #page3 div.iB-middle').width(smallWidth)
	$('#page3 div.iB-right').width(bigWidth)
	}
	//position bar code [end]
	
	console.log("page 3 initialised")

	window.page3hasinited = true
}

function page4init() {
	$('#page4backButton').off('click').on('click', function(){$.mobile.changePage('#page2')})
	$('#page4backButton').removeClass('ui-btn-active')
	console.log("page 4 initialised")
	
	
	
	$('#postPreviewContainerWrapper li, #postPreviewContainerWrapper a').off('click').on('click', function(event){
	event.preventDefault()
	openChildBrowser($(event.target).parents('li , h2').find('a').attr("data-uri"))
	})
}