//TODO - put together a function which determines which populator to hand off to
function populateWhat(type, number){
	switch(type){
		case "feedblocks":
			populateBars(number)
			break;
		case "directoryoptions":
			populateDirectory(number)
			break;
	}
}

function populateBars(barsnumber){
	
	var currentPageId = $.mobile.activePage.attr("id")
	
	var barshtml = '<div data-role="collapsible-set" id="' + currentPageId + 'Accordion"><ul data-role="listview" data-theme="b">'
	for ( var i = 0; i < barsnumber; i++){
		standardcollapsed =
			'<div data-role="collapsible" data-collapsed="true" id="'+currentPageId+'feed'+i+'bar" class="feedbar">' +
			'<h3 id="'+currentPageId+'feed'+i+'title" class="feedtitle"> Loading...</h3>' +
			'<div class="feedcontent" id="'+currentPageId+'feed'+i+'">' +
			'</div>' +
			'</div>'
		barshtml += standardcollapsed
	};
	
	barshtml += '</ul></div>';
	var accordioncontainer = $('#' + currentPageId + 'AccordionContainer')
	accordioncontainer.empty();
	accordioncontainer.html(barshtml);
	accordioncontainer.trigger("create");
	$('.ui-collapsible-heading-toggle .ui-btn-text').addClass("hdrtext")
		
	$(accordioncontainer).on('click', 'a', function(event){feedfetch(event)})
		
	return currentPageId
}


//TODO - put together a similar function to populateBars, which makes <li>s instead, linking to another page based on what they contain (i.e. 'add feed' preview page)
function populateDirectory(){
	
}
