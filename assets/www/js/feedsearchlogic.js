

google.load("feeds", "1");

function userSearchFeeds(feedSearchString){
		
	google.feeds.findFeeds(feedSearchString, processFeedSearchResults)

}

function processFeedSearchResults(feedSearchResults){
	
	if(feedSearchResults.error){
		alert(feedSearchResults.error)
	} else {
		$('div#feedList').replaceWith('<div id="feedList"><ul data-role="listview" id="feedLinkList"></ul></div>')
		for(i=0;i < feedSearchResults.entries.length; i++){
			titleHtml = '<li><a href="#page4" data-feedpreviewID="'+i+'" data-feedtype="RSS" data-URI="' + feedSearchResults.entries[i].url + '">' + '<h3>' + feedSearchResults.entries[i].title + '</h3>' + '<p><strong>' + 
			feedSearchResults.entries[i].url +'</strong><p><p>' + feedSearchResults.entries[i].contentSnippet + '</p></a></li>'
			$('div#feedList').append(titleHtml)
		}
	}
	
	$('div#feedList').listview().find('a').on('click', function(){
	$('div#postPreviewContainerWrapper').html('<div id="postPreviewContainer"><ul data-role="listview" id="previewPostList"></ul></div>')
	var previewURI = $(this).attr("data-URI")
	
	console.log("opening" + previewURI)

	var feedPreview = new google.feeds.Feed(previewURI)
	
	feedPreview.load(function(feedPreviewFetchResults){
		var entries = feedPreviewFetchResults.feed.entries
		if(feedPreviewFetchResults.error){
			console.log(JSON.stringify(feedPreviewFetchResults.error))
			alert("Something went awry, but you should be able to continue. We're fighting tooth and nail against these bugs!'")
		} else {
			$('div#postPreviewContainerWrapper').prepend('<div id="postPreviewFeedSummary"><h2><a href="'+ feedPreviewFetchResults.feed.link +'">'+ feedPreviewFetchResults.feed.title +'</a></h2><h3>'+ feedPreviewFetchResults.feed.author +'</h3><p>'+ feedPreviewFetchResults.feed.description +'</p></div>')
			for(i=0;i<entries.length;i++){
				var previewPostHtml = '<li><a href="'+ entries[i].link +'" data-postPreviewID="previewpost' + i + '" data-feedtype="RSS"><p>' +
				entries[i].contentSnippet + '</p></a></li>'
				$('ul#previewPostList').append(previewPostHtml)
			}
		$('div#postPreviewContainer ul').listview().listview().listview()
		$('div#postPreviewContainer ul').trigger('create').listview()
		$('#page4').trigger('refresh')
		}
	})

})

}