$(document).ready(function() {
	var len = 6;
	while (len > 0) {
		if (len >= 2) {
			$('#saved-listings').append(
			'<div class="row listing-row">'		
		    + '<div class="col-sm-6">'
		    +   '<div class="card">'
		    +     '<div class="card-body">'
		    +		'<button type="button" class="close" aria-label="Close" id="closeNotifyX">'
        	+		  '<span aria-hidden="true">&times;</span>'
        	+	  	'</button>'
		    +      	'<h5 class="card-title">Special title treatment</h5>'
		    +      	'<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>'
		    +      	'<h5 class="card-title list-price"><strong>$100</strong></h5>'
		    +      	'<a href="viewlisting.html?listingID='+len+'" class="btn btn-primary">View Listing</a>'
		    +  	  '</div>'
		    +  	  '<div class="card-footer text-muted text-center">'
	    	+	  	'Posted 2 days ago'
	 		+  	  '</div>'
		    +  	'</div>'
		  	+ '</div>'
		  	+ '<div class="col-sm-6">'
		    + 	'<div class="card">'
		    +     '<div class="card-body">'
		    +		'<button type="button" class="close" aria-label="Close" id="closeNotifyX">'
        	+		  '<span aria-hidden="true">&times;</span>'
        	+	  	'</button>'
		    +      	'<h5 class="card-title">Special title treatment</h5>'
		    +      	'<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>'
		    +      	'<h5 class="card-title list-price"><strong>$100</strong></h5>'
		    +      	'<a href="viewlisting.html?listingID='+(len-1)+'" class="btn btn-primary">View Listing</a>'
		    +  	  '</div>'
		    +  	  '<div class="card-footer text-muted text-center">'
	    	+	  	'Posted 2 days ago'
	 		+  	  '</div>'
		    +  	'</div>'
		  	+ '</div>'
		  + '</div>');
		  	len -= 2;
		}
		else if (len >= 1) {
	    	$('#saved-listings').append(
			'<div class="row listing-row">'		
		    + '<div class="col-sm-6">'
		    +   '<div class="card">'
		    +     '<div class="card-body">'
		    +		'<button type="button" class="close" aria-label="Close" id="closeNotifyX">'
        	+		  '<span aria-hidden="true">&times;</span>'
        	+	  	'</button>'
		    +      	'<h5 class="card-title">Special title treatment</h5>'
		    +      	'<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>'
		    +      	'<h5 class="card-title list-price"><strong>$100</strong></h5>'
		    +      	'<a href="viewlisting.html?listingID='+len+'" class="btn btn-primary">View Listing</a>'
		    +  	  '</div>'
		    +  	  '<div class="card-footer text-muted text-center">'
	    	+	  	'Posted 2 days ago'
	 		+  	  '</div>'
		    +  	'</div>'
		  	+ '</div>'
	      + '</div>');
	    	len--;
	    }
	}
})