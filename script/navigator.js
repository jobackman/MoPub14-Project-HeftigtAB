function rotate() {
	$("#arrow").css({ 
		'-webkit-transform': 'rotate(120deg)',
		'-moz-transform': 'rotate(120deg)',
		'-o-transform': 'rotate(120deg)',
		'-ms-transform': 'rotate(120deg)',
		'transform': 'rotate(120deg)' 
		});
}





function getDistance(){
	var helper = new CBHelper("benchpress", "37ff338f77e39490bad736e64bdd5839", new GenericHelper());
	helper.setPassword(hex_md5("mopub_14"));
	
	if (navigator.geolocation){
    	navigator.geolocation.getCurrentPosition(showPosition);
    }
  	else{
		alert("Geolocation is not supported by this browser.");
  	}

  	function showPosition(position){
		var my_lat=position.coords.latitude;
		var my_lng=position.coords.longitude;
		var my_LatLng = new google.maps.LatLng(my_lat, my_lng);
		
		
		var rad = function(x) {
		  return x * Math.PI / 180;
		};

		var getDistanceBetween = function(p1, p2) {
		  var R = 6378137; // Earth’s mean radius in meter
		  var dLat = rad(p2.lat() - p1.lat());
		  var dLong = rad(p2.lng() - p1.lng());
		  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		    Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
		    Math.sin(dLong / 2) * Math.sin(dLong / 2);
		  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		  var d = R * c;
		  return d; // returns the distance in meter
		};
		
		helper.searchDocuments(
			null, "benches", function(resp){
			for (var i = 0; i < resp.outputData.length; i++){
				var bench_LatLng = new google.maps.LatLng(resp.outputData[i].lat_coords, resp.outputData[i].lng_coords);
				console.log(getDistanceBetween(my_LatLng, bench_LatLng));

			}}
		);
	}	
}