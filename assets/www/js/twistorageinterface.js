function getTwiFeeds(){
	
	if(localStorage.getItem("TWI") != null && localStorage.getItem("TWI") != ""){
		oTwi = JSON.parse(localStorage.getItem("TWI"))
		return oTwi
	} else {
		return null
	}
	
}

function addTwiFeed(Uri, title){
	
	if(getTwiFeeds() == null){
		var oTwi = []
	} else {
		var oTwi = getTwiFeeds()
	}
	
	var oNewTwi = {
		"URI" : Uri,
		"title" : title,
		"filters" : "",
		"feedType" : "",
		"arrayIndex" : ""
		}
	
	oTwi.push(oNewTwi)

	localStorage.setItem("TWI", JSON.stringify(oTwi))
	
	indexFeeds()
}

function remTwiFeed(arrayIndex){
	
	console.log('attempting to remove Twifeed array number' + arrayIndex + 'from localStorage')
		
	oTwi = getTwiFeeds()
	
	console.log("Removing" + JSON.stringify(oTwi[arrayIndex]))
		
	oTwi.splice(arrayIndex, 1)	

	if(oTwi.length == null || oTwi.length == 0){
		localStorage.setItem("TWI", null)
	} else {
		localStorage.setItem("TWI", JSON.stringify(oTwi))
	}
	
	indexFeeds()
}