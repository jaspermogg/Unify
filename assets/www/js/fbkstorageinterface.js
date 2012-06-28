function getFbkFeeds(){
	
	if(localStorage.getItem("FBK") != null && localStorage.getItem("FBK") != ""){
		oFbk = JSON.parse(localStorage.getItem("FBK"))
		return oFbk
	} else {
		return null
	}
	
}

function addFbkFeed(Uri, title){
	
	if(getFbkFeeds() == null){
		var oFbk = []
	} else {
		var oFbk = getFbkFeeds()
	}
	
	var oNewFbk = {
		"URI" : Uri,
		"title" : title,
		"filters" : ""
		}
	
	oFbk.push(oNewFbk)

	localStorage.setItem("FBK", JSON.stringify(oFbk))

	indexFeeds()
}

function remFbkFeed(arrayIndex){
	
	console.log('attempting to remove Fbkfeed array number' + arrayIndex + 'from localStorage')
	
	oFbk = getFbkFeeds()
	
	console.log("Removing" + JSON.stringify(oFbk[arrayIndex]))
		
	oFbk.splice(arrayIndex, 1)	

	if(oFbk.length == null || oFbk.length == 0){
		localStorage.setItem("FBK", null)
	} else {
		localStorage.setItem("FBK", JSON.stringify(oFbk))
	}
	
	indexFeeds()
}