$(document).ready(function() {
	$('#header').load("header.html");
	if (sessionStorage.length < 5) {
		window.location.href = "./index.html";
	}
	else {
		var urlPieces = window.location.href.split("/");
		var pageName = urlPieces[urlPieces.length-1];
		logActivity(pageName);
	}
	
	$('.close').click(function() {
		console.log($(this).data('id'));
	});
});

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("backToTop").style.display = "block";
    } else {
        document.getElementById("backToTop").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function escapeJSON(jString) {
	console.log("escaping special characters");
	return jString.replace(/\n/g, "<br/>").replace(/\r/g, "</br>").replace(/\t/g, " ").replace('"', "\"");
}

function showHomeListings(listings, location, type) {
	var html = '<div class="card-deck listing-row">';
	var len = listings.length - 1;
	for (i = 0; i < 3; i++) {
		if (len >= 0) {
			console.log("image to be used: " + 'http://www.worksbythepg.com/osucm-images/'+listings[len].type[0]+'/'+listings[len].imageIDs[0]);
			html += '<div class="card">'
		    +     '<div class="card-body">'
		    +		(type == 'saved' 
		    		? '<button type="button" class="close" id="removeFromSavedListX" aria-label="Close" data-id="saved'+listings[len].listingID+'">'
		    	        	+		  '<span aria-hidden="true">&times;</span>'
		    	        	+	  	'</button>'
		    		: (type == 'my' 
		    			? '<button type="button" class="close" id="deleteMyListingX" aria-label="Close" data-id="deleteMy'+listings[len].listingID+'">'
		    				+	'<span aria-hidden="true">&times;</span>'
		    				+ '</button>'
		    			: '')
		    		)
		    +      	'<h5 class="card-title">'+listings[len].title+'</h5>'
		    +		'<p class="card-text">Listing type: '+listings[len].type.charAt(0).toUpperCase()+listings[len].type.substring(1)+'</p>'
		    +		'<p class="card-text">Campus: '+(listings[len] == 'Bend' ? 'Bend (Cascades)' : (listings[len] == 'Other' ? 'Other (See description)' : listings[len].campus))+'</p>'
		    +    	(listings[len].imageIDs.length == 0 ? '' : '<img src="http://www.worksbythepg.com/osucm-images/'+listings[len].type[0]+'/'+listings[len].imageIDs[0]+'" class="main-listing-img" alt="listing image">')
		    +      	'<p class="card-text">'+buildDescription(listings[len].description)+'</p>'
		    +      	'<h5 class="card-title list-price"><strong>$'+buildPrice(listings[len].price, listings[len].payFrequency)+'</strong></h5>'
		    +      	'<a href="viewlisting.html?listingID='+listings[len].listingID+'" class="btn btn-primary listing-action">View Details</a>'
		    +		(type == 'my' 
    				? 	'<a href="editlisting.html?listingID='+listings[len].listingID+'" class="btn btn-info listing-action">Edit</a>'
	    			: '')
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
	$(location).append(html);
}

function buildPrice(listingPrice, payFrequency) {
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
	if (payFrequency == 'mo') tempPrice += '/mo';
	return tempPrice;
}

function buildDatePosted(listingDatePosted) {
	//console.log(listingDatePosted);
	//console.log(typeof listingDatePosted);
	//console.log(new Date(parseInt(listingDatePosted)).toLocaleString("en-US", {timezone: "America/Los_Angeles"}));
	var datePosted = new Date(parseInt(listingDatePosted)).toLocaleString("en-US", {timezone: "America/Los_Angeles"}).split(',')[0];
	//console.log(datePosted);
	//console.log(datePosted.substring(0,3)+'. '+datePosted.substring(4,6)+', '+datePosted.substring(7,11));
	return datePosted;
}

function buildDescription(listingDescription) {
	var tempDesc = listingDescription;
	return (tempDesc.length > 128 ? tempDesc.substring(0,128)+'...' : tempDesc);
}

function logActivity(page_visited) {
	var formData = new FormData();
	var request = new XMLHttpRequest();
	
	var url = 'http://www.worksbythepg.com/osucm-logs/activity.php';
	formData.append('user', sessionStorage.getItem('onid'));
	formData.append('page_visited', page_visited);
	request.open("POST", url, true);
	request.send(formData);
	
	request.onreadystatechange = function() {
		if (request.readyState == 4 && (request.status == 200 || request.status == 201 || request.status == 202)) {
			if (request.response != 'SUCCESS') {
				console.warn('Error logging page to activity file.');
			}
		}
	}
}