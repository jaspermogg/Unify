function populateBars(barsnumber){
	var barshtml = '<div data-role="collapsible-set" data-theme="b" data-content-theme="b" data-mini="true" id="accordion">';
	for ( var i = 0; i < barsnumber; i++){
		standardcollapsed =
			'<div data-role="collapsible" data-collapsed="true" id="feed'+i+'bar" class="feedbar">' +
			'<h3 id="feed'+i+'title" class="feedtitle"> Loading...</h3>' +
			'<div class="feedcontent" id="feed'+i+'">' +
			'</div>' +
			'</div>'
		barshtml += standardcollapsed
	};
	barshtml += '</div>';
	$('#accordioncontainer').empty();
	$('#accordioncontainer').html(barshtml).trigger("create");
	$('#accordion a:first').trigger("tap");
	$('#footerbar').trigger("refresh");
	$('.ui-collapsible-heading-toggle').bind("click", function(event){feedfetch(event)})
}