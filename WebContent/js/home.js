$(document).ready(function() {
	var savedLen = 2;
	var newLen = 2;
	var myLen = 2;
	
	if (savedLen == 2) {
		$('#home-saved-listings').append(
		'<div class="row listing-row">'		
	    + '<div class="col-sm-6">'
	    +   '<div class="card">'
	    +     '<div class="card-body">'
	    +      	'<h5 class="card-title">Special title treatment</h5>'
	    +    	'<img src="./splash/corvallis.jpg" id="listing-img" width="300" height="200" alt="MU">'
	    +      	'<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>'
	    +      	'<h5 class="card-title list-price"><strong>$100</strong></h5>'
	    +      	'<a href="viewlisting.html?listingID='+savedLen+'" class="btn btn-primary">View Listing</a>'
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
	    +    	'<img src="./splash/corvallis.jpg" id="listing-img" width="300" height="200" alt="MU">'
	    +      	'<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>'
	    +      	'<h5 class="card-title list-price"><strong>$100</strong></h5>'
	    +      	'<a href="viewlisting.html?listingID='+(savedLen-1)+'" class="btn btn-primary">View Listing</a>'
	    +  	  '</div>'
	    +  	  '<div class="card-footer text-muted text-center">'
    	+	  	'Posted 2 days ago'
 		+  	  '</div>'
	    +  	'</div>'
	  	+ '</div>'
	  + '</div>');
	}
	else if (savedLen == 1) {
    	$('#home-saved-listings').append(
		'<div class="row listing-row">'		
	    + '<div class="col-sm-6">'
	    +   '<div class="card">'
	    +     '<div class="card-body">'
	    +      	'<h5 class="card-title">Special title treatment</h5>'
	    +    	'<img src="./splash/corvallis.jpg" id="listing-img" width="300" height="200" alt="MU">'
	    +      	'<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>'
	    +      	'<h5 class="card-title list-price"><strong>$100</strong></h5>'
	    +      	'<a href="viewlisting.html?listingID='+savedLen+'" class="btn btn-primary">View Listing</a>'
	    +  	  '</div>'
	    +  	  '<div class="card-footer text-muted text-center">'
    	+	  	'Posted 2 days ago'
 		+  	  '</div>'
	    +  	'</div>'
	  	+ '</div>'
      + '</div>');
    }
	
	if (newLen == 2) {
		$('#home-new-listings').append(
		'<div class="row listing-row">'		
	    + '<div class="col-sm-6">'
	    +   '<div class="card">'
	    +     '<div class="card-body">'
	    +      	'<h5 class="card-title">Special title treatment</h5>'
	    +    	'<img src="./splash/bend.jpg" id="listing-img" width="300" height="200" alt="MU">'
	    +      	'<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>'
	    +      	'<h5 class="card-title list-price"><strong>$100</strong></h5>'
	    +      	'<a href="viewlisting.html?listingID='+newLen+'" class="btn btn-primary">View Listing</a>'
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
	    +    	'<img src="./splash/bend.jpg" id="listing-img" width="300" height="200" alt="MU">'
	    +      	'<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>'
	    +      	'<h5 class="card-title list-price"><strong>$100</strong></h5>'
	    +      	'<a href="viewlisting.html?listingID='+(newLen-1)+'" class="btn btn-primary">View Listing</a>'
	    +  	  '</div>'
	    +  	  '<div class="card-footer text-muted text-center">'
    	+	  	'Posted 2 days ago'
 		+  	  '</div>'
	    +  	'</div>'
	  	+ '</div>'
	  + '</div>');
	}
	else if (newLen == 1) {
    	$('#home-new-listings').append(
		'<div class="row listing-row">'		
	    + '<div class="col-sm-6">'
	    +   '<div class="card">'
	    +     '<div class="card-body">'
	    +      	'<h5 class="card-title">Special title treatment</h5>'
	    +    	'<img src="./splash/bend.jpg" id="listing-img" width="300" height="200" alt="MU">'
	    +      	'<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>'
	    +      	'<h5 class="card-title list-price"><strong>$100</strong></h5>'
	    +      	'<a href="viewlisting.html?listingID='+newLen+'" class="btn btn-primary">View Listing</a>'
	    +  	  '</div>'
	    +  	  '<div class="card-footer text-muted text-center">'
    	+	  	'Posted 2 days ago'
 		+  	  '</div>'
	    +  	'</div>'
	  	+ '</div>'
      + '</div>');
    }
	
	if (myLen == 2) {
		$('#home-my-listings').append(
		'<div class="row listing-row">'		
	    + '<div class="col-sm-6">'
	    +   '<div class="card">'
	    +     '<div class="card-body">'
	    +      	'<h5 class="card-title">Special title treatment</h5>'
	    +    	'<img src="./splash/portland.jpg" id="listing-img" width="300" height="200" alt="MU">'
	    +      	'<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>'
	    +      	'<h5 class="card-title list-price"><strong>$100</strong></h5>'
	    +      	'<a href="viewlisting.html?listingID='+myLen+'" class="btn btn-primary">View Listing</a>'
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
	    +    	'<img src="./splash/portland.jpg" id="listing-img" width="300" height="200" alt="MU">'
	    +      	'<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>'
	    +      	'<h5 class="card-title list-price"><strong>$100</strong></h5>'
	    +      	'<a href="viewlisting.html?listingID='+(myLen-1)+'" class="btn btn-primary">View Listing</a>'
	    +  	  '</div>'
	    +  	  '<div class="card-footer text-muted text-center">'
    	+	  	'Posted 2 days ago'
 		+  	  '</div>'
	    +  	'</div>'
	  	+ '</div>'
	  + '</div>');
	}
	else if (myLen == 1) {
    	$('#home-my-listings').append(
		'<div class="row listing-row">'		
	    + '<div class="col-sm-6">'
	    +   '<div class="card">'
	    +     '<div class="card-body">'
	    +      	'<h5 class="card-title">Special title treatment</h5>'
	    +    	'<img src="./splash/portland.jpg" id="listing-img" width="300" height="200" alt="MU">'
	    +      	'<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>'
	    +      	'<h5 class="card-title list-price"><strong>$100</strong></h5>'
	    +      	'<a href="viewlisting.html?listingID='+myLen+'" class="btn btn-primary">View Listing</a>'
	    +  	  '</div>'
	    +  	  '<div class="card-footer text-muted text-center">'
    	+	  	'Posted 2 days ago'
 		+  	  '</div>'
	    +  	'</div>'
	  	+ '</div>'
      + '</div>');
    }
	
	$('#homeSearchSubmitBtn').click(function() {
		var typeVal = $('#homeSearchType').val();
		var input = $('#homeSearchInput').val();
		if (validateSearchForm(typeVal, input)) {
			if (typeVal == 'p') type = 'product';
			else if (typeVal == 's') type = 'service';
			else if (typeVal == 'h') type = 'housing';
			$('#incompleteHomeSearchAlert').css("display", "none");
			window.location.href="search.html?type="+type+"&query="+input;
		}
	});
});

function validateSearchForm(type, input) {
	if (type == '') {
		$('#incompleteHomeSearchAlert').html("Please pick a listing type.");
		$('#incompleteHomeSearchAlert').css("display", "block");
		return false;
	}
	if (input == '') {
		$('#incompleteHomeSearchAlert').html("Please enter a keyword(s).");
		$('#incompleteHomeSearchAlert').css("display", "block");
		return false;
	}
	if (input.includes('?') || input.includes('&') || input.includes('!') || input.includes('/') || input.includes('\\')) {
		$('#incompleteHomeSearchAlert').html("Keywords cannot include special characters (&, !, /, \\.");
		$('#incompleteHomeSearchAlert').css("display", "block");
		return false;
	}
	return true;
}