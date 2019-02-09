$(document).ready(function() {
	//var savedListingsJSON = sendDataSync("{'onid': '"+sessionStorage.getItem("onid")+"'}", "getSavedListings", "ListingController");
	//console.log(savedListingsJSON);
	var savedListings = [];
	if (savedListingsJSON != null && savedListingsJSON.length > 0) {
		savedListings = jQuery.parseJSON(savedListingsJSON);
	}
	
	savedListings.sort(function(a, b) {
		return (new Date(a.dateSaved).getTime() - new Date(b.dateSaved).getTime());
	});
	var len = savedListings.length - 1;
	console.log(len);
	while (len >= 0) {
		if (len >= 3) {
			$('#my-listings').append(
			'<div class="card-deck listing-row">'		
		    + 	'<div class="card">'
		    +     '<div class="card-body">'
		    +		'<button type="button" class="close removeFromSavedX" aria-label="Close"data-id="'+len+'">'
        	+		  '<span aria-hidden="true">&times;</span>'
        	+	  	'</button>'
		    +      	'<h5 class="card-title">'+savedListings[len].title+'</h5>'
		    +		'<p class="card-text">Listing type: '+savedListings[len].type.charAt(0).toUpperCase()+savedListings[len].type.substring(1)+'</p>'
		    +    	(savedListings[len].imageIDs == '' ? '' : '<img src="worksbythepg.com/osucm-images/'+savedListings[len].type[0]+'/'+savedListings[len].imageIDs[0]+'" class="main-listing-img" alt="listing image">')
		    +      	'<p class="card-text">'+savedListings[len].description+'</p>'
		    +      	'<h5 class="card-title list-price"><strong>$'+buildPrice(savedListings[len].price, savedListings[len].payFrequency)+'</strong></h5>'
		    +      	'<a href="viewlisting.html?listingID='+savedListings[len].listingID+'" class="btn btn-primary listing-action">View Details</a>'
		    +      	'<a href="editlisting.html?listingID='+savedListings[len].listingID+'" class="btn btn-info listing-action">Edit</a>'
		    +  	  '</div>'
		    +  	  '<div class="card-footer text-muted text-center">'
	    	+	  	'Posted on '+buildDatePosted(savedListings[len].datePosted)
	 		+  	  '</div>'
		    +  	'</div>'
		    + 	'<div class="card">'
		    +     '<div class="card-body">'
		    +		'<button type="button" class="close removeFromSavedX" aria-label="Close" data-id="'+(len-1)+'">'
        	+		  '<span aria-hidden="true">&times;</span>'
        	+	  	'</button>'
		    +      	'<h5 class="card-title">'+savedListings[len].title+'</h5>'
		    +		'<p class="card-text">Listing type: '+savedListings[len-1].type.charAt(0).toUpperCase()+savedListings[len-1].type.substring(1)+'</p>'
		    +    	(savedListings[len-1].imageIDs == '' ? '' : '<img src="worksbythepg.com/osucm-images/'+savedListings[len-1].type[0]+'/'+savedListings[len].imageIDs[0]+'" class="main-listing-img" alt="listing image">')
		    +      	'<p class="card-text">'+savedListings[len-1].description+'</p>'
		    +      	'<h5 class="card-title list-price"><strong>$'+buildPrice(savedListings[len-1].price)+(savedListings[len-1].payFrequency == '' ? '' : '/'+savedListings[len-1].payFrequency)+'</strong></h5>'
		    +      	'<a href="viewlisting.html?listingID='+savedListings[len-1].listingID+'" class="btn btn-primary listing-action">View Details</a>'
		    +  	  '</div>'
		    +  	  '<div class="card-footer text-muted text-center">'
	    	+	  	'Posted on '+buildDatePosted(savedListings[len-1].datePosted)
	 		+  	  '</div>'
		    +  	'</div>'
		    + 	'<div class="card">'
		    +     '<div class="card-body">'
		    +		'<button type="button" class="close removeFromSavedX" aria-label="Close" data-id="'+(len-2)+'">'
        	+		  '<span aria-hidden="true">&times;</span>'
        	+	  	'</button>'
		    +      	'<h5 class="card-title">'+savedListings[len-2].title+'</h5>'
		    +		'<p class="card-text">Listing type: '+savedListings[len-2].type.charAt(0).toUpperCase()+savedListings[len-2].type.substring(1)+'</p>'
		    +    	(savedListings[len-2].imageIDs == '' ? '' : '<img src="worksbythepg.com/osucm-images/'+savedListings[len-2].type[0]+'/'+savedListings[len-2].imageIDs[0]+'" class="main-listing-img" alt="listing image">')
		    +      	'<p class="card-text">'+savedListings[len-2].description+'</p>'
		    +      	'<h5 class="card-title list-price"><strong>$'+buildPrice(savedListings[len-2].price)+(savedListings[len-2].payFrequency == '' ? '' : '/'+savedListings[len-2].payFrequency)+'</strong></h5>'
		    +      	'<a href="viewlisting.html?listingID='+savedListings[len-2].listingID+'" class="btn btn-primary listing-action">View Details</a>'
		    +  	  '</div>'
		    +  	  '<div class="card-footer text-muted text-center">'
	    	+	  	'Posted on '+buildDatePosted(savedListings[len-2].datePosted)
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
					      +			'<button type="button" class="close removeFromSavedX" aria-label="Close" data-id="'+(len-2)+'">'
					      +		  	  '<span aria-hidden="true">&times;</span>'
					      +	  		'</button>'
						  +      	'<h5 class="card-title">'+savedListings[len].title+'</h5>'
						  +			'<p class="card-text">Listing type: '+savedListings[len].type.charAt(0).toUpperCase()+savedListings[len].type.substring(1)+'</p>'
						  +    		(savedListings[len].imageIDs == '' ? '' : '<img src="worksbythepg.com/osucm-images/'+savedListings[len].type[0]+'/'+savedListings[len].imageIDs[0]+'" class="main-listing-img" alt="listing image">')
						  +      	'<p class="card-text">'+savedListings[len].description+'</p>'
						  +      	'<h5 class="card-title list-price"><strong>$'+buildPrice(savedListings[len].price)+(savedListings[len].payFrequency == '' ? '' : '/'+savedListings[len].payFrequency)+'</strong></h5>'
						  +      	'<a href="viewlisting.html?listingID='+savedListings[len].listingID+'" class="btn btn-primary listing-action">View Details</a>'
						  +  	  '</div>'
						  +  	  '<div class="card-footer text-muted text-center">'
					      +	  		'Posted on '+buildDatePosted(savedListings[len].datePosted)
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
})