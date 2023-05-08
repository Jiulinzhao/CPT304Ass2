const getlocationID = {
	"async": true,
	"crossDomain": true,
	"url" : 'https://booking-com.p.rapidapi.com/v1/hotels/locations?name=Kunming&locale=en-gb',
	"method": "GET",
	"headers": {
		'X-RapidAPI-Key': '6c365747c5msh12d4fbd02d04b19p138643jsnb493fc6700f9',
		'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
	}
}
const getHotel_info = {
	"async": true,
	"crossDomain": true,
	"url" : 'https://booking-com.p.rapidapi.com/v2/hotels/search?order_by=popularity&adults_number=2&checkin_date=2023-09-27&filter_by_currency=AED&dest_id=-1913826&locale=en-gb&checkout_date=2023-09-28&units=metric&room_number=1&dest_type=city&include_adjacency=true&children_number=2&page_number=0&children_ages=5%2C0&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1',
	"method": "GET",
	"headers": {
		'X-RapidAPI-Key': '6c365747c5msh12d4fbd02d04b19p138643jsnb493fc6700f9',
		'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
	}
}

var locationId;
var Hotel_info;
const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");


function selectHoliday(startDate, endDate) {
    document.getElementById('checkin').value = startDate;
    document.getElementById('checkout').value = endDate;
    getHotels();
  }
  
function getHotelsWrapper() {
    getHotels();
  }  


  
function getHotels() {
	var city = document.getElementById("city").value.replace(/"/g, "");
	const checkin = new Date(document.getElementById("checkin").value).toISOString().slice(0, 10);
	const checkout = new Date(document.getElementById("checkout").value).toISOString().slice(0, 10);
  
	getlocationID.url = "https://booking-com.p.rapidapi.com/v1/hotels/locations?name=" + city + "&locale=en-gb";
  
	$.ajax(getlocationID).done(function(response) {
	  locationId = JSON.stringify(response[0].dest_id).replace(/"/g, "");
	  console.log(locationId);
  
	  getHotel_info.url = 'https://booking-com.p.rapidapi.com/v2/hotels/search?order_by=popularity&adults_number=2&checkin_date=' + checkin + '&filter_by_currency=AED&dest_id=' + locationId + '&locale=en-gb&checkout_date=' + checkout + '&units=metric&room_number=1&dest_type=city&include_adjacency=true&children_number=2&page_number=0&children_ages=5%2C0&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1';
  
	  $.ajax(getHotel_info).done(function(response) {
		// Loop through the hotel results and display only the relevant information
		let hotelList = '';
		for (let hotel of response.results) {
		  hotelList += 'Hotel Name: ' + hotel.name + '<br>';
		  hotelList += 'Price: ' + hotel.priceBreakdown.grossPrice.currency + ' ' + hotel.priceBreakdown.grossPrice.value.toFixed(2) + '<br>';
		  hotelList += 'Review Score: ' + hotel.reviewScore + ' (' + hotel.reviewScoreWord + ')<br>';
			hotelList += 'Latitude: ' + hotel.latitude + '<br>';
			hotelList += 'Longitude: ' + hotel.longitude + '<br>';
		  hotelList += 'Check-in: ' + hotel.checkin.fromTime + ' - ' + hotel.checkin.untilTime + '<br>';
		  hotelList += 'Check-out: ' + hotel.checkout.fromTime + ' - ' + hotel.checkout.untilTime + '<br>';
		  hotelList += '<br>';
		}
  
		document.getElementById("hotellist").innerHTML = "Hotel List:<br>" + hotelList;
		return response.results;
	  });
  
	  document.getElementById("hotellist").innerHTML = "Hotel List:<br>" + locationId;
	  return locationId;
	});
  } 