document.addEventListener('deviceready', function(){
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
		}, false);

		function fetchgroups() {
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
						d = "<img src="+item.picture+"/>";
						data.html(d);
						$('#feed' + (i) + 'bar').attr("fbid", item.id).attr("feedtype","fbk").find('.ui-btn-text').html(item.name);
					};

				firstfetch = $('#feed0bar').attr("fbid");
				FB.api('/'+firstfetch+'/feed',
				{fields : ''},
					function(response){
					if (response.error) {
						alert(JSON.stringify(response.error));
					} else {
						fdata = response.data;
							for ( var i = 0; i < fdata.length; i++) {
							var item = fdata[i];
							fhtml = '<div>' + item.created_time + '<br />' + item.from.name + '<br />' + item.message + '</div>';
							$('#feed0').append(fhtml);
							};
					}					
				});
				};
			});
		}


	function feedfetch(event){
		
	console.log("header clicked!")
	var clickedheader = event.target
	var parentid = $(clickedheader).attr("class");
	
	// how do we know where to put the returned information? Guess perhaps look for only div child of the parent of this one? hmm
	
	alert(parentid)
	var hdrvisiblestatus = $().css("display")
	alert(hdrvisiblestatus)
	
	if ("x" == "none"){
		var fetch = $(clickedheader).attr("fbid");
		FB.api('/'+fetch+'/feed',
			{fields : ''},
			function(response){
				if (response.error) {
					alert(JSON.stringify(response.error));
				} else {
					fdata = response.data;
						for ( var i = 0; i < fdata.length; i++) {
						var item = fdata[i];
						fhtml = '<div>' + item.created_time + '<br />' + item.from.name + '<br />' + item.message + '</div>';
						
						alert($(clickedheader).html());
						};
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