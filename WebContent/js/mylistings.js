$(document).ready(function() {
	
	/*var myListingsJSON = sendDataSync("{'onid': '"+sessionStorage.getItem("onid")+"'}", "getMyListings", "ListingController");
	var myListings = jQuery.parseJSON(escapeJSON(myListingsJSON));
	var len = myListings.length - 1;*/
	var len = 4;
	while (len > 0) {
		if (len >= 3) {
			$('#my-listings').append(
			'<div class="card-deck listing-row">'		
		    + 	'<div class="card">'
		    +     '<div class="card-body">'
		    /*+		'<button type="button" class="close" aria-label="Close" id="closeNotifyX" data-id="'+len+'">'
        	+		  '<span aria-hidden="true">&times;</span>'
        	+	  	'</button>'*/
		    +      	'<h5 class="card-title">Listing Title</h5>'
		    +    	'<img src="./splash/corvallis.jpg" class="main-listing-img" alt="listing image">'
		    +      	'<p class="card-text">Listing description</p>'
		    +      	'<h5 class="card-title list-price"><strong>$100</strong></h5>'
		    +      	'<a href="viewlisting.html?listingID='+len+'" class="btn btn-primary">View Listing</a>'
		    +  	  '</div>'
		    +  	  '<div class="card-footer text-muted text-center">'
	    	+	  	'Posted on 1/26/19'
	 		+  	  '</div>'
		    +  	'</div>'
		    + 	'<div class="card">'
		    +     '<div class="card-body">'
		    /*+		'<button type="button" class="close deleteMyListingX" aria-label="Close" data-id="'+(len-1)+'">'
        	+		  '<span aria-hidden="true">&times;</span>'
        	+	  	'</button>'*/
		    +      	'<h5 class="card-title">Listing Title</h5>'
		    +    	'<img src="./splash/corvallis.jpg" class="main-listing-img" alt="listing image">'
		    +      	'<p class="card-text">Listing description</p>'
		    +      	'<h5 class="card-title list-price"><strong>$100</strong></h5>'
		    +      	'<a href="viewlisting.html?listingID='+(len-1)+'" class="btn btn-primary">View Listing</a>'
		    +  	  '</div>'
		    +  	  '<div class="card-footer text-muted text-center">'
	    	+	  	'Posted on 1/26/19'
	 		+  	  '</div>'
		    +  	'</div>'
		    + 	'<div class="card">'
		    +     '<div class="card-body">'
		    /*+		'<button type="button" class="close deleteMyListingX" aria-label="Close" data-id="'+(len-2)+'">'
        	+		  '<span aria-hidden="true">&times;</span>'
        	+	  	'</button>'*/
		    +      	'<h5 class="card-title">Listing Title</h5>'
		    +    	'<img src="./splash/corvallis.jpg" class="main-listing-img" alt="listing image">'
		    +      	'<p class="card-text">Listing description</p>'
		    +      	'<h5 class="card-title list-price"><strong>$100</strong></h5>'
		    +      	'<a href="viewlisting.html?listingID='+(len-2)+'" class="btn btn-primary">View Listing</a>'
		    +  	  '</div>'
		    +  	  '<div class="card-footer text-muted text-center">'
	    	+	  	'Posted on 1/26/19'
	 		+  	  '</div>'
		    +  	'</div>'
		  	+ '</div><br/>');
		  	len -= 3;
		}
		else {
			var html = '';
			html += '<div class="card-deck listing-row">';
			for (i = 0; i < 3; i++) {
				if (len > 0) {
					html += '<div class="card">'
					      +     '<div class="card-body">'
					      +      	'<h5 class="card-title">Listing Title</h5>'
					      +    		'<img src="./splash/portland.jpg" class="main-listing-img" alt="MU">'
					      +      	'<p class="card-text">Listing description</p>'
					      +      	'<h5 class="card-title list-price"><strong>$100</strong></h5>'
					      +      	'<a href="viewlisting.html?listingID='+len+'" class="btn btn-primary">View Listing</a>'
					      +  	  '</div>'
					      +  	  '<div class="card-footer text-muted text-center">'
				      	  +	  	'Posted 2 days ago'
				 		  +  	  '</div>'
					      +  	'</div>';
					len--;
				}
				else {
					html += '<div class="card" style="opacity: 0" disabled></div>';
				}
			}
			html += '</div>';
		    $('#my-listings').append(html);
	    }
	}
});

function buildPrice(listingPrice) {
	console.log(listingPrice);
	var afterDecimal = "";
	var tempPrice = listingPrice.toString();
	if (tempPrice.includes('.')) {
		afterDecimal = tempPrice.split('.')[1];
		if (afterDecimal.length == 1) tempPrice += '0';
	}
	else {
		tempPrice += '.00';
	}
	return tempPrice;
}

function buildDescription(listingDescription) {
	var tempDesc = listingDescription;
	return (tempDesc.length > 128 ? tempDesc.substring(0,128)+'...' : tempDesc);
}

function escapeJSON(jString) {
	return jString.replace(/\n/g, "<br/>").replace(/\r/g, "<br/>").replace(/\t/g, "<br/>");
}