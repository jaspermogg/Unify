

function shibIsAuthed(){
	if(localStorage.getItem("shibXml") == ""){
		loginObject = $.get("https://m.ncl.ac.uk/secure/attributes.xml", function(data){
			if(data.constructor == Document){
				dirtyShibString = JSON.stringify(xmlToJson(data))
				cleanShibString = dirtyShibString.replace(/\\n/gm,"").replace(/#/gm, "")
				localStorage.setItem("shibXml", cleanShibString)
				alert(cleanShibString)
						} else {
				authenticate()
			}
		})
	} else {
		$.mobile.changePage('#page1')
	}	
}

function authenticate(){
	
	shibLoginPage()
	
}

function shibLoginPage(){
	openChildBrowser("https://m.ncl.ac.uk/secure/attributes.xml#initial")
}
