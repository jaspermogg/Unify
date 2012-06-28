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
		"filters" : ""
		}
	
	oTwi.push(oNewTwi)

	localStorage.setItem("TWI", JSON.stringify(oTwi))
	
	indexFeeds()
}

function remTwiFeed(remUri){
	
	console.log('attempting to remove feed URL - ' + remUri + ' from localStorage')
	
	oTwi = getTwiFeeds()
	
	for(i=0; i < oTwi.length; i++){
		
		if(oTwi[i].URI == remUri){
			delete oTwi[i]
			console.log('removing feed URI - ' + oTwi[i].URI)
		} else {
			console.log('not removing feed URI - ' + oTwi[i].URI)
		}
		
	}
	
	if(oTwi.length == null || oTwi.length == 0){
		localStorage.setItem("TWI", null)
	} else {
		localStorage,setItem("TWI", JSON.stringify(oTwi))
	}
	
	indexFeeds()
}