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
		"filters" : "",
		"feedType" : "",
		"arrayIndex" : ""
		}
	
	oRss.push(oNewRss)

	localStorage.setItem("RSS", JSON.stringify(oRss))

	indexFeeds()	
}

function remRssFeed(arrayIndex){
	
	console.log('attempting to remove Rssfeed array number' + arrayIndex + 'from localStorage')
		
	oRss = getRssFeeds()
	
	console.log("Removing" + JSON.stringify(oRss[arrayIndex]))
		
	oRss.splice(arrayIndex, 1)	

	if(oRss.length == null || oRss.length == 0){
		localStorage.setItem("RSS", null)
	} else {
		localStorage.setItem("RSS", JSON.stringify(oRss))
	}
	
	indexFeeds()
}