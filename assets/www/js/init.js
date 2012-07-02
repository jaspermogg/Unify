function page0init(){
	console.log("page 0 initialised")
		
	localStorage.getItem("authData") != null ? $.mobile.changePage('#page1') : $('#page0').show();
			
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
	
	
}

function page1init() {
	console.log("page 1 initialised")
	
	console.log("attempting fetchByFeed")
		
	if(page1hasinited == false){
		if (localStorage.getItem("authData")){
			authData = JSON.parse(localStorage.getItem("authData"))
			var data = authData.attributes
			$('#initialInstructions p').html("<p>Nice to see you, " + data.HTTP_SHIB_PROG_TYPE.text + " " + data.HTTP_SHIB_EP_STAFFORSTUDENT.text + " " +
			data.HTTP_SHIB_PN_GIVENNAME.text + " " + data.HTTP_SHIB_PN_SN.text + "!</p> " + $('#initialInstructions p').html())
		}
	}

	if(!localStorage.getItem("feedIndex")){
		$('#initialInstructions').show()
		$('#byTimeWrapper').hide()
		$('#addFirstFeed').off('click').on('click', function(){$.mobile.changePage('#page2')})
	} else {
		$('#initialInstructions').hide()
		$('#feedSelectorViewByTime').hasClass('ui-btn-active') ? feedSelectorByTime() : feedSelectorByFeed()
		$('#feedSelectorViewByTime').off('click').on('click', feedSelectorByTime)
		$('#feedSelectorViewByFeed').off('click').on('click', feedSelectorByFeed)
	}

	if(page1hasinited == false){
	    $.getJSON("http://www.fullerbloom.com/NCLFeeds.json", function (data) {
	        handleNclFeeds(data)
	    });
	}

	
	$('#postsByTime').html(JSON.stringify(localStorage.getItem("feedIndex"))+'<br /><br />'+
	JSON.stringify(localStorage.getItem("FBK"))+'<br /><br />' +
	JSON.stringify(localStorage.getItem("RSS"))+'<br /><br />' +
	JSON.stringify(localStorage.getItem("TWI")))


	//position bar code [start]	
	if(!page1hasinited){
	$('.ui-navbar').width($('.ui-navbar').width()+1)
	var fullWidth = $('#page1 .indicatorBarWrapper').width()
	var smallWidth = (fullWidth) *0.25
	var bigWidth = fullWidth - smallWidth
	$('#page1 div.iB-middle').width(smallWidth)
	$('#page1 div.iB-left').width(bigWidth)
	}
	//position bar code [end]
	
	$('#page1accordioncontainer').on('click', 'a:not(.ui-collapsible-heading-toggle)', function(event){
	event.preventDefault()
	openChildBrowser($(event.target).parents('li').find('a').attr("data-uid"))
	})

	fetchByFeed($('#page1 div#feedIndex'))
	
	$('#feedIndex ul').off('click').on('click', 'li', function(){
		target = $(this).find('a').attr('data-link')
		openChildBrowser(target, false, false, false, false)
	})
	
	$('#feedIndex').off('taphold').on('taphold', 'div', function(){
				
				
		r = confirm("Do you want to remove this feed - " + $(this).attr('data-title') + "?")
		
		if(r){
			target = $(this).attr('data-arrayindex')
			targetType = $(this).attr('data-feedtype')
			
			switch(targetType)
			{
				case "FBK" :
				remFbkFeed(target)
				break;
				case "RSS" :
				remRssFeed(target)
				break;
				case "TWI" :
				remTwiFeed(target)
				break;		
			}
			$(this).remove()
		}
		

		
	})
	
	window.page1hasinited = true
}

function page2init() {

	console.log("page 2 initialised")

	$('#page2 div#officialFeedWrapper').off('click').on('click', 'a', function(){
		handleNclFeedClicks($(this).parents('li.officialLink').attr('data-uri'), $(this).parents('li.officialLink').attr('data-officialtitle'))
	})
	
	$('#page2 div#facebookGroups').off('click').on('click', 'a', function(){
		alert("This function is still a work in progress! You can preview the feed, but not add it yet.")
		fbkPreviewFetch($(this).parents('li').attr('data-fbid'), $(this).find('h3').text())
	})

	$('#feedSearchBar').is(':hidden') ? null : $('#feedSearchBar').focus()
	$('#customUrlInput').is(':hidden') ? null : $('#customUrlInput').focus()

	if(!localStorage.getItem("feedIndex")){
		$('#initialInstructions2').show()
		var thisHasBeenDone = false
	} else {
		thisHasBeenDone == false ? $('#customFeedAddButtons').css("margin-top", "10px") : null
		thisHasBeenDone = true
	}
	
	$('div#page4content li').remove()
	
	//position bar code [start]
	if(!page2hasinited){
	
	$('.ui-navbar').width($('.ui-navbar').width()+1)
	
	var fullWidth = $('#page2 .indicatorBarWrapper').width()
	var smallWidth = (fullWidth) *0.25
	var bigWidth = fullWidth - smallWidth
	$('#page2 div.iB-left').width(smallWidth)
	$('#page2 div.iB-middle').width(bigWidth)
	}
	//position bar code [end]

	$('form#searchForm input#startSearchButton').off('click').on('click', function(event){
		event.preventDefault()
		switch(searchType){
			case "twitter":
				userSearchFeeds('site:twitter.com ' + $('input#feedSearchBar').val())
				break;
			case "site":
				userSearchFeeds('site:' + $('input#feedSearchBar').val())
				break;
			case "url":
				byUrlPreview($('input#feedSearchBar').val())
				break;
			default:
				userSearchFeeds($('input#feedSearchBar').val())
		}
	})
		
	$('#feedSelectorViewOfficial').off('click').on('click', feedSelectorViewOfficial)	
	$('#feedSelectorViewCustom').off('click').on('click', feedSelectorViewCustom)	
	
	window.page2hasinited = true
}


function page4init() {
	$('#page4backButton').off('click').on('click', function(){$.mobile.changePage('#page2')})
	$('#page4backButton').removeClass('ui-btn-active')
	console.log("page 4 initialised")
	
	$('#page4addFeedButton').hasClass('ui-btn-active') ? $('#page4addFeedButton').removeClass('ui-btn-active') : null
	
	$('#page4addFeedButton').off('click').on('click', function(){

		addUri = $('#page4addFeedButton').attr('data-feedUri')
		addTitle = $('#page4addFeedButton').attr('data-feedTitle')
		addType = $('#page4addFeedButton').attr('data-feedType')
			
		switch(addType){
			case "FBK":
				addFbkFeed(addUri, addTitle)
			break;
			case "TWI":
				addTwiFeed(addUri, addTitle)
			break;
			case "RSS":
				addRssFeed(addUri, addTitle)
			break;
		}
	
		if(isFirstAdd){
		 alert("Congratulations - you've added your first feed! To remove one, just go to the 'By Feed' tab on the front page and hold down on a feed title.")
		 isFirstAdd = false
		}
	
		$.mobile.changePage('#page2')
		
		$('#initialInstructions2').hide()
	})
	
	
	$('#postPreviewContainerWrapper li, #postPreviewContainerWrapper a').off('click').on('click', function(event){
	event.preventDefault()
	openChildBrowser($(event.target).parents('li , h2').find('a').attr("data-uri"), true, false, true, false)
	})
}