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

function remFbkFeed(remUri){
	
	console.log('attempting to remove feed URL - ' + remUri + ' from localStorage')
	
	oFbk = getFbkFeeds()
	
	for(i=0; i < oFbk.length; i++){
		
		if(oFbk[i].URI == remUri){
			delete oFbk[i]
			console.log('removing feed URI - ' + oFbk[i].URI)
		} else {
			console.log('not removing feed URI - ' + oFbk[i].URI)
		}
		
	}
	
	if(oFbk.length == null || oFbk.length == 0){
		localStorage.setItem("FBK", null)
	} else {
		localStorage,setItem("FBK", JSON.stringify(o
	}

	indexFeeds()	
}