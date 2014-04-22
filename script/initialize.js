function initialize() {
	var mapOptions = {
	  center: new google.maps.LatLng(59.346630, 18.072056),
	  zoom: 8
	};
	var map = new google.maps.Map(document.getElementById("map-canvas"),
	    mapOptions);
}

function findMe(){

  if (navigator.geolocation){
  	console.log(navigator.geolocation);
    navigator.geolocation.getCurrentPosition(showPosition);
    }
  else{alert("Geolocation is not supported by this browser.");
  	}
  
  	function showPosition(position){
  		console.log(position);
  		$("#testing").html(position.coords.latitude);
  		
  		/*
	  		var ME_LatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	  		map.panTo(ME_LatLng);
	  	*/
	}
};