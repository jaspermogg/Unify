function hogwarts(){
	localStorage.setItem("authData", '{"attributes":{"HTTP_SHIB_PROG_TYPE" : {"text":"Gryffindor"}, "HTTP_SHIB_EP_STAFFORSTUDENT" : {"text" : "student"}, "HTTP_SHIB_PN_GIVENNAME" : {"text" : "Harry James"}, "HTTP_SHIB_PN_SN" : {"text" : "Potter"}}}')
	
	$.mobile.changePage('#page1')
}