$(document).ready(function() {
	
	$('#home-name').html('Hi, ' + sessionStorage.getItem('firstname') + '!');
	
	var recentListingsJSON = sendDataSync("", "getRecentListings", "ListingController");
	var recentListings = [];
	if (recentListingsJSON != null && recentListingsJSON.length > 0) {
		recentListings = jQuery.parseJSON(recentListingsJSON);
	}
	
	recentListings.sort(function(a, b) {
		return (new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime());
	});
	
	$.each(recentListings, function(index, value) {
		var imageIDs = value.imageIDs;
		var imageIDList = imageIDs.split(', ');
		console.log(imageIDList);
		imageIDList.shift();
		value.imageIDs = imageIDList;
	});
	
	showHomeListings(recentListings, '#home-new-listings', 'new');
	
	var savedListingsJSON = sendDataSync("{'onid': '"+sessionStorage.getItem('onid')+"'}", "getRecentSavedListings", "SavedListingController");
	var savedListings = [];
	if (savedListingsJSON != null && savedListingsJSON.length > 0) {
		savedListings = jQuery.parseJSON(savedListingsJSON);
	}
	
	$.each(savedListings, function(index, value) {
		var imageIDs = value.imageIDs;
		var imageIDList = imageIDs.split(', ');
		console.log(imageIDList);
		imageIDList.shift();
		value.imageIDs = imageIDList;
	});
	
	savedListings.sort(function(a, b) {
		return (new Date(a.dateSaved).getTime() - new Date(b.dateSaved).getTime());
	});
	
	showHomeListings(savedListings, '#home-saved-listings', 'saved');
	
	var myListingsJSON = sendDataSync("{'onid': '"+sessionStorage.getItem("onid")+"'}", "getMyRecentListings", "ListingController");
	var myListings = [];
	if (myListingsJSON != null && myListingsJSON.length > 0) {
		myListings = jQuery.parseJSON(myListingsJSON);
	}
	
	myListings.sort(function(a, b) {
		return (new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime());
	});
	
	$.each(myListings, function(index, value) {
		var imageIDs = value.imageIDs;
		var imageIDList = imageIDs.split(', ');
		console.log(imageIDList);
		imageIDList.shift();
		value.imageIDs = imageIDList;
	});
	
	console.log(myListings);
	
	showHomeListings(myListings, '#home-my-listings', 'my');
	
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
