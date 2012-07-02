function handleNclFeedClicks(previewURI, officialTitle){

	console.log("opening" + previewURI)

	var feedPreview = new google.feeds.Feed(previewURI)
	feedPreview.setNumEntries(5)
	feedPreview.load(function(feedPreviewFetchResults){

		var entries = feedPreviewFetchResults.feed.entries
		
		if(feedPreviewFetchResults.error){
			console.log(JSON.stringify(feedPreviewFetchResults.error))
			alert("Something seems to be wrong with that feed or your connection. Please try again later!")

		} else {

			var previewPostHtml = ""
			
			$('div#postPreviewFeedSummaryWrapper').html('<div id="postPreviewFeedSummary"><h2><a href="" data-uri="'+feedPreviewFetchResults.feed.link +'">'+
			officialTitle +'</a></h2></div>')
			
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

		$('#page4addFeedButton').attr("data-feedTitle", officialTitle).attr("data-feedUri", previewURI).attr("data-feedType", feedType)		
	
		$('ul#previewPostList').listview()
		$('ul#previewPostList').listview('refresh')
	
	}	
	})

}