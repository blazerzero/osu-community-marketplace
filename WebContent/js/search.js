$(document).ready(function() {
	var url = new URL(window.location.href);
	var type = url.searchParams.get("type");
	var query = url.searchParams.get("query");
	console.log("query: " + query);
	var type = window.location.href.split('=')[1].substring(0,7);
	console.log("Listing type: " + type);
	if (type == 'product') {
		$(document).attr('title', 'Search Products - OSU Community Marketplace');
		$('#page-title').html('Search for a Product');
	}
	else if (type == 'service') {
		$(document).attr('title', 'Search Services - OSU Community Marketplace');
		$('#page-title').html('Search for a Service');
	}
	else if (type == 'housing') {
		$(document).attr('title', 'Search for Housing - OSU Community Marketplace');
		$('#page-title').html('Search for Housing');
	}
	
	var len = 6;
	while (len > 0) {
		if (len >= 2) {
			$('#listings').append(
			'<div class="row listing-row">'		
		    + '<div class="col-sm-6">'
		    +   '<div class="card">'
		    +     '<div class="card-body">'
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
	    	$('#listings').append(
			'<div class="row listing-row">'		
		    + '<div class="col-sm-6">'
		    +   '<div class="card">'
		    +     '<div class="card-body">'
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
});