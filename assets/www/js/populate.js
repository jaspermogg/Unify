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
	var currentpageid = $.mobile.activePage.attr("id")
	var barshtml = '<div data-role="collapsible-set" data-theme="b" data-content-theme="b" data-mini="true" id="'+currentpageid+'accordion">';
	for ( var i = 0; i < barsnumber; i++){
		standardcollapsed =
			'<div data-role="collapsible" data-collapsed-icon="arrow-r" data-expanded-icon="arrow-d" data-collapsed="true" id="'+currentpageid+'feed'+i+'bar" class="feedbar">' +
			'<h3 id="'+currentpageid+'feed'+i+'title" class="feedtitle"> Loading...</h3>' +
			'<div class="feedcontent" id="'+currentpageid+'feed'+i+'">' +
			'</div>' +
			'</div>'
		barshtml += standardcollapsed
	};
	barshtml += '</div>';
	var accordioncontainer = $('#' + currentpageid + 'accordioncontainer')
	accordioncontainer.empty();
	accordioncontainer.html(barshtml);
	// $('#accordion div:first').attr("data-collapsed", "false");
	accordioncontainer.trigger("create");
	$('.ui-collapsible-heading-toggle').bind("click", function(event){feedfetch(event)})
	$('.ui-collapsible-heading-toggle .ui-btn-text').addClass("hdrtext")
	return currentpageid
}


//TODO - put together a similar function to populateBars, which makes <li>s instead, linking to another page based on what they contain (i.e. 'add feed' preview page)
function populateDirectory(){
	
}
