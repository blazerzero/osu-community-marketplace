$(document).ready(function() {
	
	var listingToRemove = 0;
	
	var url = new URL(window.location.href);
	var listingID = url.searchParams.get("listingID");
	
	var detailsJSON = sendDataSync("{'listingID': '"+listingID+"'}", "getListingDetails", "ListingController");
	console.log(detailsJSON);
	//var listingDetails = jQuery.parseJSON(detailsJSON);
	if (detailsJSON != null && detailsJSON.length > 0) {
		listingDetails = jQuery.parseJSON(detailsJSON);
	}
	
	var imageIDs = listingDetails.imageIDs;
	var imageIDList = imageIDs.split(', ');
	console.log(imageIDList);
	imageIDList.shift();
	listingDetails.imageIDs = imageIDList;
	
	$(document).attr('title', listingDetails.title + ' - OSU Community Marketplace');

	//var otherContact = '(555) 555-1234';
	var subject = 'Inquiry About ' + listingDetails.title + ' [via OSU Community Marketplace]';
	
	var typeIndicator = listingDetails.type[0];
	
	if (typeIndicator == 'h') {
		$('#listingPayFrequency').css('display', 'block');
	}
	
	var datePosted = new Date(listingDetails.datePosted).toString().substring(4,15);
	
	$('#page-title').append(listingDetails.title);
	$('#listingPoster').append(listingDetails.firstname+' '+listingDetails.middlename+' '+listingDetails.lastname);
	$('#listingDatePosted').append(buildDatePosted(listingDetails.datePosted));
	$('#listingType').append(listingDetails.type.charAt(0).toUpperCase() + listingDetails.type.slice(1));
	$('#listingCampus').append((listingDetails.campus == 'Bend' ? 'Bend (Cascades)' : (listingDetails.campus == 'Other' ? 'Other (See description)' : listingDetails.campus)));
	$('#listingDescription').append(listingDetails.description);
	$('#listingPrice').append(buildPrice(listingDetails.price, listingDetails.payFrequency));
	$('#listingEmail').append(listingDetails.email);
	$('#listingShowEmail').append(listingDetails.showEmail);
	if (listingDetails.otherContact != '') {
		$('#listingOtherContact').append(listingDetails.otherContact);
	}
	else {
		$('#listingOtherContact').css('display', 'none');
	}
	var tags = listingDetails.tags.split(", ");
	var filtered = tags.filter(function (el) {
		return (el != "" && el != null);
	});
	tags = filtered;
	console.log(tags);
	console.log(tags.length);
	if (tags.length == 0) {
		$('#listingTags').css('display', 'none');
	}
	for (i = 0; i < tags.length; i++) {
		console.log(tags[i]);
		$('#listingTags').append('<span class="listing-tag"><a href="search.html?type='+listingDetails.type+'&query='+tags[i]+'">'+tags[i]+'</a></span>');
	}
	$('#listingEmail').click(function() {
		window.location.href="mailto:"+listingDetails.email+"?subject="+subject;
	});
	
	if (listingDetails.onid == sessionStorage.getItem('onid')) $('#listingPoster').append(' (You)');
	
	if (listingDetails.imageIDs.length != 0) {
		$('#listingCarouselIndicators').append('<li data-target="#listingImageDiv" data-slide-to="0" class="active"></li>');
		$('#listingImages').append(
				  '<div class="carousel-item active">'
	    		+	'<img src="http://www.worksbythepg.com/osucm-images/'+typeIndicator+'/'+listingDetails.imageIDs[0]+'" id="view-listing-img" alt="listing image">'
	    		+ '</div>'
		);
		for (i = 1; i < listingDetails.imageIDs.length; i++) {
			$('#listingCarouselIndicators').append('<li data-target="#listingImageDiv" data-slide-to="0"></li>');
			$('#listingImages').append(
					  '<div class="carousel-item">'
		    		+	'<img src="http://www.worksbythepg.com/osucm-images/'+typeIndicator+'/'+listingDetails.imageIDs[i]+'" id="view-listing-img" alt="listing image">'
		    		+ '</div>'
			);
		}
	}
	
	// insert code to check if the user has already saved this listing
	// retrieve the list of the user's saved listings and check if this listing is in that list
	var savedListingJSON = sendDataSync("{'onid': '"+sessionStorage.getItem('onid')+"'}", "getSavedListings", "SavedListingController");
	console.log(savedListingJSON);
	savedListingList = []
	if (savedListingJSON != null && savedListingJSON.length > 0) {
		savedListingList = jQuery.parseJSON(savedListingJSON);
	}
	
	for (i = 0; i < savedListingList.length; i++) {
		if (savedListingList[i].onid == sessionStorage.getItem('onid')) {
			$('#saveListingBtn').removeClass('btn-primary');
			$('#saveListingBtn').addClass('btn-danger');
			//$('#saveListingBtn').attr('disabled', 'disabled');
			$('#saveListingBtn').html('Remove from Saved List');
		}
	}
	
	$('#saveListingBtn').click(function() {
		var savedListing = new Object;
		savedListing.onid = sessionStorage.getItem('onid'); // this should hold the ONID of the logged-in user
		savedListing.listingID = listingID;
		savedListing.dateSaved = new Date().getTime();
		if ($('#saveListingBtn').hasClass('btn-primary')) {
			var status = sendDataSync(JSON.stringify(savedListing), "saveListing", "SavedListingController");
			//var status = "JDBC_OK";
			if (status == "JDBC_OK") {
				$('#saveListingBtn').removeClass('btn-primary');
				$('#saveListingBtn').addClass('btn-success');
				$('#saveListingBtn').attr('disabled', 'disabled');
				$('#saveListingBtn').html('Saved!');
			}
		}
		else if ($('#saveListingBtn').hasClass('btn-danger')) {
			console.log("listing ID: " + listingID);
			
			$('#removeFromSavedLabel').html('Confirm: Remove "' + listingDetails.title + '" from your saved list');
			$('#confirmRemoveFromSavedModal').modal('show');
		}
	});
	
	$('#removeFromSavedBtn').click(function() {
		$('#confirmRemoveFromSavedModal').modal('hide');
		var status = sendDataSync("{'listingID': '" + listingID + "', 'onid': '"+sessionStorage.getItem('onid')+"'}", "removeListingFromSavedList", "SavedListingController");
		if (status == 'JDBC_OK') {
			$('#listingRemovedModal').modal('show');
			setTimeout(function() {
				window.location.href = 'search.html?type='+listingDetails.type;
			}, 2000);
		}
	});
});