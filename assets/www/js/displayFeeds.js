function fetchByFeed(targetContainer){

	console.log("fetching by feed")
	
	console.log("fetching Facebook object")
	oFbk = getFbkFeeds()
	console.log("fetching Twitter object")
	oTwi = getTwiFeeds()
	console.log("fetching RSS object")
	oRss = getRssFeeds()
	
	var oAll = []

	
	if(oFbk){
		for(i=0; i<oFbk.length; i++){
			oFbk[i].arrayIndex = i
			oFbk[i].feedType = "FBK"
		}
	}
	
	if(oRss){	
		for(i=0; i<oRss.length; i++){
			oRss[i].arrayIndex = i
			oRss[i].feedType = "RSS"
		}
	}
	
	if(oTwi){	
		for(i=0; i<oTwi.length; i++){
			oTwi[i].arrayIndex = i
			oTwi[i].feedType = "TWI"
		}
	}
	
	
	oFbk ? oAll = oAll.concat(oFbk) : null
	
	oTwi ? oAll = oAll.concat(oTwi) : null
	
	oRss ? oAll = oAll.concat(oRss) : null
		
	oAll.sort(sort_by('title', false))
	
	populateByFeed(oAll, targetContainer)
	
	console.log("checking Facebook object for null")
	if(oFbk){
		console.log("Facebook object not null")
		for(i=0;i<oFbk.length;i++){
			console.log("attempting to fetchFacebookFeed on oFbk[" + i + "]")
			fbkFetchData = fetchFacebookFeed(URI, displayFbkByFeed)
		}
	}
	
	console.log("checking Twitter object for null")
	if(oTwi){
		console.log("Twitter object not null")
		for(i=0;i<oTwi.length;i++){
			console.log("attempting to fetchRssTwiFeed on oTwi[" + i + "]")
			twiFetchData = fetchRssTwiFeed(oTwi[i].URI, 5, displayTwiRssByFeed)
			console.log(twiFetchData)
		}
	}
	
	console.log("checking RSS object for null")
	if(oRss){
		console.log("RSS object not null")
		for(i=0;i<oRss.length;i++){
			console.log("attempting to fetchRssTwiFeed on oRss[" + i + "]")
			rssFetchData = fetchRssTwiFeed(oRss[i].URI, 5, displayTwiRssByFeed)
			console.log(rssFetchData)
		}
	}
}

function populateByFeed(oAll, container){
	
	var liHtml = ""
	var divContentHtml = ""
	
	
	for(i=0;i<oAll.length;i++){
	
		divHtml = '<div data-role="collapsible" data-arrayindex="'+oAll[i].arrayIndex+'" data-title="'+oAll[i].title+'" data-feedtype="'+oAll[i].feedType+'" data-uri="'+ oAll[i].URI +'"><h3>' + oAll[i].title +'</h3><ul data-role="listview" data-uri="'+ oAll[i].URI +'"></ul></div>'
		divContentHtml = divContentHtml + divHtml
	}
	
	$(container).html(divContentHtml)
	$(container).trigger('create')
		
}

function displayTwiRssByFeed(feedObject, currentUri){
	var targetUl = $('ul[data-uri="'+ currentUri +'"]')

	
	var feedContentHtml = ""
	var contentHtml = ""
	

	
	for (i=0 ; i<feedObject.length ; i++) {
		title = feedObject[i].title
		link = feedObject[i].link
		date = feedObject[i].publishedDate
		snippet = feedObject[i].contentSnippet
		
		contentHtml = '<li><a class="itemLink" data-link="' + link + '">'+
						'<h2>' + title + '</h2>'+
						'<p>' + date + '</p>'+
						'<p>' + snippet + '</p>'+
						'</a></li>'
		feedContentHtml = feedContentHtml + contentHtml
	}
	
	targetUl.html(feedContentHtml)
	targetUl.listview('refresh')
	

	
}

function displayFbkByFeed(feedObject, currentUri){
	
alert("not yet implemented!!")
	
}

function fetchFacebookFeed(uri, cb){
	FB.api('/'+uri+'/feed',
		{fields : ''},
		function(response){
			if(response.error){
				console.log(JSON.stringify(response.error))
				r = ('Something went wrong while fetching Facebook feed items. Please check your connection. Would you like to retry?')
				r ? fetchFacebookFeed(uri, cb) : null;
			} else {
				cb(response.data, uri)
			}
		}
	)
}

var fetchRssTwiFeed = function(uri, num, cb){
	
	fetch = new google.feeds.Feed(uri)
	fetch.setNumEntries(num)
	console.log("fetching " + uri)
	fetch.load(function(response){
		console.log("response for " + uri + "is " + JSON.stringify(response))
		if(response.error){
			console.log(JSON.stringify(response.error))
			r = ('Something went wrong while fetching feed items. Please check your connection. Would you like to retry?')
			r ? fetchRssTwiFeed(uri, num, cb) : null;
		} else {
			console.log("returning " + JSON.stringify(response.feed) + " as fetch response")
			cb(response.feed.entries, uri)
			console.log("returned")
		}
	})
}