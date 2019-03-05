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
		if (imageIDs.includes(', ')) {
			imageIDList.shift();
		}
		value.imageIDs = imageIDList;
	});
	
	if (recentListings.length > 0) {
		showHomeListings(recentListings, '#home-new-listings', 'new');
	}
	else {
		$('#home-new-listings').html("<center>No listings are on the marketplace right now.</center>");
	}
	
	var savedListingsJSON = sendDataSync("{'onid': '"+sessionStorage.getItem('onid')+"'}", "getRecentSavedListings", "SavedListingController");
	var savedListings = [];
	if (savedListingsJSON != null && savedListingsJSON.length > 0) {
		savedListings = jQuery.parseJSON(savedListingsJSON);
	}
	
	$.each(savedListings, function(index, value) {
		var imageIDs = value.imageIDs;
		var imageIDList = imageIDs.split(', ');
		console.log(imageIDList);
		if (imageIDs.includes(', ')) {
			imageIDList.shift();
		}
		value.imageIDs = imageIDList;
	});
	
	savedListings.sort(function(a, b) {
		return (new Date(a.dateSaved).getTime() - new Date(b.dateSaved).getTime());
	});
	
	if (savedListings.length > 0) {
		showHomeListings(savedListings, '#home-saved-listings', 'saved');
	}
	else {
		$('#home-saved-listings').html("<center>You haven't saved any listings.</center>");
	}
	
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
		if (imageIDs.includes(', ')) {
			imageIDList.shift();
		}
		value.imageIDs = imageIDList;
	});
	
	console.log(myListings);
	
	if (myListings.length > 0) {
		showHomeListings(myListings, '#home-my-listings', 'my');
	}
	else {
		$('#home-my-listings').html("<center>You haven't posted any listings yet.</center>");
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
	
	$('.close').click(function() {
		console.log($(this).data('id'));
		if ($(this).data('id') != null && $(this).data('id').includes('removeSaved')) {
			listingToRemove = $(this).data('id').substring(11);
			//alert(id);
			console.log("listing ID: " + listingToRemove);
			var listing = savedListings.find(function(e) {
				return e.listingID == listingToRemove;
			});
			$('#removeFromSavedLabel').html('Confirm: Remove "' + listing.title + '" from your saved list');
			$('#confirmRemoveFromSavedModal').modal('show');
		}
		else if ($(this).data('id') != null && $(this).data('id').includes('deleteListing')) {
			listingToDelete = $(this).data('id').substring(13);
			//alert(id);
			console.log("listing ID: " + listingToDelete);
			var listing = myListings.find(function(e) {
				return e.listingID == listingToDelete;
			});
			$('#deleteListingLabel').html('Confirm: Delete "' + listing.title + '"');
			$('#confirmDeleteListingModal').modal('show');
		} 
	});
	
	$('#removeFromSavedBtn').click(function() {
		$('#confirmRemoveFromSavedModal').modal('hide');
		var status = sendDataSync("{'listingID': '" + listingToRemove + "', 'onid': '"+sessionStorage.getItem('onid')+"'}", "removeListingFromSavedList", "SavedListingController");
		if (status == 'JDBC_OK') {
			$('#listingRemovedModal').modal('show');
			setTimeout(function() {
				window.location.href = 'home.html';
			}, 2000);
		}
	});
	
	$('#deleteListingBtn').click(function() {
		$('#confirmDeleteListingModal').modal('hide');
		var status = sendDataSync("{'listingID': '" + listingToDelete + "'}", "deleteListing", "ListingController");
		if (status == 'JDBC_OK') {
			$('#listingDeletedModal').modal('show');
			setTimeout(function() {
				window.location.href = 'home.html';
			}, 2000);
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
