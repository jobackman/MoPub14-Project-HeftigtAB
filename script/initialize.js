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
		

		
		/*var read_latitude = position.coords.latitude.toString();
		var check_latitude = read_latitude.split(".");
		var check_latitude_decimals = check_latitude[1].substring(0,4);
		var check_lat = check_latitude[0]+"."+check_latitude_decimals;
		
		var read_longitude = position.coords.longitude.toString();
		var check_longitude = read_longitude.split(".");
		var check_longitude_decimals = check_longitude[1].substring(0,4);
		var check_lng = check_longitude[0]+"."+check_longitude_decimals;
		//alert(check_lng); */
		
		var dataObject = {
			"lat_coords" : position.coords.latitude,
			"lng_coords" : position.coords.longitude,
			/*"lat_check_coords" : check_lat,
			"lng_check_coords" : check_lng*/
		};
		
		search(dataObject);
		
		
		function search(dataObject){
			//,"lng_check_coords" : dataObject.lat_check_coords}
		/*	helper.searchDocuments(
				//Ska även kunna jämföra longitude
				{"lat_check_coords" : dataObject.lat_check_coords}, "benches", function(resp){
					//console.log(resp.outputData[0].lat_check_coords);
					if(resp.callStatus && resp.outputData==0){
						add(dataObject);
					}else{
						alert("Finns redan en bank har.");
					};	
				}
				); */
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