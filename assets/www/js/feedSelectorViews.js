function feedSelectorByTime(){
	
	$('#byFeedWrapper').hide()
	$('#byTimeWrapper').show()
			
}

function feedSelectorByFeed(){
	
	$('#byFeedWrapper').show()
	$('#byTimeWrapper').hide()
			
}

function feedSelectorViewOfficial(){
	$('#officialInstructions').show()
	$('#customInstructions').hide()
	$('#customFeedAddWrapper').hide()
	$('#officialFeedWrapper').show()
			
}

function feedSelectorViewCustom(){
	$('#officialInstructions').hide()
	$('#customInstructions').show()
	$('#officialFeedWrapper').hide()
	$('#customFeedAddWrapper').show()
	
	$('#genericFeedSearch').off('click').on('click', function(){
		window.searchType = "default"
		$('#initialInstructions2').hide()
		$('#customFeedAddButtons').hide()
		$('#searchBarContainer').show()
		$('#feedSearchBar').focus()
		$('#customFeedAddConfirmationButtons').show()
		$('#feedSearchDone').off('click').on('click', function(){
			!localStorage.getItem("feedIndex") ? $('#initialInstructions2').show() : null
			$('#customFeedAddButtons').show()
			$('#searchBarContainer').hide()
			$('#customFeedAddConfirmationButtons').hide()
			$('#feedList').hide()
		})
	})
	
	$('#twitterFeedSearch').off('click').on('click', function(){
		window.searchType = "twitter"
		$('#initialInstructions2').hide()
		$('#customFeedAddButtons').hide()
		$('#searchBarContainer').show()
		$('#feedSearchBar').focus()
		$('#customFeedAddConfirmationButtons').show()
		$('#feedSearchDone').off('click').on('click', function(){
			!localStorage.getItem("feedIndex") ? $('#initialInstructions2').show() : null
			$('#customFeedAddButtons').show()
			$('#searchBarContainer').hide()
			$('#customFeedAddConfirmationButtons').hide()
			$('#feedList').hide()
		})
	})
	
	$('#facebookFeedSearch').off('click').on('click', function(){
		$('#facebookGroupWrapper').show()
		$('#initialInstructions2').hide()
		$('#customFeedAddButtons').hide()
		$('#customFeedAddConfirmationButtons').show()
		$('#feedSearchDone').off('click').on('click', function(){
			!localStorage.getItem("feedIndex") ? $('#initialInstructions2').show() : null
			$('#customFeedAddButtons').show()
			$('#facebookGroupWrapper').hide()
			$('#customFeedAddConfirmationButtons').hide()
		})
		useFb("fetchgroups($('#page2 ul#facebookGroupList'))")
	})
	
	$('#facebookPageSearch').off('click').on('click', function(){
		$('#facebookGroupWrapper').show()
		$('#initialInstructions2').hide()
		$('#customFeedAddButtons').hide()
		$('#customFeedAddConfirmationButtons').show()
		$('#feedSearchDone').off('click').on('click', function(){
			!localStorage.getItem("feedIndex") ? $('#initialInstructions2').show() : null
			$('#customFeedAddButtons').show()
			$('#facebookGroupWrapper').hide()
			$('#customFeedAddConfirmationButtons').hide()
		})
		useFb("fetchpages($('#page2 ul#facebookGroupList'))")
	})
	
	$('#urlFeedSearch').off('click').on('click', function(){
		window.searchType = "url"
		$('#initialInstructions2').hide()
		$('#customFeedAddConfirmationButtons').show()
		$('#customFeedAddButtons').hide()
		$('#urlBarContainer').show()
		$('#customUrlInput').focus()
		$('#feedSearchDone').off('click').on('click', function(){
			!localStorage.getItem("feedIndex") ? $('#initialInstructions2').show() : null
			$('#customFeedAddButtons').show()
			$('#urlBarContainer').hide()
			$('#customFeedAddConfirmationButtons').hide()
		})
		
	})

	$('#siteFeedSearch').off('click').on('click', function(){
		window.searchType = "site"
		$('#initialInstructions2').hide()
		$('#customFeedAddButtons').hide()
		$('#searchBarContainer').show()
		$('#feedSearchBar').focus()
		$('#customFeedAddConfirmationButtons').show()
		$('#feedSearchDone').off('click').on('click', function(){
			!localStorage.getItem("feedIndex") ? $('#initialInstructions2').show() : null
			$('#customFeedAddButtons').show()
			$('#searchBarContainer').hide()
			$('#customFeedAddConfirmationButtons').hide()
			$('#feedList').hide()
		})
	})
	
}