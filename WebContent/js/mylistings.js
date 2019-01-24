$(document).ready(function() {
	var len = 4;
	while (len > 0) {
		if (len >= 3) {
			$('#my-listings').append(
			'<div class="row listing-row">'		
		    + '<div class="col-sm-4">'
		    +   '<div class="card">'
		    +     '<div class="card-body">'
		    +      	'<h5 class="card-title">Special title treatment</h5>'
		    +    	'<img src="./splash/corvallis.jpg" class="main-listing-img" alt="MU">'
		    +      	'<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>'
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
		    +      	'<h5 class="card-title">Special title treatment</h5>'
		    +    	'<img src="./splash/corvallis.jpg" class="main-listing-img" alt="MU">'
		    +      	'<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>'
		    +      	'<h5 class="card-title list-price"><strong>$100</strong></h5>'
		    +      	'<a href="viewlisting.html?listingID='+(len-2)+'" class="btn btn-primary">View Listing</a>'
		    +  	  '</div>'
		    +  	  '<div class="card-footer text-muted text-center">'
	    	+	  	'Posted 2 days ago'
	 		+  	  '</div>'
		    +  	'</div>'
		  	+ '</div>'
		  	+ '<div class="col-sm-4">'
		    + 	'<div class="card">'
		    +     '<div class="card-body">'
		    +      	'<h5 class="card-title">Special title treatment</h5>'
		    +    	'<img src="./splash/corvallis.jpg" class="main-listing-img" alt="MU">'
		    +      	'<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>'
		    +      	'<h5 class="card-title list-price"><strong>$100</strong></h5>'
		    +      	'<a href="viewlisting.html?listingID='+(len-3)+'" class="btn btn-primary">View Listing</a>'
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
			    +      	'<h5 class="card-title">Special title treatment</h5>'
			    +    	'<img src="./splash/corvallis.jpg" class="main-listing-img" alt="MU"><br/>'
			    +      	'<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>'
			    +      	'<h5 class="card-title list-price"><strong>$100</strong></h5>'
			    +      	'<a href="viewlisting.html?listingID='+(len-1)+'" class="btn btn-primary">View Listing</a>'
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