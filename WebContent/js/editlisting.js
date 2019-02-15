$(document).ready(function() {
	var url = new URL(window.location.href);
	var listingID = url.searchParams.get("listingID");
	
	var detailsJSON = sendDataSync("{'listingID': '"+listingID+"'}", "getListingDetails", "ListingController");
	console.log(detailsJSON);
	var listingsDetails = [];
	if (detailsJSON != null && detailsJSON.length > 0) {
		listingDetails = jQuery.parseJSON(detailsJSON);
	}
	
	var originalListingDetails = listingDetails;
	
	if (sessionStorage.getItem('onid') != listingDetails.onid) {
		alert('You can\'t edit someone else\'s listing.');
		window.location.href = 'home.html';
	}
	
	$(document).attr('title', 'Edit Listing: ' + listingDetails.title + ' - OSU Community Marketplace');

	$('#page-title').html('Edit Listing: ' + listingDetails.title);
	$('#listingTitle').val(listingDetails.title);
	$('#selectListingCampus').val(listingDetails.campus);
	$('#listingDescription').val(listingDetails.description);
	$('#selectListingType').val(listingDetails.type[0]);
	$('#listingPrice').val(buildPrice(listingDetails.price));
	if (listingDetails.type == 'housing') {
		$('#selectPayFrequency').val(listingDetails.payFrequency);
		$('#payFrequencyLabel').css('display', 'block');
		$('#selectPayFrequency').css('display', 'block');
	}
	
	$('#selectListingType').change(function() {
		if ($('#selectListingType').val() == 'h') {
			$('#selectPayFrequency').val("mo");
			$('#payFrequencyLabel').css('display', 'block');
			$('#selectPayFrequency').css('display', 'block');
		}
		else {
			$('#selectPayFrequency').val("once");
			$('#payFrequencyLabel').css('display', 'none');
			$('#selectPayFrequency').css('display', 'none');
		}
	});
	
	$('#selectShowEmail').val(listingDetails.showEmail);
	$('#listingContact').val(listingDetails.otherContact);
	$('#listingTags').val(listingDetails.tags);
	
	/*$('#listingTitle').keyup(function(e) {
		//print(e);
		console.log(e);
		if (checkChanges(originalListingDetails)) {
			$('#saveChangesBtn').removeAttr('disabled');
			$('#saveChangesBtn').html('Save Changes');
		}
		else {
			$('#saveChangesBtn').attr('disabled', 'disabled');
			$('#saveChangesBtn').html('No Changes Made');
		}
	});
	
	$('#selectListingCampus').keyup(function(e) {
		//print(e);
		console.log(e);
		if (checkChanges(originalListingDetails)) {
			$('#saveChangesBtn').removeAttr('disabled');
			$('#saveChangesBtn').html('Save Changes');
		}
		else {
			$('#saveChangesBtn').attr('disabled', 'disabled');
			$('#saveChangesBtn').html('No Changes Made');
		}
	});
	
	$('#listingDescription').keyup(function(e) {
		//print(e);
		console.log(e);
		if (checkChanges(originalListingDetails)) {
			$('#saveChangesBtn').removeAttr('disabled');
			$('#saveChangesBtn').html('Save Changes');
		}
		else {
			$('#saveChangesBtn').attr('disabled', 'disabled');
			$('#saveChangesBtn').html('No Changes Made');
		}
	});
	
	$('#selectListingType').keyup(function(e) {
		//print(e);
		console.log(e);
		if (checkChanges(originalListingDetails)) {
			$('#saveChangesBtn').removeAttr('disabled');
			$('#saveChangesBtn').html('Save Changes');
		}
		else {
			$('#saveChangesBtn').attr('disabled', 'disabled');
			$('#saveChangesBtn').html('No Changes Made');
		}
	});
	
	$('#listingPrice').keyup(function(e) {
		//print(e);
		console.log(e);
		if (checkChanges(originalListingDetails)) {
			$('#saveChangesBtn').removeAttr('disabled');
			$('#saveChangesBtn').html('Save Changes');
		}
		else {
			$('#saveChangesBtn').attr('disabled', 'disabled');
			$('#saveChangesBtn').html('No Changes Made');
		}
	});
	
	$('#selectPayFrequency').keyup(function(e) {
		//print(e);
		console.log(e);
		if (checkChanges(originalListingDetails)) {
			$('#saveChangesBtn').removeAttr('disabled');
			$('#saveChangesBtn').html('Save Changes');
		}
		else {
			$('#saveChangesBtn').attr('disabled', 'disabled');
			$('#saveChangesBtn').html('No Changes Made');
		}
	});
	
	$('#selectShowEmail').keyup(function(e) {
		//print(e);
		console.log(e);
		if (checkChanges(originalListingDetails)) {
			$('#saveChangesBtn').removeAttr('disabled');
			$('#saveChangesBtn').html('Save Changes');
		}
		else {
			$('#saveChangesBtn').attr('disabled', 'disabled');
			$('#saveChangesBtn').html('No Changes Made');
		}
	});
	
	$('#listingContact').keyup(function(e) {
		//print(e);
		console.log(e);
		if (checkChanges(originalListingDetails)) {
			$('#saveChangesBtn').removeAttr('disabled');
			$('#saveChangesBtn').html('Save Changes');
		}
		else {
			$('#saveChangesBtn').attr('disabled', 'disabled');
			$('#saveChangesBtn').html('No Changes Made');
		}
	});
	
	$('#listingTags').keyup(function(e) {
		//print(e);
		console.log("checking tag changes");
		if (!checkChanges(originalListingDetails)) {
			$('#saveChangesBtn').removeAttr('disabled');
			$('#saveChangesBtn').html('Save Changes');
		}
		else {
			$('#saveChangesBtn').attr('disabled', 'disabled');
			$('#saveChangesBtn').html('No Changes Made');
		}
	});*/
	
	$('#saveChangesBtn').click(function() {
		var ready = true;
		if ($('#listingTitle').val() == '') {
			ready = false;
			$('#listingTitleSection').css('box-shadow', '0 0 5px red');
			$('#incompleteFormAlert').html('Please fill all required fields.');
			$('#incompleteFormAlert').css('display', 'block');
		} else $('#listingTitleSection').css('box-shadow', '0 0 0 white');
		
		if ($('#selectListingCampus').val() == '') {
			ready = false;
			$('#listingCampusSection').css('box-shadow', '0 0 5px red');
			$('#incompleteFormAlert').html('Please fill all required fields.');
			$('#incompleteFormAlert').css('display', 'block');
		} else $('#listingCampusSection').css('box-shadow', '0 0 0 white');
		
		if ($('#listingDescription').val() == '') {
			ready = false;
			$('#listingDescriptionSection').css('box-shadow', '0 0 5px red');
			$('#incompleteFormAlert').html('Please fill all required fields.');
			$('#incompleteFormAlert').css('display', 'block');
		} else $('#listingDescriptionSection').css('box-shadow', '0 0 0 white');
		
		if ($('#selectListingType').val() == '') {
			ready = false;
			$('#listingTypeSection').css('box-shadow', '0 0 5px red');
			$('#incompleteFormAlert').html('Please fill all required fields.');
			$('#incompleteFormAlert').css('display', 'block');
		} else $('#listingTypeSection').css('box-shadow', '0 0 0 white');
		
		if ($('#listingPrice').val() == '') {
			ready = false;
			$('#listingPriceSection').css('box-shadow', '0 0 5px red');
			$('#incompleteFormAlert').html('Please fill all required fields.');
			$('#incompleteFormAlert').css('display', 'block');
		} 
		else if ($.isNumeric($('#listingPrice').val())) {
			$('#incompleteFormAlert').html('Price must be a number.');
			$('#incompleteFormAlert').css('display', 'block');
		}
		else $('#listingPriceSection').css('box-shadow', '0 0 0 white');
		
		if ($('#selectShowEmail').val() == '') {
			ready = false;
			$('#showEmailSection').css('box-shadow', '0 0 5px red');
			$('#incompleteFormAlert').html('Please fill all required fields.');
			$('#incompleteFormAlert').css('display', 'block');
		} else $('#showEmailSection').css('box-shadow', '0 0 0 white');
		
		/*if ($('#listingDescription').val().includes('"') 
				|| $('#listingDescription').val().includes('"')
				|| $('#listingDescription').val().includes('\\')
				|| $('#listingDescription').val().includes('\n')
				|| $('#listingDescription').val().includes('\t')
				|| $('#listingDescription').val().includes('\r')) {
			$('#incompleteFormAlert').html('Description cannot have double quotes, backslashes, returns, or tabs.');
			$('#incompleteFormAlert').css('display', 'block');
		}*/
		
		if (ready) {
			$('#incompleteFormAlert').css('display', 'none');
			var descriptionText = $('#listingDescription').val().replace(/\r?\n|\r/g, "; ").replace('"', "'");
			//$('#listingDescription').val(descriptionText);
			
			/* code to post listing */
			var type = "";
			if ($('#selectListingType').val() == 'p') type = 'product';
			else if ($('#selectListingType').val() == 's') type = 'service';
			else if ($('#selectListingType').val() == 'h') type = 'housing';
			console.log('type: ' + type);
			var fileNames = [];
			/*$.each(fileList, function(index, file) {
				fileNames.push(file.name);
				sendFile(file, type[0]);
			});*/
			console.log(fileNames);
			var newListing = new Object();
			newListing.listingID = originalListingDetails.listingID;
			newListing.onid = sessionStorage.getItem('onid'); // once connected with ONID, this should hold the ONID of the logged-in user
			newListing.title = $('#listingTitle').val();
			newListing.type = type;
			newListing.campus = $('#selectListingCampus').val();
			newListing.description = descriptionText;
			//newListing.imageIDs = fileNames.toString();
			//newListing.imageIDs = '';
			newListing.imageIDs = originalListingDetails.imageIDs;
			newListing.datePosted = new Date().getTime();
			newListing.price = $('#listingPrice').val();
			newListing.payFrequency = (type[0] == 'h' ? $('#selectPayFrequency').val() : '');
			if (newListing.payFrequency == 'once') newListing.payFrequency = '';
			newListing.showEmail = $('#selectShowEmail').val();
			newListing.otherContact = $('#listingContact').val();
			newListing.tags = $('#listingTags').val();
			console.log(JSON.stringify(newListing));
			var status = sendDataSync(JSON.stringify(newListing), "updateListing", "ListingController");
			//var status = "JDBC_OK";
			console.log(status);
			if (status == "JDBC_OK") {
				$('#saveChangesBtn').removeClass('btn-primary');
				$('#saveChangesBtn').addClass('btn-success');
				$('#saveChangesBtn').attr('disabled', 'disabled');
				$('#saveChangesBtn').html('Changes Saved!');
				setTimeout(function() {
					window.location.href = "./mylistings.html";
				}, 1000);
			}
		}
	});
});

/*function checkChanges(originalListingDetails) {
	if ($('#listingTitle').val() != originalListingDetails.title) {
		return false;
	}
	else if ($('#selectListingCampus').val() != originalListingDetails.campus) {
		return false;
	}
	else if ($('#listingDescription').val() != originalListingDetails.description) {
		return false;
	}
	else if ($('#selectListingType').val() != originalListingDetails.type) {
		return false;
	}
	else if ($('#listingPrice').val() != originalListingDetails.price) {
		return false;
	}
	else if ($('#selectPayFrequency').val() != originalListingDetails.payFrequency) {
		return false;
	}
	else if ($('#selectShowEmail').val() != originalListingDetails.showEmail) {
		return false;
	}
	else if ($('#listingContact').val() != originalListingDetails.otherContact) {
		return false;
	}
	else if ($('#listingTags').val() != originalListingDetails.tags) {
		return false;
	}
	else return true;
}*/