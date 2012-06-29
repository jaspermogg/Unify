function feedSelectorViewOfficial(){
	
	$('#customFeedAddWrapper').hide()
	$('#officialFeedWrapper').show()
			
}

function feedSelectorViewCustom(){
	$('#officialFeedWrapper').hide()
	$('#customFeedAddWrapper').show()
	
	$('#genericFeedSearch').off('click').on('click', function(){
		window.searchType = "default"
		$('#customFeedAddButtons').hide()
		$('#searchBarContainer').show()
		$('#feedSearchBar').focus()
		$('#customFeedAddConfirmationButtons').show()
		$('#feedSearchDone').off('click').on('click', function(){
			$('#customFeedAddButtons').show()
			$('#searchBarContainer').hide()
			$('#customFeedAddConfirmationButtons').hide()
			$('#feedList').hide()
		})
	})
	
	$('#twitterFeedSearch').off('click').on('click', function(){
		window.searchType = "twitter"
		$('#customFeedAddButtons').hide()
		$('#searchBarContainer').show()
		$('#feedSearchBar').focus()
		$('#customFeedAddConfirmationButtons').show()
		$('#feedSearchDone').off('click').on('click', function(){
			$('#customFeedAddButtons').show()
			$('#searchBarContainer').hide()
			$('#customFeedAddConfirmationButtons').hide()
			$('#feedList').hide()
		})
	})
	
	$('#facebookFeedSearch').off('click').on('click', function(){
		$('#customFeedAddButtons').hide()
		fetchgroups($('#page2 #page2AccordionContainer'), "feeds")
		$('#customFeedAddConfirmationButtons').show()
		$('#feedSearchDone').off('click').on('click', function(){
			$('#customFeedAddButtons').show()
			$('#facebookGroupWrapper').hide()
			$('#customFeedAddConfirmationButtons').hide()
		})
	})
	
	$('#urlFeedSearch').off('click').on('click', function(){
		window.searchType = "url"
		$('#customFeedAddConfirmationButtons').show()
		$('#customFeedAddButtons').hide()
		$('#urlBarContainer').show()
		$('#customUrlInput').focus()
		$('#feedSearchDone').off('click').on('click', function(){
			$('#customFeedAddButtons').show()
			$('#urlBarContainer').hide()
			$('#customFeedAddConfirmationButtons').hide()
		})
		
	})

	$('#siteFeedSearch').off('click').on('click', function(){
		window.searchType = "site"
		$('#customFeedAddButtons').hide()
		$('#searchBarContainer').show()
		$('#feedSearchBar').focus()
		$('#customFeedAddConfirmationButtons').show()
		$('#feedSearchDone').off('click').on('click', function(){
			$('#customFeedAddButtons').show()
			$('#searchBarContainer').hide()
			$('#customFeedAddConfirmationButtons').hide()
			$('#feedList').hide()
		})
	})
	
}

function feedSelectorViewCurrent(){
	
	$('#customFeedAddWrapper').hide()
	
}