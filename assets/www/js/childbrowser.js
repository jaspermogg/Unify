
/*
* cordova is available under *either* the terms of the modified BSD license *or* the
* MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
*
* Copyright (c) 2005-2010, Nitobi Software Inc.
* Copyright (c) 2011, IBM Corporation
*/

/**
* Constructor
*/
function ChildBrowser() {
};

ChildBrowser.CLOSE_EVENT = 0;
ChildBrowser.LOCATION_CHANGED_EVENT = 1;

/**
* Display a new browser with the specified URL.
* This method loads up a new web view in a dialog.
*
* @param url The url to load
* @param options An object that specifies additional options
*/
ChildBrowser.prototype.showWebPage = function(url, options) {
    if (options === null || options === "undefined") {
        var options = new Object();
        options.showLocationBar = true;
    }
    cordova.exec(this._onEvent, this._onError, "ChildBrowser", "showWebPage", [url, options]);
};

/**
* Close the browser opened by showWebPage.
*/
ChildBrowser.prototype.close = function() {
    cordova.exec(null, null, "ChildBrowser", "close", []);
};

/**
* Display a new browser with the specified URL.
* This method starts a new web browser activity.
*
* @param url The url to load
* @param usecordova Load url in cordova webview [optional]
*/
ChildBrowser.prototype.openExternal = function(url, usecordova) {
    if (usecordova === true) {
        navigator.app.loadUrl(url);
    }
    else {
        cordova.exec(null, null, "ChildBrowser", "openExternal", [url, usecordova]);
    }
};

/**
* Method called when the child browser has an event.
*/
ChildBrowser.prototype._onEvent = function(data) {
    if (data.type == ChildBrowser.CLOSE_EVENT && typeof window.plugins.childBrowser.onClose === "function") {
        window.plugins.childBrowser.onClose();
    }
    if (data.type == ChildBrowser.LOCATION_CHANGED_EVENT && typeof window.plugins.childBrowser.onLocationChange === "function") {
    	data.location == "###" ? (cb.Close(), console.log("directClose of browser")) : window.plugins.childBrowser.onLocationChange(data.location);
    }
};

/**
* Method called when the child browser has an error.
*/
ChildBrowser.prototype._onError = function(data) {
    if (typeof window.plugins.childBrowser.onError === "function") {
        window.plugins.childBrowser.onError(data);
    }
};

/**
* Maintain API consistency with iOS
*/
ChildBrowser.install = function(){
    return window.plugins.childBrowser;
   };

/**
* Load ChildBrowser
*/
cordova.addConstructor(function() {
    cordova.addPlugin("childBrowser", new ChildBrowser());
});


ChildBrowser.install();
	
	
function openChildBrowser(URL, locBar, addressBar, backForward, isClose){
	

	
	cb = window.plugins.childBrowser
	
	cb.showWebPage(URL, {"showLocationBar" : locBar, "ShowAddressBar" : addressBar, "showBackForward" : backForward, "showClose" : isClose})
	
	if (URL == "https://m.ncl.ac.uk/secure/attributes.xml#initial"){
		
		cb.onLocationChange = function(loc){
		loc == ("https://m.ncl.ac.uk/secure/attributes.xml") ? (cb.close(), console.log("close because URL = " + loc)) : console.log("location changed, stay open URL = " + loc)
		loc.search("###") != -1 ? (isUserCloseAction=true, cb.close()) : console.log("url not equal to close")
		}
	
		cb.onClose = function(){
		
		isUserCloseAction ? (console.log("CHILDBROWSER CLOSED - user"), isUserCloseAction = false) : (console.log("CHILDBROWSER CLOSED - program"), shibIsAuthed(true))
		}
		
	} else {
		
		cb.onLocationChange = function(loc){
			console.log("onLocationChange fired. loc =" + loc)
			loc.search("###") != -1 ? (window.plugins.childBrowser.close(), console.log("closing as url is = " + loc)) : console.log("url not equal to close as url is = " + loc)
		}
			
		cb.onClose = function(){
			
			console.log("CHILDBROWSER CLOSED - user")	
		}	
		
	}

}