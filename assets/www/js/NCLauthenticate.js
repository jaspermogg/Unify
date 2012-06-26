
function shibIsAuthed(dontForceLogin){
	if((localStorage.getItem("authData") == "") || !(localStorage.getItem("authData"))){
		loginObject = $.get("https://m.ncl.ac.uk/secure/attributes.xml", function(data){
			if(data.constructor == Document){
				dirtyShibString = JSON.stringify(xmlToJson(data))
				cleanShibString = dirtyShibString.replace(/\\n/gm,"").replace(/#/gm, "")
				localStorage.setItem("authData", cleanShibString)
				shibIsAuthed()
			} else {
				dontForceLogin ? console.log("suppressing browser re-open") : authenticate()
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
	openChildBrowser("https://m.ncl.ac.uk/secure/attributes.xml#initial", true, true)
}
