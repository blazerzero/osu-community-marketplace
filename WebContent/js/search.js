$(document).ready(function() {
	var url = new URL(window.location.href);
	var type = url.searchParams.get("type");
	var query = url.searchParams.get("query");
	console.log("query: " + query);
	var type = window.location.href.split('=')[1].substring(0,7);
	console.log("Listing type: " + type);
	if (type == 'product') {
		$(document).attr('title', 'Product Listings - OSU Community Marketplace');
		$('#page-title').html('Product Listings');
		$('#searchInput').attr('placeholder', 'Search product listings');
	}
	else if (type == 'service') {
		$(document).attr('title', 'Service Listings - OSU Community Marketplace');
		$('#page-title').html('Service Listings');
		$('#searchInput').attr('placeholder', 'Search service listings');
	}
	else if (type == 'housing') {
		$(document).attr('title', 'Housing Listings - OSU Community Marketplace');
		$('#page-title').html('Housing Listings');
		$('#searchInput').attr('placeholder', 'Search housing listings');
	}
	
	var listingsJSON = sendDataSync("{'type': '"+type+"'}", "getListings", "ListingController");
	var listings = jQuery.parseJSON(escapeJSON(listingsJSON));
	console.log(listings);
	
	showListings(listings);
	
	$('#searchSubmitBtn').click(function() {
		console.log("search submit button clicked");
		var input = $('#searchInput').val();
		if (validateSearchForm(input)) {
			$('#incompleteSearchAlert').css("display", "none");
			window.location.href="search.html?type="+type+"&query="+input;
		}
	});
	
	$('#searchSort').change(function() {
		if ($('#searchSort').val() == 'date') {
			console.log("sorting listings by date");
			listings.sort(function(a, b) {
				return (new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime());
			});
		}
		else if ($('#searchSort').val() == 'price-asc') {
			console.log("sorting listings by price");
			listings.sort(function(a, b) {
				return (b.price - a.price);
			});
		}
		else if ($('#searchSort').val() == 'price-desc') {
			console.log("sorting listings by price");
			listings.sort(function(a, b) {
				return (a.price - b.price);
			});
		}
		else if ($('#searchSort').val() == 'az') {
			console.log("sorting listings in alphabetical order");
			listings.sort(function(a, b) {
				return (a.title - b.title);
			});
		}
		else if ($('#searchSort').val() == 'za') {
			console.log("sorting listings in reverse alphabetical order");
			listings.sort(function(a, b) {
				return (b.title - a.title);
			});
		}
		$('#listings').html('');
		showListings(listings, type);
	});
});

function showListings(listings, type) {
	var len = listings.length - 1;
	while (len >= 0) {
		if (len >= 3) {
			var payFreq = (listings[len].type == 'housing' ? '/'+listings[len].payFrequency : '');
			$('#listings').append(
			'<div class="card-deck listing-row">'		
		    + 	'<div class="card">'
		    +     '<div class="card-body">'
		    +      	'<h5 class="card-title">'+listings[len].title+'</h5>'
		    +    	(listings[len].imageIDs == '' ? '' : '<img src="worksbythepg.com/osucm-images/'+type+'/'+listings[len].imageIDs[0]+'" class="main-listing-img" alt="listing image">')
		    +      	'<p class="card-text">'+buildDescription(listings[len].description)+'</p>'
		    +      	'<h5 class="card-title list-price"><strong>$'+buildPrice(listings[len].price)+'</strong></h5>'
		    +      	'<a href="viewlisting.html?listingID='+listings[len].listingID+'" class="btn btn-primary">View Listing</a>'
		    +  	  '</div>'
		    +  	  '<div class="card-footer text-muted text-center">'
	    	+	  	'Posted on '+buildDatePosted(listings[len].datePosted)
	 		+  	  '</div>'
		    +  	'</div>'
		    +   '<div class="card">'
		    +     '<div class="card-body">'
		    +      	'<h5 class="card-title">'+listings[len-1].title+'</h5>'
		    +    	(listings[len-1].imageIDs == '' ? '' : '<img src="worksbythepg.com/osucm-images/'+type+'/'+listings[len-1].imageIDs[0]+'" class="main-listing-img" alt="listing image">')
		    +      	'<p class="card-text">'+buildDescription(listings[len-1].description)+'</p>'
		    +      	'<h5 class="card-title list-price"><strong>$'+buildPrice(listings[len-1].price)+'</strong></h5>'
		    +      	'<a href="viewlisting.html?listingID='+listings[len-1].listingID+'" class="btn btn-primary">View Listing</a>'
		    +  	  '</div>'
		    +  	  '<div class="card-footer text-muted text-center">'
	    	+	  	'Posted on '+buildDatePosted(listings[len-1].datePosted)
	 		+  	  '</div>'
		    +  	'</div>'
		    +   '<div class="card">'
		    +     '<div class="card-body">'
		    +      	'<h5 class="card-title">'+listings[len-2].title+'</h5>'
		    +    	(listings[len-2].imageIDs == '' ? '' : '<img src="worksbythepg.com/osucm-images/'+type+'/'+listings[len-2].imageIDs[0]+'" class="main-listing-img" alt="listing image">')
		    +      	'<p class="card-text">'+buildDescription(listings[len-2].description)+'</p>'
		    +      	'<h5 class="card-title list-price"><strong>$'+buildPrice(listings[len-2].price)+'</strong></h5>'
		    +      	'<a href="viewlisting.html?listingID='+listings[len-2].listingID+'" class="btn btn-primary">View Listing</a>'
		    +  	  '</div>'
		    +  	  '<div class="card-footer text-muted text-center">'
	    	+	  	'Posted on '+buildDatePosted(listings[len-2].datePosted)
	 		+  	  '</div>'
		    +  	'</div>'
		  	+ '</div><br/>');
		  	len -= 3;
		}
		else {
			var html = '<div class="card-deck listing-row">';
			for (i = 0; i < 3; i++) {
				if (len >= 0) {
					html += '<div class="card">'
	    		    +     '<div class="card-body">'
	    		    +      	'<h5 class="card-title">'+listings[len].title+'</h5>'
	    		    +    	(listings[len].imageIDs == '' ? '' : '<img src="worksbythepg.com/osucm-images/'+type+'/'+listings[len].imageIDs[0]+'" class="main-listing-img" alt="listing image">')
	    		    +      	'<p class="card-text">'+buildDescription(listings[len].description)+'</p>'
	    		    +      	'<h5 class="card-title list-price"><strong>$'+buildPrice(listings[len].price)+'</strong></h5>'
	    		    +      	'<a href="viewlisting.html?listingID='+listings[len].listingID+'" class="btn btn-primary">View Listing</a>'
	    		    +  	  '</div>'
	    		    +  	  '<div class="card-footer text-muted text-center">'
	    	    	+	  	'Posted on '+buildDatePosted(listings[len].datePosted)
	    	 		+  	  '</div>'
	    		    +  	'</div>';
			    	len--;
				}
				else {
					html += '<div class="card" style="opacity: 0" disabled></div>';
				}
			}
			html += '</div>';
		    $('#listings').append(html);
	    }
	}
}

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
	return (tempDesc.length > 128 ? tempDesc.substring(0,64)+'...' : tempDesc);
}

function escapeJSON(jString) {
	return jString.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t")
}