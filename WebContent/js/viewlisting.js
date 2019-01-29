$(document).ready(function() {
	var url = new URL(window.location.href);
	var listingID = url.searchParams.get("listingID");

	var onid = 'habibelo';
	var firstname = 'Omeed';
	var middlename = 'Alexander';
	var lastname = 'Habibelahian';
	var email = 'habibelo@oregonstate.edu';
	var type = 'p';
	var otherContact = '(555) 555-1234'
	var subject = 'Inquiry About [Listing Name] [via OSU Community Marketplace]';
	
	if (type == 'h') {
		$('#listPayFrequency').css('display', 'block');
	}
	
	$('#listingPoster').append(firstname+' '+middlename+' '+lastname);
	$('#listingEmail').append(email);
	$('#listingOtherContact').append(otherContact);
	$('#listingEmail').click(function() {
		window.location.href="mailto:"+email+"?subject="+subject;
	});
	
	// insert code to check if the user has already saved this listing
	// retrieve the list of the user's saved listings and check if this listing is in that list
	
	$('#saveListingBtn').click(function() {
		var savedListing = new Object;
		savedListing.onid = onid; // this should hold the ONID of the logged-in user
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