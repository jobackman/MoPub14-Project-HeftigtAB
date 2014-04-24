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
  	//console.log(navigator.geolocation);
    navigator.geolocation.getCurrentPosition(showPosition);
    }
  else{
	alert("Geolocation is not supported by this browser.");
  	}
  
  	function showPosition(position){
  		//console.log(position);
  		//$("#testing").html(position.coords.latitude);
  		var helper = new CBHelper("benchpress", "37ff338f77e39490bad736e64bdd5839", new GenericHelper());
		helper.setPassword(hex_md5("mopub_14"));
		
		var read_latitude = position.coords.latitude.toString();
		var check_latitude = read_latitude.split(".");
		var check_latitude_decimals = check_latitude[1].substring(0,3);
		var check_lat = check_latitude[0]+"."+check_latitude_decimals;
		
		var read_longitude = position.coords.longitude.toString();
		var check_longitude = read_longitude.split(".");
		var check_longitude_decimals = check_longitude[1].substring(0,3);
		var check_lng = check_longitude[0]+"."+check_longitude_decimals;
		//alert(check_lng); 
		
		var dataObject1 = {
			"lat_coords" : position.coords.latitude,
			"lng_coords" : position.coords.longitude,
			"lat_check_coords" : check_lat,
			"lng_check_coords" : check_lng
		};
		search(dataObject1);
		
		
		function search(dataObject){
			//,"lng_check_coords" : dataObject.lat_check_coords}
			helper.searchDocuments(
				
				//Ska även kunna jämföra longitude
				{"lat_check_coords" : dataObject.lat_check_coords}, "benches", function(resp){
					alert(isEmpty(resp.outputData));
					if(resp.callStatus && resp.outputData==0){
						add(dataObject);
					};	
				}
				);
				};
		function add(dataObject){
			helper.insertDocument("benches", dataObject, null, function(resp) {
				//alert("klar");
			});
			}; 
			function isEmpty(str) {
			    return (!str || 0 === str.length);
			}      
	}
};