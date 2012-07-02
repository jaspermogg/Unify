var fbinit = function(){
	try {
		FB.init({
			appId : "306316522792748",
			nativeInterface : CDV.FB,
			useCachedDialogs : false
		});
		console.log("fkb-logic.js: FB init executed");
	} catch (e) {
		alert(e);
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
						groupHtml = groupHtml + '<li> <a href="" data-fbid="'+ item.id + 
						'" data-feedtype="FBK"> <h3>' + item.name + '</h3>' + '<p><strong>http://www.facebook.com/' +
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
						groupHtml = groupHtml + '<li> <a href="" data-fbid="'+ item.id + 
						'" data-feedtype="FBK"> <h3>' + item.name + '</h3>' + '<p><strong>http://www.facebook.com/' +
						item.id +'</strong></p>'+ description +' </a></li>'
					};
				$(container).html(groupHtml)
				$(container).listview()
				$(container).listview('refresh')

			};
		})
}
	
	




function feedfetch(event){

alert($(event.target).parent().html())
var fbid = $(clickedheader).attr("data-fbid");

var targetdiv = $('div.feedbar [data-fbid='+ fbid +']')
	
loaderhtml = '<img src="images/indicator.gif" class="ajaxloader" id="loaderimg" fbid='+fbid+' />';

targetdiv.html(loaderhtml);
	
	FB.api('/'+fbid+'/feed',
		{fields : ''},
		function(response){
			if (response.error) {
				if (response.error.code == 104 || response.error.code ==2500){
					var r = confirm("You don't seem to be logged into Facebook. Would you like to login now?")
	
					if(r){
						login()
					} else {
						$(container).html("<p>Something went awry! Are you definitely connected to the intertubes?</p>");
						alert(JSON.stringify(response.error));
					}
				
			} else {
				alert("here!")
				fhtml = ""
				fdata = response.data;
					for ( var i = 0; (i < response.data.length || i < 5); i++) {
					var item = fdata[i];
					urlSnippet = item.id.split('_')[0]
					urlSecondSnippet = item.id.split('_')[1]
					cleanUrlSnippet = urlSnippet.replace(/\"/gm,"")
					cleanUrlSecondSnippet = urlSecondSnippet.replace(/\"/gm,"")
					fhtml += '<li><a data-uid="https://www.facebook.com/groups/' + cleanUrlSnippet + '/post/'+ cleanUrlSecondSnippet +'"><p>' + item.created_time + '</p><h2>' + item.from.name + '</h2><p>' + item.message + '</p></a></li>';
					};
				targetdiv.empty()
				targetdiv.html(fhtml)
				targetdiv.listview()
			}
		}
		}
		)
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
