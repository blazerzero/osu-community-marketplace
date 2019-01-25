$(document).ready(function() {
	var len = 4;
	while (len > 0) {
		if (len >= 3) {
			$('#my-listings').append(
			'<div class="row listing-row">'		
		    + '<div class="col-sm-4">'
		    +   '<div class="card">'
		    +     '<div class="card-body">'
		    +		'<button type="button" class="close" aria-label="Close" id="closeNotifyX" data-id="'+len+'">'
        	+		  '<span aria-hidden="true">&times;</span>'
        	+	  	'</button>'
		    +      	'<h5 class="card-title">Listing Title</h5>'
		    +    	'<img src="./splash/corvallis.jpg" class="main-listing-img" alt="listing image">'
		    +      	'<p class="card-text">Listing description</p>'
		    +      	'<h5 class="card-title list-price"><strong>$100</strong></h5>'
		    +      	'<a href="viewlisting.html?listingID='+len+'" class="btn btn-primary">View Listing</a>'
		    +  	  '</div>'
		    +  	  '<div class="card-footer text-muted text-center">'
	    	+	  	'Posted 2 days ago'
	 		+  	  '</div>'
		    +  	'</div>'
		  	+ '</div>'
		  	+ '<div class="col-sm-4">'
		    + 	'<div class="card">'
		    +     '<div class="card-body">'
		    +		'<button type="button" class="close deleteMyListingX" aria-label="Close" data-id="'+(len-1)+'">'
        	+		  '<span aria-hidden="true">&times;</span>'
        	+	  	'</button>'
		    +      	'<h5 class="card-title">Listing Title</h5>'
		    +    	'<img src="./splash/corvallis.jpg" class="main-listing-img" alt="listing image">'
		    +      	'<p class="card-text">Listing description</p>'
		    +      	'<h5 class="card-title list-price"><strong>$100</strong></h5>'
		    +      	'<a href="viewlisting.html?listingID='+(len-1)+'" class="btn btn-primary">View Listing</a>'
		    +  	  '</div>'
		    +  	  '<div class="card-footer text-muted text-center">'
	    	+	  	'Posted 2 days ago'
	 		+  	  '</div>'
		    +  	'</div>'
		  	+ '</div>'
		  	+ '<div class="col-sm-4">'
		    + 	'<div class="card">'
		    +     '<div class="card-body">'
		    +		'<button type="button" class="close deleteMyListingX" aria-label="Close" data-id="'+(len-2)+'">'
        	+		  '<span aria-hidden="true">&times;</span>'
        	+	  	'</button>'
		    +      	'<h5 class="card-title">Listing Title</h5>'
		    +    	'<img src="./splash/corvallis.jpg" class="main-listing-img" alt="listing image">'
		    +      	'<p class="card-text">Listing description</p>'
		    +      	'<h5 class="card-title list-price"><strong>$100</strong></h5>'
		    +      	'<a href="viewlisting.html?listingID='+(len-2)+'" class="btn btn-primary">View Listing</a>'
		    +  	  '</div>'
		    +  	  '<div class="card-footer text-muted text-center">'
	    	+	  	'Posted 2 days ago'
	 		+  	  '</div>'
		    +  	'</div>'
		  	+ '</div>'
		  + '</div>');
		  	len -= 3;
		}
		else {
			while (len > 0) {
		    	$('#my-listings').append(
				'<div class="row listing-row">'		
			    + '<div class="col-sm-4">'
			    +   '<div class="card">'
			    +     '<div class="card-body">'
			    +		'<button type="button" class="close deleteMyListingX" aria-label="Close" data-id="'+len+'">'
	        	+		  '<span aria-hidden="true">&times;</span>'
	        	+	  	'</button>'
			    +      	'<h5 class="card-title">Listing Title</h5>'
			    +    	'<img src="./splash/corvallis.jpg" class="main-listing-img" alt="listing image"><br/>'
			    +      	'<p class="card-text">Listing description</p>'
			    +      	'<h5 class="card-title list-price"><strong>$100</strong></h5>'
			    +      	'<a href="viewlisting.html?listingID='+len+'" class="btn btn-primary">View Listing</a>'
			    +  	  '</div>'
			    +  	  '<div class="card-footer text-muted text-center">'
		    	+	  	'Posted 2 days ago'
		 		+  	  '</div>'
			    +  	'</div>'
			  	+ '</div>');
		    	len--;
			}
		    $('#listings').append('</div>');
	    }
	}
});