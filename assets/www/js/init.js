function page1init() {
	if(fbkisloggedin()){
		switchloginbutton("logout");
		fbafterinit(true);
	} else {
		fbafterinit(false);
	}
}

function page2init() {
	alert("woo! it works!")
}
