 		var init = function(){
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
			
			containerhtml = $('#accordioncontainer').html();
			
			if (containerhtml == ""){
				loaderhtml = '<img src="css/images/indicator.gif" class="ajaxloader" />';
				$('#accordioncontainer').html(loaderhtml);
			}
			
			window.setTimeout(fetchgroups, 1000);
			
		}

		function fetchgroups() {
			
			containerhtml = $('#accordioncontainer').html();
			
			if (containerhtml == ""){
				loaderhtml = '<img src="css/images/indicator.gif" class="ajaxloader" />';
				$('#accordioncontainer').html(loaderhtml);
			}
			
			FB.api('/me/groups', {
				fields : 'id, name, picture'
			}, function(response) {
				if (response.error) {
					response.error.code = 2500 ? alert("Please log into Facebook") : alert(JSON.stringify(response.error));
				} else {
					fdata = response.data;
					fdata.sort(sort_by('name', false));
					console.log("fdata: " + fdata);
					populateBars(fdata.length);
					for ( var i = 0; i < fdata.length; i++) {
						var data = $('#feed' + (i));
						data.empty();
						var item = fdata[i];
						$('#feed' + (i) + 'bar').find('*').attr("fbid", item.id);
						$('#feed' + (i) + 'bar').attr("fbid", item.id).attr("feedtype","fbk").find('.ui-btn-text').html(item.name);
						$('#feed' + (i) + 'bar span:first').prepend('<img src='+item.picture+' class="hdricon" width="18px" fbid='+item.id+' />');
						$('#accordion a:first').trigger('click');
					};

				// firstfetch = $('#feed0bar').attr("fbid");
				// FB.api('/'+firstfetch+'/feed',
				// {fields : ''},
					// function(response){
					// if (response.error) {
						// alert(JSON.stringify(response.error));
					// } else {
						// fdata = response.data;
							// for ( var i = 0; i < fdata.length; i++) {
							// var item = fdata[i];
							// fhtml = '<div>' + item.created_time + '<br />' + item.from.name + '<br />' + item.message + '</div>';
							// $('#feed0').append(fhtml);
							// };
					// }					
				// });
				};
			});
		}


	function feedfetch(event){
	var clickedheader = event.target
	var fbid = $(clickedheader).attr("fbid");
	var hdrcollapsed = $('.feedbar[fbid='+fbid+']').hasClass('ui-collapsible-collapsed')
	var targetdiv = $('.feedbar[fbid='+fbid+']').find('div .feedcontent')
	
	if (hdrcollapsed == true){
		loaderhtml = '<img src="css/images/indicator.gif" class="ajaxloader" fbid='+fbid+' />';
		targetdiv.html(loaderhtml);
		FB.api('/'+fbid+'/feed',
			{fields : ''},
			function(response){
				if (response.error) {
					targetdiv.html("<p>Something went awry! Please try to load this feed again by collapsing this section and expanding it again.</p>");
					alert(JSON.stringify(response.error));
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
			FB.login(function(response) {
				if (response.authResponse) {
					alert('Logged in successfully!');
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
					alert('logged out');
				} else {
					alert('not logged out');
				}
				});
			}
		
		function revoke(){
						
		}