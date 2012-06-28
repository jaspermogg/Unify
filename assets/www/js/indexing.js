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

	if(oFbk){
		for(i=0; i<oFbk.length; i++){
			oFeedIndex.push({"URI" : oFbk[i].URI, "Type" : "FBK"})
		}
	}
	
	if(oTwi){	
		for(i=0; i<oTwi.length; i++){
			oFeedIndex.push({"URI" : oTwi[i].URI, "Type" : "TWI"})
		}
	}
	
	if(oRss){
		for(i=0; i<oRss.length; i++){
			oFeedIndex.push({"URI" : oRss[i].URI, "Type" : "RSS"})
		}
	}
	
	localStorage.setItem("feedIndex", JSON.stringify(oFeedIndex))

}