



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
	
})

$('#ADJUSTFILTERBUTTOM').off('click').on('click', function(){
	
	$('filterWrapper').show()
	
})

$('#CURRENTFILTERBUTTONS').off('click').on('click', function(){
	
	r = confirm("Do you want to remove this filter?")
	if(r){
	
		
	
	}
	
})

$('#ADDFILTERBUTTOM').off('click').on('click', function(){
	
	$('filterWrapper').show()
	
})