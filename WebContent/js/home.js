$(document).ready(function() {
	
	$('#home-name').html('Hi, ' + sessionStorage.getItem('firstname') + '!');
	
	//var savedLen = 2;
	var newLen = 2;
	var myLen = 2;
	
	var html = '';
	var len = 0;
	/*html += '<div class="card-deck listing-row">';
	while (savedLen > 0) {
		html += '<div class="card">'
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
		      +  	'</div>';
		savedLen--;
	}
	html += '</div>';
	$('#home-saved-listings').append(html);*/
	
	var recentListingsJSON = sendDataSync("", "getRecentListings", "ListingController");
	//console.log(recentListingsJSON);
	var recentListings = [];
	if (recentListingsJSON != null && recentListingsJSON.length > 0) {
		recentListings = jQuery.parseJSON(escapeJSON(recentListingsJSON));
	}
	
	recentListings.sort(function(a, b) {
		return (new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime());
	});
	
	html = '<div class="card-deck listing-row">';
	len = recentListings.length - 1;
	for (i = 0; i < 3; i++) {
		if (len >= 0) {
			html += '<div class="card">'
		    +     '<div class="card-body">'
		    +      	'<h5 class="card-title">'+recentListings[len].title+'</h5>'
		    +		'<p class="card-text">Listing type: '+recentListings[len].type.charAt(0).toUpperCase()+recentListings[len].type.substring(1)+'</p>'
		    +    	(recentListings[len].imageIDs == '' ? '' : '<img src="worksbythepg.com/osucm-images/'+recentListings[len].type[0]+'/'+recentListings[len].imageIDs[0]+'" class="main-listing-img" alt="listing image">')
		    +      	'<p class="card-text">'+buildDescription(recentListings[len].description)+'</p>'
		    +      	'<h5 class="card-title list-price"><strong>$'+buildPrice(recentListings[len].price)+(recentListings[len].payFrequency == '' ? '' : '/'+recentListings[len].payFrequency)+'</strong></h5>'
		    +      	'<a href="viewlisting.html?listingID='+recentListings[len].listingID+'" class="btn btn-primary">View Listing</a>'
		    +  	  '</div>'
		    +  	  '<div class="card-footer text-muted text-center">'
	    	+	  	'Posted on '+buildDatePosted(recentListings[len].datePosted)
	 		+  	  '</div>'
		    +  	'</div>';
	    	len--;
		}
		else {
			html += '<div class="card" style="opacity: 0" disabled></div>';
		}
	}
	html += '</div>';
	$('#home-new-listings').append(html);
	
	var myListingsJSON = sendDataSync("{'onid': '"+sessionStorage.getItem("onid")+"'}", "getMyRecentListings", "ListingController");
	//console.log(myListingsJSON);
	var myListings = [];
	if (myListingsJSON != null && myListingsJSON.length > 0) {
		myListings = jQuery.parseJSON(escapeJSON(myListingsJSON));
	}
	
	myListings.sort(function(a, b) {
		return (new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime());
	});
	
	len = myListings.length - 1;
	html = '';
	html += '<div class="card-deck listing-row">';
	for (i = 0; i < 3; i++) {
		if (len >= 0) {
			html += '<div class="card">'
			      +     '<div class="card-body">'
			      +       '<h5 class="card-title">'+myListings[len].title+'</h5>'
				  +		  '<p class="card-text">Listing type: '+myListings[len].type.charAt(0).toUpperCase()+myListings[len].type.substring(1)+'</p>'
				  +    	  (myListings[len].imageIDs == '' ? '' : '<img src="worksbythepg.com/osucm-images/'+myListings[len].type[0]+'/'+myListings[len].imageIDs[0]+'" class="main-listing-img" alt="listing image">')
				  +       '<p class="card-text">'+buildDescription(myListings[len].description)+'</p>'
				  +       '<h5 class="card-title list-price"><strong>$'+buildPrice(myListings[len].price)+(myListings[len].payFrequency == '' ? '' : '/'+myListings[len].payFrequency)+'</strong></h5>'
				  +       '<a href="viewlisting.html?listingID='+myListings[len].listingID+'" class="btn btn-primary">View Listing</a>'
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

function buildDescription(listingDescription) {
	var tempDesc = listingDescription;
	return (tempDesc.length > 128 ? tempDesc.substring(0,128)+'...' : tempDesc);
}

function escapeJSON(jString) {
	return jString.replace(/\n/g, "<br/>").replace(/\r/g, "<br/>").replace(/\t/g, "<br/>");
}
