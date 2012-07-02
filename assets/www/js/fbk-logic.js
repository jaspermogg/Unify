var fbinit = function(){
	try {
		FB.init({
			appId : "306316522792748",
			nativeInterface : CDV.FB,
			useCachedDialogs : false
		});
		console.log("fkb-logic.js: FB init executed");
	} catch (e) {
		console.log("fkb-logic.js: error - " + e);
	}
}

function useFb(targetFunction){
	
	FB.getLoginStatus(function(response){

		if(response.status == "connected"){
			eval(targetFunction)
		} else {
			var r = confirm("You don't seem to be logged into Facebook. Would you like to login now?")
			if(r){
				FB.Event.subscribe('auth.login', function(response) {
					eval(targetFunction)
  				})
  				login()
			} else {
				$('#feedSearchDone').click()
			}
		}
	})
}

function fetchgroups(container){

	
	$(container).empty();
	
	FB.api('/me/groups', {
		fields : 'id, name, picture, description'
		}, function(response) {
				if (response.error){
					$(container).html('<div style="text-align: center;">Something went awry! Are you definitely connected to the intertubes' +
					'and logged into Facebook?<a data-role="button" onClick="useFb("fetchgroups($(' + container + '))")">Try Again</a></div>');
				} else {
					
					var data = response.data;
					data.sort(sort_by('name', false));
					var groupHtml = ""
					var description = ""
					for (i = 0; i < data.length; i++) {
						var item = data[i];
						item.description ? description = '<p class="contentSnippet">' + item.description.replace(/<(?:.|\n)*?>/gm, '') + '</p>' : description = ""						
						groupHtml = groupHtml + '<li data-fbid="'+ item.id + '" data-feedtype="FBK"> <a href="" > <h3>' +
						item.name + '</h3>' + '<p><strong>http://www.facebook.com/' +
						item.id +'</strong></p>'+ description +' </a></li>'
					};
				$(container).html(groupHtml)
				$(container).listview()
				$(container).listview('refresh')

			};
		})
	
}
	
function fetchpages(container){
	
	$(container).empty();
	
	FB.api('/me/likes', {
		fields : 'id, name, picture, description'
		}, function(response) {
				if (response.error){
					$(container).html('<div style="text-align: center;">Something went awry! Are you definitely connected to the intertubes' +
					'and logged into Facebook?<a data-role="button" onClick="useFb("fetchpages($(""#page2 ul#facebookGroupList""))")">Try Again</a></div>');
				
				} else {
					var data = response.data;
					data.sort(sort_by('name', false));
					var groupHtml = ""
					var description = ""
					for (i = 0; i < data.length; i++) {
						var item = data[i];
						item.description ? description = '<p class="contentSnippet">' + item.description.replace(/<(?:.|\n)*?>/gm, '') + '</p>' : description = ""						
						groupHtml = groupHtml + '<li data-fbid="'+ item.id + '" data-feedtype="FBK"> <a href="" > <h3>' +
						item.name + '</h3>' + '<p><strong>http://www.facebook.com/' +
						item.id +'</strong></p>'+ description +' </a></li>'
					};
				$(container).html(groupHtml)
				$(container).listview()
				$(container).listview('refresh')

			};
		})
}



function fbkPreviewFetch(previewURI, feedName){
	
	FB.api('/'+previewURI+'/feed',
		{fields : ''},
		function(feedPreviewFetchResults){
			
		var entries = feedPreviewFetchResults.data
		
		if(feedPreviewFetchResults.error){
			console.log(JSON.stringify(feedPreviewFetchResults.error))
			alert("That didn't work! Please give it another go and make sure you're connected to the intertubes!")

		} else {

			var previewPostHtml = ""
			
			$('div#postPreviewFeedSummaryWrapper').html('<div id="postPreviewFeedSummary"><h2><a href="" data-uri="www.facebook.com/'+ previewURI +'">'+
			feedName +'</a></h2></div>')
			
			for(i=0;i<entries.length;i++){
				
				var preFormatDate = entries[i].created_time
				
								
				if(entries[i].contentSnippet != ""){
				previewPostHtml = previewPostHtml + '<li><a href="" data-uri="www.facebook.com/'+ previewURI +'" data-postpreviewid="previewpost' + 
				i + '" data-feedtype="FBK"><h3>' + entries[i].from.name +'</h3><p><strong>' + preFormatDate +
				'</p></strong><p>' +	entries[i].message + '</p></a></li>'
				}
				
				$('ul#previewPostList').html(previewPostHtml)
				
			}
			
		$.mobile.changePage($('#page4'))

		$('#page4addFeedButton').attr("data-feedTitle", feedPreviewFetchResults.feed.title).attr("data-feedUri", previewURI).attr("data-feedType", "FBK")

		$('ul#previewPostList').listview('refresh')
	
	}	
	})
}


function login() {
	FB.login(function(response) {
		if (response.authResponse) {
			console.log('Logged in successfully!');
			fetchgroups()
			switchloginbutton("logout");
		} else {
			alert('Please try logging in again!');
		}
	}, {
		scope : 'email, user_groups, user_likes'
	});
}
		
function logout(){
	FB.logout(function(response) {
		if (response.authResponse) {
			alert('Logged out of Facebook!');
			switchloginbutton("login");
		} else {
			alert('Not logged out - try again!');
		}
	});
}
