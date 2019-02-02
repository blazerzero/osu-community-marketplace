$(document).ready(function() {
	
	var myListingsJSON = sendDataSync("{'onid': '"+sessionStorage.getItem("onid")+"'}", "getMyListings", "ListingController");
	//console.log(myListingsJSON);
	var myListings = [];
	if (myListingsJSON != null & myListingsJSON.length > 0) {
		myListings = jQuery.parseJSON(myListingsJSON);
	}
	
	myListings.sort(function(a, b) {
		return (new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime());
	});
	
	var len = myListings.length - 1;
	console.log(len);
	//var len = 4;
	while (len >= 0) {
		if (len >= 3) {
			$('#my-listings').append(
			'<div class="card-deck listing-row">'		
		    + 	'<div class="card">'
		    +     '<div class="card-body">'
		    /*+		'<button type="button" class="close" aria-label="Close" id="closeNotifyX" data-id="'+len+'">'
        	+		  '<span aria-hidden="true">&times;</span>'
        	+	  	'</button>'*/
		    +      	'<h5 class="card-title">'+myListings[len].title+'</h5>'
		    +    	(myListings[len].imageIDs == '' ? '' : '<img src="worksbythepg.com/osucm-images/'+myListings[len].type[0]+'/'+myListings[len].imageIDs[0]+'" class="main-listing-img" alt="listing image">')
		    +      	'<p class="card-text">'+myListings[len].description+'</p>'
		    +      	'<h5 class="card-title list-price"><strong>$'+buildPrice(myListings[len].price, myListings[len].payFrequency)+'</strong></h5>'
		    +      	'<a href="viewlisting.html?listingID='+myListings[len].listingID+'" class="btn btn-primary">View Listing</a>'
		    +  	  '</div>'
		    +  	  '<div class="card-footer text-muted text-center">'
	    	+	  	'Posted on '+buildDatePosted(myListings[len].datePosted)
	 		+  	  '</div>'
		    +  	'</div>'
		    + 	'<div class="card">'
		    +     '<div class="card-body">'
		    /*+		'<button type="button" class="close deleteMyListingX" aria-label="Close" data-id="'+(len-1)+'">'
        	+		  '<span aria-hidden="true">&times;</span>'
        	+	  	'</button>'*/
		    +      	'<h5 class="card-title">'+myListings[len].title+'</h5>'
		    +    	(myListings[len-1].imageIDs == '' ? '' : '<img src="worksbythepg.com/osucm-images/'+myListings[len-1].type[0]+'/'+myListings[len].imageIDs[0]+'" class="main-listing-img" alt="listing image">')
		    +      	'<p class="card-text">'+myListings[len-1].description+'</p>'
		    +      	'<h5 class="card-title list-price"><strong>$'+buildPrice(myListings[len-1].price)+(myListings[len-1].payFrequency == '' ? '' : '/'+myListings[len-1].payFrequency)+'</strong></h5>'
		    +      	'<a href="viewlisting.html?listingID='+myListings[len-1].listingID+'" class="btn btn-primary">View Listing</a>'
		    +  	  '</div>'
		    +  	  '<div class="card-footer text-muted text-center">'
	    	+	  	'Posted on '+buildDatePosted(myListings[len-1].datePosted)
	 		+  	  '</div>'
		    +  	'</div>'
		    + 	'<div class="card">'
		    +     '<div class="card-body">'
		    /*+		'<button type="button" class="close deleteMyListingX" aria-label="Close" data-id="'+(len-2)+'">'
        	+		  '<span aria-hidden="true">&times;</span>'
        	+	  	'</button>'*/
		    +      	'<h5 class="card-title">'+myListings[len-2].title+'</h5>'
		    +    	(myListings[len-2].imageIDs == '' ? '' : '<img src="worksbythepg.com/osucm-images/'+myListings[len-2].type[0]+'/'+myListings[len-2].imageIDs[0]+'" class="main-listing-img" alt="listing image">')
		    +      	'<p class="card-text">'+myListings[len-2].description+'</p>'
		    +      	'<h5 class="card-title list-price"><strong>$'+buildPrice(myListings[len-2].price)+(myListings[len-2].payFrequency == '' ? '' : '/'+myListings[len-2].payFrequency)+'</strong></h5>'
		    +      	'<a href="viewlisting.html?listingID='+myListings[len-2].listingID+'" class="btn btn-primary">View Listing</a>'
		    +  	  '</div>'
		    +  	  '<div class="card-footer text-muted text-center">'
	    	+	  	'Posted on '+buildDatePosted(myListings[len-2].datePosted)
	 		+  	  '</div>'
		    +  	'</div>'
		  	+ '</div><br/>');
		  	len -= 3;
		}
		else {
			console.log("Less than 3 listings left to display");
			var html = '';
			html += '<div class="card-deck listing-row">';
			for (i = 0; i < 3; i++) {
				if (len >= 0) {
					html += '<div class="card">'
					      +     '<div class="card-body">'
					      +      	'<h5 class="card-title">'+myListings[len].title+'</h5>'
						  +    		(myListings[len].imageIDs == '' ? '' : '<img src="worksbythepg.com/osucm-images/'+myListings[len].type[0]+'/'+myListings[len].imageIDs[0]+'" class="main-listing-img" alt="listing image">')
						  +      	'<p class="card-text">'+myListings[len].description+'</p>'
						  +      	'<h5 class="card-title list-price"><strong>$'+buildPrice(myListings[len].price)+(myListings[len].payFrequency == '' ? '' : '/'+myListings[len].payFrequency)+'</strong></h5>'
						  +      	'<a href="viewlisting.html?listingID='+myListings[len].listingID+'" class="btn btn-primary">View Listing</a>'
						  +  	  '</div>'
						  +  	  '<div class="card-footer text-muted text-center">'
					      +	  		'Posted on '+buildDatePosted(myListings[len].datePosted)
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