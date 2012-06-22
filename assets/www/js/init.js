function page1init() {
	console.log("page 1 initialised")
	if(fbkisloggedin()){
		switchloginbutton("logout");
		fbafterinit(true);
	} else {
		fbafterinit(false);
	}
}

function page2init() {
	console.log("page 2 initialised")
}

function page3init() {
	console.log("page 3 initialised")
}