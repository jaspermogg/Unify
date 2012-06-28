function getRssFeeds(){
	
	if(localStorage.getItem("RSS") != null && localStorage.getItem("RSS") != ""){
		oRss = JSON.parse(localStorage.getItem("RSS"))
		return oRss
	} else {
		return null
	}
	
}

function addRssFeed(Uri, title){
	
	if(getRssFeeds() == null){
		var oRss = []
	} else {
		var oRss = getRssFeeds()
	}
	
	var oNewRss = {
		"URI" : Uri,
		"title" : title,
		"filters" : ""
		}
	
	oRss.push(oNewRss)

	localStorage.setItem("RSS", JSON.stringify(oRss))

	indexFeeds()	
}

function remRssFeed(remUri){
	
	console.log('attempting to remove feed URL - ' + remUri + ' from localStorage')
	
	oRss = getRssFeeds()
	
	for(i=0; i < oRss.length; i++){
		
		if(oRss[i].URI == remUri){
			delete oRss[i]
			console.log('removing feed URI - ' + oRss[i].URI)
		} else {
			console.log('not removing feed URI - ' + oRss[i].URI)
		}
		
	}
	
	if(oRss.length == null || oRss.length == 0){
		localStorage.setItem("RSS", null)
	} else {
		localStorage,setItem("RSS", JSON.stringify(oRss))
	}
	
	indexFeeds()
}