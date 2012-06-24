

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
			titleHtml = '<li><a href="" data-feedpreviewid="'+i+'" data-feedtype="RSS" data-uri="' + feedSearchResults.entries[i].url + '">' + '<h3>' + feedSearchResults.entries[i].title + '</h3>' + '<p><strong>' + 
			feedSearchResults.entries[i].url +'</strong><p><p>' + feedSearchResults.entries[i].contentSnippet + '</p></a></li>'
			$('div#feedList').append(titleHtml)
		}
	}
	
	$('div#feedList').listview().find('a').off('click').on('click', function(){
	var previewURI = $(this).attr("data-uri")
	var barID = $(this).attr("data-feedpreviewid")
	console.log("opening" + previewURI)

	var feedPreview = new google.feeds.Feed(previewURI)
	
	feedPreview.load(function(feedPreviewFetchResults){
		var entries = feedPreviewFetchResults.feed.entries
		
		if(feedPreviewFetchResults.error){
			console.log(JSON.stringify(feedPreviewFetchResults.error))
			alert("That feed appears to be empty, sorry! I'll remove it from the list.")
			$('div#feedList [data-feedpreviewid=' + barID + ']').parents('li').remove()
		} else {

			if ((JSON.stringify(entries)).indexOf(" ") == -1 ){
				$('div#feedList [data-feedpreviewid=' + barID + ']').parents('li').remove()
				alert("That feed appears to be empty, sorry! I'll remove it from the list.")
				return false;
			}
			
			var previewPostHtml = ""
			$('div#postPreviewFeedSummaryWrapper').html('<div id="postPreviewFeedSummary"><h2 data-uri="'+ feedPreviewFetchResults.feed.link +'"><a href="" data-uri="'+ feedPreviewFetchResults.feed.link +'">'+ feedPreviewFetchResults.feed.title +'</a></h2><h3>'+ feedPreviewFetchResults.feed.author +'</h3><p>'+ feedPreviewFetchResults.feed.description +'</p></div>')
			for(i=0;i<entries.length;i++){
				
				if(entries[i].contentSnippet != ""){
				previewPostHtml = previewPostHtml + '<li><a href="" data-uri="'+ entries[i].link +'" data-postpreviewid="previewpost' + i + '" data-feedtype="RSS"><p>' +
				entries[i].contentSnippet + '</p></a></li>'
				$('ul#previewPostList').html(previewPostHtml)

				}
				
			}
		$.mobile.changePage($('#page4'))		
		console.log("makes it here")
		$('ul#previewPostList').listview()
		console.log("makes it here2")
		$('ul#previewPostList').listview('refresh')
		}
	})

})

}