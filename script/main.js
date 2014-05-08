function initialize() {
	var mapOptions = {
	  center: new google.maps.LatLng(59.346630, 18.072056),
	  zoom: 8
	};
	var map = new google.maps.Map(document.getElementById("map-canvas"),
	    mapOptions);
	

}




function addBench(){

  if (navigator.geolocation){
  	//console.log(navigator.geolocation);
	
    navigator.geolocation.getCurrentPosition(showPosition);
    }
  else{
	alert("Geolocation is not supported by this browser.");
  	}
  
  	function showPosition(position){
 	
  		var helper = new CBHelper("benchpress", "37ff338f77e39490bad736e64bdd5839", new GenericHelper());
		helper.setPassword(hex_md5("mopub_14"));
		

		
		var dataObject = {
			"lat_coords" : position.coords.latitude,
			"lng_coords" : position.coords.longitude
		};
		
		search(dataObject);
		
		
		function search(dataObject){

				var user = new google.maps.LatLng(dataObject.lat_coords, dataObject.lng_coords);
				var rad = function(x) {
				  return x * Math.PI / 180;
				};
				
				var getDistance = function(p1, p2) {
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
						var k=0; // En variabel som ökar vid varje "distanserad bänk"
						for (var i=0; i<resp.outputData.length; i++){
								var bench = new google.maps.LatLng(resp.outputData[i].lat_coords, resp.outputData[i].lng_coords);
								
								if (getDistance(user,bench)>30){ //Ska vi köra tio meter?
									k=k+1;
								}
						}
						if(k == resp.outputData.length){
							add(dataObject);
						}
						else{
							alert("Bänken har INTE lagts till pga att det finns en redan inlagd bänk i vår databas")
						}
					});
				
				};
		function add(dataObject){
			helper.insertDocument("benches", dataObject, null, function(resp) {
				alert("Banken finns nu i var databas. Tack sa mycket!");
			});
			};  
	}
};

function rotate(degrees) {
	$("#arrow").css({ 
		'-webkit-transform': 'rotate('+degrees+'deg)',
		'-moz-transform': 'rotate('+degrees+'deg)',
		'-o-transform': 'rotate('+degrees+'deg)',
		'-ms-transform': 'rotate('+degrees+'deg)',
		'transform': 'rotate('+degrees+'deg)' 
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
				var dist = getDistanceBetween(my_LatLng, bench_LatLng);
				console.log(dist);
				$("#distance").html(dist);
				rotate(dist);

			}}
		);
	}	
}