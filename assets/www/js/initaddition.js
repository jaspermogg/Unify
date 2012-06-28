replace ADDFEEDBUTTON id
set data-feedTitle, data-feedUri and data-feedType on the above according to target.

$('#ADDFEEDBUTTON').off('click').on('click', function(){

	addUri = $('#ADDFEEDBUTTON').attr('data-feedUri')
	addTitle = $('#ADDFEEDBUTTON').attr('data-feedTitle')
	addType = $('#ADDFEEDBUTTON').attr('data-feedType')

	switch(addType){
		case "FBK":
			addFbkFeed(addUri, addTitle)
		break;
		case "TWI":
			addTwiFeed(addUri, addTitle)
		break;
		case "RSS":
			addRssFeed(addUri, addTitle)
		break;
	}
	
}

$('#REMFEEDBUTTON').off('click').on('click', function(){

	remUri = $('#ADDFEEDBUTTON').attr('data-feedUri')
	remType = $('#ADDFEEDBUTTON').attr('data-feedType')

	switch(remType){
		case "FBK":
			remFbkFeed(remUri)
		break;
		case "TWI":
			remTwiFeed(remUri)
		break;
		case "RSS":
			remRssFeed(remUri)
		break;
	}
	
}

$('#ADJUSTFILTERBUTTOM').off('click').on('click', function(){
	
	$('filterWrapper').show()
	
}

$('#CURRENTFILTERBUTTONS').off('click').on('click', function(){
	
	r = confirm("Do you want to remove this filter?")
	if(r){
	
		
	
	}
	
}

$('#ADDFILTERBUTTOM').off('click').on('click', function(){
	
	$('filterWrapper').show()
	
}