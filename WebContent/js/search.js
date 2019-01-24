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
		$('#searchInput').attr('placeholder', 'Search product listings');
	}
	else if (type == 'service') {
		$(document).attr('title', 'Search Services - OSU Community Marketplace');
		$('#page-title').html('Search for a Service');
		$('#searchInput').attr('placeholder', 'Search service listings');
	}
	else if (type == 'housing') {
		$(document).attr('title', 'Search for Housing - OSU Community Marketplace');
		$('#page-title').html('Search for Housing');
		$('#searchInput').attr('placeholder', 'Search housing listings');
	}
	
	var len = 6;
	while (len > 0) {
		if (len >= 3) {
			$('#listings').append(
			'<div class="row listing-row">'		
		    + '<div class="col-sm-4">'
		    +   '<div class="card">'
		    +     '<div class="card-body">'
		    +      	'<h5 class="card-title">Special title treatment</h5>'
		    +    	'<img src="./splash/corvallis.jpg" class="main-listing-img" alt="MU">'
		    +      	'<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>'
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
		  + '</div>');
		  	len -= 3;
		}
		else {
			while (len > 0) {
		    	$('#listings').append(
				'<div class="row listing-row">'		
			    + '<div class="col-sm-4">'
			    +   '<div class="card">'
			    +     '<div class="card-body">'
			    +      	'<h5 class="card-title">Special title treatment</h5>'
			    +    	'<img src="./splash/corvallis.jpg" class="main-listing-img" alt="MU"><br/>'
			    +      	'<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>'
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
	
	$('#searchSubmitBtn').click(function() {
		console.log("search submit button clicked");
		var input = $('#searchInput').val();
		if (validateSearchForm(input)) {
			$('#incompleteSearchAlert').css("display", "none");
			window.location.href="search.html?type="+type+"&query="+input;
		}
	});
});

function validateSearchForm(input) {
	if (input == '') {
		$('#incompleteSearchAlert').html("Please enter a keyword(s).");
		$('#incompleteSearchAlert').css("display", "block");
		return false;
	}
	if (input.includes('?') || input.includes('&') || input.includes('!') || input.includes('/') || input.includes('\\')) {
		$('#incompleteSearchAlert').html("Keywords cannot include special characters (?, &, !, /, \\.)");
		$('#incompleteSearchAlert').css("display", "block");
		return false;
	}
	return true;
}