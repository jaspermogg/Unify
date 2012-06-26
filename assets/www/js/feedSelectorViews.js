function feedSelectorViewOfficial(){
	
	$('#customFeedAddWrapper').hide()
	
}

function feedSelectorViewCustom(){
	
	$('#customFeedAddWrapper').show()
	$('#genericFeedSearch').off('click').on('click', function(){
		window.isTwitterSearch = false
		$('#customFeedAddWrapper').hide()
		$('#searchBarContainer').show()
		$('#confirmationButtons').show()
		$('#feedSearchDone').off('click').on('click', function(){
			$('#customFeedAddWrapper').show()
			$('#searchBarContainer').hide()
			$('#confirmationButtons').hide()
			$('#feedList').hide()
		})
	})
	
	$('#twitterFeedSearch').off('click').on('click', function(){
		window.isTwitterSearch = true
		$('#customFeedAddWrapper').hide()
		$('#searchBarContainer').show()
		$('#confirmationButtons').show()
		$('#feedSearchDone').off('click').on('click', function(){
			$('#customFeedAddWrapper').show()
			$('#searchBarContainer').hide()
			$('#confirmationButtons').hide()
			$('#feedList').hide()
		})
	})
	
	$('#facebookFeedSearch').off('click').on('click', function(){
		$('#customFeedAddWrapper').hide()
		fetchgroups($('#page2 #page2AccordionContainer'), "feeds")
		$('#confirmationButtons').show()
		$('#feedSearchDone').off('click').on('click', function(){
			$('#customFeedAddWrapper').show()
			$('#facebookGroupWrapper').hide()
			$('#confirmationButtons').hide()
		})
	})
	
	$('#urlFeedSearch').off('click').on('click', function(){
		$('#customFeedAddWrapper').hide()
	})
	
}

function feedSelectorViewCurrent(){
	
	$('#customFeedAddWrapper').hide()
	
}