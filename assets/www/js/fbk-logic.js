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

		function fbafterinit(isloggedin){
			
			var containerhtml = $('#page1accordioncontainer').html();
			
			if (containerhtml == ""){
				loaderhtml = '<img src="css/images/indicator.gif" id="loaderimg" class="ajaxloader" />';
				$('#page1accordioncontainer').html(loaderhtml);
			}
			
			if (isloggedin){
			window.setTimeout(fetchgroups($('#page1accordioncontainer')), 2000);
			} else {
			login();
			}
		}

		function fetchgroups(container) {
			containerhtml = $(container).html();
			if (containerhtml == ""){
				loaderhtml = '<img src="css/images/indicator.gif" id="loaderimg" class="ajaxloader" />';
				$(container).html(loaderhtml);
			}
			
			FB.api('/me/groups', {
				fields : 'id, name, picture'
			}, function(response) {
				if (response.error) {
					
					if (response.error.code ==2500){
						page1init()						
										
					} else if (response.error.code == 104) {
						var r = confirm("You don't seem to be logged into Facebook. Would you like to login now? [A]")
						r==true ? login() : $('#loaderimg').remove();					
					} else {
					
					targetdiv.html("<p>Something went awry! Please try to load this feed again by collapsing this section and expanding it again. Are you definitely connected to the intertubes?</p>");
					alert(JSON.stringify(response.error));
					
					}
				} else {
					fdata = response.data;
					fdata.sort(sort_by('name', false));
					console.log("fdata: " + fdata);
					var pageid = populateBars(fdata.length);
					
					for ( var i = 0; i < fdata.length; i++) {
						var data = $('#'+pageid+'feed' + (i));
						data.empty();
						var item = fdata[i];
						$('#'+pageid+'feed' + (i) + 'bar').find('*').attr("data-fbid", item.id);
						$('#'+pageid+'feed' + (i) + 'bar').attr("data-fbid", item.id).attr("feedtype","fbk").find('.ui-btn-text').html(item.name);
						$('#'+pageid+'feed' + (i) + 'bar span:first').prepend('<img src='+item.picture+' class="hdricon" width="18px" data-fbid='+item.id+' />');
					};
					
				};
			});
		}


	function feedfetch(event){
	var clickedheader = event.target
	var fbid = $(clickedheader).attr("data-fbid");
	var hdrcollapsed = $('div.feedbar[data-fbid='+fbid+']').hasClass('ui-collapsible-collapsed')
	var targetdiv = $('div.feedbar[data-fbid='+fbid+']').find('div.feedcontent')
	
	if (hdrcollapsed == true){
		loaderhtml = '<img src="css/images/indicator.gif" class="ajaxloader" id="loaderimg" fbid='+fbid+' />';
		targetdiv.html(loaderhtml);
		FB.api('/'+fbid+'/feed',
			{fields : ''},
			function(response){
				if (response.error) {
					if (response.error.code == 104 || response.error.code ==2500){
						var r = confirm("You don't seem to be logged into Facebook. Would you like to login now? [B]")
						r==true ? login() : $('#loaderimg').remove();
						
					} else {
					
					targetdiv.html("<p>Something went awry! Please try to load this feed again by collapsing this section and expanding it again. Are you definitely connected to the intertubes?</p>");
					alert(JSON.stringify(response.error));
					
					}
					
				} else {
					fhtml = ""
					fdata = response.data;
						for ( var i = 0; i < fdata.length; i++) {
						var item = fdata[i];
						fhtml += '<div>' + item.created_time + '<br />' + item.from.name + '<br />' + item.message + '</div>';
						};
					targetdiv.empty()
					targetdiv.html(fhtml)					
				}
			})
		}
	}

		function login() {
			//Todo - check if already logged in and if so, tell user.
			
			FB.login(function(response) {
				if (response.authResponse) {
					console.log('Logged in successfully!');
					fetchgroups()
					switchloginbutton("logout");
				} else {
					alert('Please try logging in again!');
				}
			}, {
				scope : 'email, user_groups'
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
		
	function fbkisloggedin(){
		try{
				var sessionstring = localStorage.getItem("cdv_fb_session");
			} catch (e) {
				alert(e);
				init(false);
			}
			
			var sessionobject = JSON.parse(sessionstring)
			
			if (sessionobject && sessionobject.expiresIn > 0){
				return true;
			} else {
				return false;
			}
	}

	function switchloginbutton(direction){
		switch(direction){
		case "logout": 	$('#page1fbkloginoutbutton').attr("onclick", "logout()");
						$('#page1fbkloginoutbutton span').text("Logout");
						break;
		case "login":	$('#page1fbkloginoutbutton').attr("onclick", "login()");
						$('#page1fbkloginoutbutton span').text("Login");
						break;
		default:		alert("Switchloginbutton function called with an invalid parameter. Please report this bug!")
		}
	}
