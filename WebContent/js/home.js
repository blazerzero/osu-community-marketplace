$(document).ready(function() {
	var savedLen = 2;
	var newLen = 2;
	var myLen = 2;
	
	var html = '';
	$('#home-saved-listings').append('<div class="row listing-row">');
	while (savedLen > 0) {
		
		$('#home-saved-listings').append(
				  '<div class="col-sm-4">'
			    +   '<div class="card">'
			    +     '<div class="card-body">'
			    +      	'<h5 class="card-title">Special title treatment</h5>'
			    +    	'<img src="./splash/corvallis.jpg" class="main-listing-img" alt="MU">'
			    +      	'<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>'
			    +      	'<h5 class="card-title list-price"><strong>$100</strong></h5>'
			    +      	'<a href="viewlisting.html?listingID='+savedLen+'" class="btn btn-primary">View Listing</a>'
			    +  	  '</div>'
			    +  	  '<div class="card-footer text-muted text-center">'
		    	+	  	'Posted 2 days ago'
		 		+  	  '</div>'
			    +  	'</div>'
			  	+ '</div>');
		savedLen--;
	}
	console.log('')
	$('#home-saved-listings').append('</div>');
	
	$('#home-new-listings').append('<div class="row listing-row">');
	while (newLen > 0) {
		$('#home-new-listings').append(
				  '<div class="col-sm-4">'
			    +   '<div class="card">'
			    +     '<div class="card-body">'
			    +      	'<h5 class="card-title">Special title treatment</h5>'
			    +    	'<img src="./splash/bend.jpg" class="main-listing-img" alt="MU">'
			    +      	'<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>'
			    +      	'<h5 class="card-title list-price"><strong>$100</strong></h5>'
			    +      	'<a href="viewlisting.html?listingID='+newLen+'" class="btn btn-primary">View Listing</a>'
			    +  	  '</div>'
			    +  	  '<div class="card-footer text-muted text-center">'
		    	+	  	'Posted 2 days ago'
		 		+  	  '</div>'
			    +  	'</div>'
			  	+ '</div>');
		newLen--;
	}
	$('#home-new-listings').append('</div>');
	
	$('#home-my-listings').append('<div class="row listing-row">');
	while (myLen > 0) {
		$('#home-my-listings').append(
				  '<div class="col-sm-4">'
			    +   '<div class="card">'
			    +     '<div class="card-body">'
			    +      	'<h5 class="card-title">Special title treatment</h5>'
			    +    	'<img src="./splash/portland.jpg" class="main-listing-img" alt="MU">'
			    +      	'<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>'
			    +      	'<h5 class="card-title list-price"><strong>$100</strong></h5>'
			    +      	'<a href="viewlisting.html?listingID='+myLen+'" class="btn btn-primary">View Listing</a>'
			    +  	  '</div>'
			    +  	  '<div class="card-footer text-muted text-center">'
		    	+	  	'Posted 2 days ago'
		 		+  	  '</div>'
			    +  	'</div>'
			  	+ '</div>');
		myLen--;
	}
	$('#home-my-listings').append('</div>');
	
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