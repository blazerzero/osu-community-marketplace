$(document).ready(function() {
	sessionStorage.setItem('onid', 'usert');
	sessionStorage.setItem('firstname', 'Test User');
	sessionStorage.setItem('middlename', '');
	sessionStorage.setItem('lastname', '');
	sessionStorage.setItem('email', 'usert@oregonstate.edu');
	
	$('#home-name').html('Hi, ' + sessionStorage.getItem('firstname') + '!');
	
	var recentListingsJSON = sendDataSync("", "getRecentListings", "ListingController");
	var recentListings = jQuery.parseJSON(recentListingsJSON);
	
	//var savedLen = 2;
	var newLen = 2;
	var myLen = 2;
	
	var html = '';
	var len = 0;
	/*html += '<div class="row listing-row">';
	while (savedLen > 0) {
		html += '<div class="col-sm-4">'
		      +   '<div class="card">'
		      +     '<div class="card-body">'
		      +      	'<h5 class="card-title">Listing Title</h5>'
		      +    		'<img src="./splash/corvallis.jpg" class="main-listing-img" alt="MU">'
		      +      	'<p class="card-text">Listing description</p>'
		      +      	'<h5 class="card-title list-price"><strong>$100</strong></h5>'
		      +      	'<a href="viewlisting.html?listingID='+savedLen+'" class="btn btn-primary">View Listing</a>'
		      +  	  '</div>'
		      +  	  '<div class="card-footer text-muted text-center">'
	      	  +	  	'Posted 2 days ago'
	 		  +  	  '</div>'
		      +  	'</div>'
		  	  + '</div>';
		savedLen--;
	}
	html += '</div>';
	$('#home-saved-listings').append(html);*/
	
	html = '<div class="row listing-row">';
	len = recentListings.length - 1;
	while (len >= 0) {
		html += '<div class="col-sm-4">'
	    +   '<div class="card">'
	    +     '<div class="card-body">'
	    +      	'<h5 class="card-title">'+recentListings[len].title+'</h5>'
	    +    	(recentListings[len].imageIDs == '' ? '' : '<img src="worksbythepg.com/osucm-images/'+type+'/'+recentListings[len].imageIDs[0]+'" class="main-listing-img" alt="listing image">')
	    +      	'<p class="card-text">'+recentListings[len].description+'</p>'
	    +      	'<h5 class="card-title list-price"><strong>$'+buildPrice(recentListings[len].price)+'</strong></h5>'
	    +      	'<a href="viewlisting.html?listingID='+recentListings[len].listingID+'" class="btn btn-primary">View Listing</a>'
	    +  	  '</div>'
	    +  	  '<div class="card-footer text-muted text-center">'
    	+	  	'Posted on '+buildDatePosted(recentListings[len].datePosted)
 		+  	  '</div>'
	    +  	'</div>'
	  	+ '</div>';
    	len--;
	}
	html += '</div>';
	$('#home-new-listings').append(html);
	
	var html = '';
	html += '<div class="row listing-row">';
	while (myLen > 0) {
		html += '<div class="col-sm-4">'
		      +   '<div class="card">'
		      +     '<div class="card-body">'
		      +      	'<h5 class="card-title">Listing Title</h5>'
		      +    		'<img src="./splash/portland.jpg" class="main-listing-img" alt="MU">'
		      +      	'<p class="card-text">Listing description</p>'
		      +      	'<h5 class="card-title list-price"><strong>$100</strong></h5>'
		      +      	'<a href="viewlisting.html?listingID='+myLen+'" class="btn btn-primary">View Listing</a>'
		      +  	  '</div>'
		      +  	  '<div class="card-footer text-muted text-center">'
	      	  +	  	'Posted 2 days ago'
	 		  +  	  '</div>'
		      +  	'</div>'
		  	  + '</div>';
		myLen--;
	}
	html += '</div>';
	$('#home-my-listings').append(html);
	
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

function buildDatePosted(listingDatePosted) {
	var datePosted = new Date(listingDatePosted).toString().substring(4,15);
	console.log(datePosted.substring(0,3)+'. '+datePosted.substring(4,6)+', '+datePosted.substring(7,11));
	return datePosted.substring(0,3)+'. '+datePosted.substring(4,6)+', '+datePosted.substring(7,11);
}