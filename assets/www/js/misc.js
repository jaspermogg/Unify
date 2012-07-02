function byUrlPreview(previewURI){

	console.log("opening" + previewURI)
	var feedPreview = new google.feeds.Feed(previewURI)
	feedPreview.setNumEntries(5)
	feedPreview.load(function(feedPreviewFetchResults){
		var entries = feedPreviewFetchResults.feed.entries
		
		if(feedPreviewFetchResults.error){
			console.log(JSON.stringify(feedPreviewFetchResults.error))
			alert("That didn't work! Please make sure your URL has the form 'http://xyz.xyz.xyz/xyz', or something thereabouts. The http:// is crucial, as is the spelling.")

		} else {

			var previewPostHtml = ""
			
			$('div#postPreviewFeedSummaryWrapper').html('<div id="postPreviewFeedSummary"><h2><a href="" data-uri="'+feedPreviewFetchResults.feed.link +'">'+
			feedPreviewFetchResults.feed.title +'</a></h2></div>')
			
			for(i=0;i<entries.length;i++){
				
				var preFormatDate = entries[i].publishedDate
				formattedDate = preFormatDate.slice(0, (preFormatDate.length - 6))
								
				if(entries[i].contentSnippet != ""){
				previewPostHtml = previewPostHtml + '<li><a href="" data-uri="'+ entries[i].link +'" data-postpreviewid="previewpost' + 
				i + '" data-feedtype="RSS"><h3>' + entries[i].title +'</h3><p><strong>' + formattedDate +
				'</p></strong><p>' +	entries[i].contentSnippet + '</p></a></li>'
				$('ul#previewPostList').html(previewPostHtml)

				}
				
			}
			
		$.mobile.changePage($('#page4'))
	
		previewURI.search("twitter.com") != -1 ? feedType="TWI" : feedType="RSS"
		previewURI.search("facebook.com") != -1 ? feedType="FBK" : feedType="RSS"
		
		$('#page4addFeedButton').attr("data-feedTitle", feedPreviewFetchResults.feed.title).attr("data-feedUri", previewURI).attr("data-feedType", feedType)
		$('ul#previewPostList').listview()
		$('ul#previewPostList').listview('refresh')
	
	}	
	})

}

//throws NCL feeds up on the official tab.
function handleNclFeeds(nclFeeds){
	nclFeedData = nclFeeds.entries
	$('#page2 ul#officialFeedContainer').empty()
	
	for(i=0; i<nclFeedData.length; i++){
		
		liHtml = '<li class="officialLink" data-officialtitle ="'+nclFeedData[i].title+'" data-uri="' + nclFeedData[i].url + '" data-type="' + nclFeedData[i].type + '"><a><h2>' +
		nclFeedData[i].title + '</h2><p><strong>' + nclFeedData[i].link + '</strong</p><p>' + nclFeedData[i].contentSnippet + '</p></a></li>'

		$('#page2 ul#officialFeedContainer').append(liHtml)
	}
	
	$('#page2 ul#officialFeedContainer').listview('refresh')
	

}


//Decides which authorisation script to use
function auth(institution){
	switch (institution){
		case "Newcastle University" :
			shibIsAuthed()
			break;
		case "Hogwarts School of Witchcraft and Wizardry" :
			alert("No muggles allowed, thank you very much.")
			break;
		case "Police Academy 3" :
			alert("Come on, choose a university...")
			break;
	}
}

//Checks if a string is a valid URL
function validUrl(str) {
  var pattern = new RegExp(
    '((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|'+ // domain name
    '((\d{1,3}\.){3}\d{1,3}))'+ // OR ip (v4) address
    '(\:\d+)?(\/[-a-z\d%_.~+]*)*'+ // port and path
    '(\?[;&a-z\d%_.~+=-]*)?'+ // query string
    '(\#[-a-z\d_]*)?$','i'); // fragment locater
  if(!pattern.test(str)) {
    return false;
  } else {
    return true;
  }
}


// Converts XML to JSON
function xmlToJson(xml) {

		// Create the return object
		var obj = {};
	
		if (xml.nodeType == 1) { // element
			// do attributes
			if (xml.attributes.length > 0) {
			obj["@attributes"] = {};
				for (var j = 0; j < xml.attributes.length; j++) {
					var attribute = xml.attributes.item(j);
					obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
				}
			}
		} else if (xml.nodeType == 3) { // text
			obj = xml.nodeValue;
		}
	
		// do children
		if (xml.hasChildNodes()) {
			for(var i = 0; i < xml.childNodes.length; i++) {
				var item = xml.childNodes.item(i);
				var nodeName = item.nodeName;
				if (typeof(obj[nodeName]) == "undefined") {
					obj[nodeName] = xmlToJson(item);
				} else {
					if (typeof(obj[nodeName].push) == "undefined") {
						var old = obj[nodeName];
						obj[nodeName] = [];
						obj[nodeName].push(old);
					}
					obj[nodeName].push(xmlToJson(item));
				}
			}
		}
		return obj;
};


//Sorts an array alphabetically.
function sort_by(field, reverse, primer){

   var key = function (x) {return primer ? primer(x[field]) : x[field]};

   return function (a,b) {
       var A = key(a), B = key(b);
       return (A < B ? -1 : (A > B ? 1 : 0)) * [1,-1][+!!reverse];               
   }
}