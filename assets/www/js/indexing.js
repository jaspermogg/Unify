function getFeedIndex(){

	if(localStorage.getItem("feedIndex") != null && localStorage.getItem("feedIndex") != ""){
		oFeedIndex = JSON.parse(localStorage.getItem("feedIndex"))
		return oFeedIndex
	} else {
		return null
	}

}

function indexFeeds(){

	var oFeedIndex = []

	oFbk = getFbkFeeds()
	oTwi = getTwiFeeds()
	oRss = getRssFeeds()

	var oIndex = {
		"URI" : "",
		"Type" : ""
	}

	for(i=0; i<oFbk.length; i++){
		oIndex.Type = "FBK"
		oIndex.URI = oFbk[i].URI
		oFeedIndex.push(oIndex)
	}

	for(i=0; i<oTwi.length; i++){
		oIndex.Type = "TWI"
		oIndex.URI = oTwi[i].URI
		oFeedIndex.push(oIndex)
	}

	for(i=0; i<oRss.length; i++){
		oIndex.Type = "RSS"
		oIndex.URI = oRss[i].URI
		oFeedIndex.push(oIndex)
	}

	localStorage.setItem("feedIndex", JSON.stringify(oFeedIndex))

}