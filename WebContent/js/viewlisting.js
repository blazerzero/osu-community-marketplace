$(document).ready(function() {
	var url = new URL(window.location.href);
	var listingID = url.searchParams.get("listingID");
	
	var detailsJSON = sendDataSync("{'listingID': '"+listingID+"'}", "getListingDetails", "ListingController");
	console.log(detailsJSON);
	var listingDetails = jQuery.parseJSON(detailsJSON);
	
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
	$('#listingDescription').append(listingDetails.description);
	$('#listingPrice').append(buildPrice(listingDetails.price, listingDetails.payFrequency));
	$('#listingEmail').append(listingDetails.email);
	$('#listingShowEmail').append(listingDetails.showEmail);
	$('#listingOtherContact').append(listingDetails.otherContact);
	$('#listingEmail').click(function() {
		window.location.href="mailto:"+listingDetails.email+"?subject="+subject;
	});
	
	if (listingDetails.onid == sessionStorage.getItem('onid')) $('#listingPoster').append(' (You)');
	
	if (listingDetails.imageIDs != '') {
		var imageIDs = listingDetails.imageIDs.split(',');
		$('#listingCarouselIndicators').append('<li data-target="#listingImageDiv" data-slide-to="0" class="active"></li>');
		$('#listingImages').append(
				  '<div class="carousel-item active">'
	    		+	'<img src="worksbythepg.com/osucm-images/'+typeIndicator+'/'+imageIDs[0]+'" id="view-listing-img" alt="listing image">'
	    		+ '</div>'
		);
		for (i = 1; i < imageIDs.length; i++) {
			$('#listingCarouselIndicators').append('<li data-target="#listingImageDiv" data-slide-to="0"></li>');
			$('#listingImages').append(
					  '<div class="carousel-item">'
		    		+	'<img src="worksbythepg.com/osucm-images/'+typeIndicator+'/'+imageIDs[i]+'" id="view-listing-img" alt="listing image">'
		    		+ '</div>'
			);
		}
	}
	
	// insert code to check if the user has already saved this listing
	// retrieve the list of the user's saved listings and check if this listing is in that list
	
	$('#saveListingBtn').click(function() {
		var savedListing = new Object;
		savedListing.onid = sessionStorage.getItem('onid'); // this should hold the ONID of the logged-in user
		savedListing.listingID = listingID;
		savedListing.dateSaved = new Date().getTime();
		// var status = sendDataSync(JSON.stringify(savedListing), "saveListing", "ListingController");
		var status = "JDBC_OK";
		if (status == "JDBC_OK") {
			$('#saveListingBtn').removeClass('btn-primary');
			$('#saveListingBtn').addClass('btn-success');
			$('#saveListingBtn').attr('disabled', 'disabled');
			$('#saveListingBtn').html('Saved!');
		}
	});
});