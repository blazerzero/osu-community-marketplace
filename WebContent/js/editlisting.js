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
	
	fileAdder.addEventListener('change', function(e) {
		//var reader = new FileReader();
		for (var i = 0; i < fileAdder.files.length; i++) {
			//if (!fileList.includes(fileAdder.files[i])) {
				console.log('file: ' + fileAdder.files[i].name);
				fileList.push(fileAdder.files[i]);
				if (fileList.length == 15) {
					$('#addImageBtn').attr('disabled', 'disabled');
					if (i < fileAdder.files.length - 1) {
						//$('#uploadErrorAlert').html('Not all photos could be uploaded. Maximum number of photos reached.');
						$('#uploadErrorAlert').css('display', 'block');
					}
				}
			//}
		}
		if (fileList.length > 0) {
			$('.uploaded-photos-title').css('display', 'block');
		}
		//$('#uploadedFiles').html('');
		for (var i = 0; i < fileList.length; i++) {
			$('#uploadedFiles').append(
					  '<div>'
					+	fileList[i].name
					+	'<button type="button" class="close" aria-label="Close" data-id="'+i+'" onclick="deletePhoto(this)">'
		        	+	  '<span aria-hidden="true">&times;</span>'
		        	+	'</button>'
		        	+ '</div>'
			);
		}
	});
	
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

function deletePhoto(deleteBtn) {
	console.log(deleteBtn.getAttribute('data-id'));
	var idx = deleteBtn.getAttribute('data-id');
	fileList.splice(idx, 1);
	$('#uploadedFiles').html('');
	for (var i = 0; i < fileList.length; i++) {
		$('#uploadedFiles').append(
				  '<div>'
				+	fileList[i].name
				+	'<button type="button" class="close" aria-label="Close" data-id="'+i+'" onclick="deletePhoto(this)">'
	        	+	  '<span aria-hidden="true">&times;</span>'
	        	+	'</button>'
	        	+ '</div>'
		);
	}
	if (fileList.length == 0) {
		$('.uploaded-photos-title').css('display', 'none');
	}
}

function sendFile(file, type, listingID, numLeftToUpload) {
	var formData = new FormData();
	var request = new XMLHttpRequest();
	
	var baseURL = 'http://www.worksbythepg.com/osucm-images/';
	var url = baseURL + 'image_upload.php/';
	formData.append('image', file);
	formData.append('type', type);
	console.log(url);
	console.log(Array.from(formData.entries()));
	request.open("POST", url, true);
	//request.setRequestHeader("Content-Type", "multipart/form-data");
	//request.setRequestHeader("Access-Control-Request-Method", "POST");
	//request.setRequestHeader("Access-Control-Request-Headers", "X-Custom-Header");
	request.send(formData);
	
	request.onreadystatechange = function() {
		if (request.readyState == 4 && (request.status == 200 || request.status == 201 || request.status == 202)) {
			console.log(request.response);
			var xml = $.parseXML( request.response );
			var response = $( xml );
			var code = response.find("code").text();
			statusCodes.push(code);
			console.log(statusCodes);
			console.log(code);
			if (code == 'SUCCESS') {
				var savedName = response.find("message").text();
				console.log(file.name + ' has been uploaded to ' + baseURL + type + ' as ' + savedName);
				//fileNames.push(savedName);
				//console.log(fileNames);
				console.log("id: " + listingID);
				var status = sendDataSync("{'listingID': '"+listingID+"', 'imageIDs': '"+savedName+"'}", "addImageIDToNewListing", "ListingController");
				console.log(status);
				if (status != 'JDBC_OK') {
					$('#incompleteFormAlert').removeClass('alert-danger');
					$('#incompleteFormAlert').addClass('alert-warning');
					$('#incompleteFormAlert').html('WARNING: Not all images were successfully uploaded to the server.');
					$('#incompleteFormAlert').css('display', 'block');
				}
				if (numLeftToUpload - 1 == 0) {
					$('#postListingBtn').removeClass('btn-primary');
					$('#postListingBtn').addClass('btn-success');
					$('#postListingBtn').attr('disabled', 'disabled');
					$('#postListingBtn').html('Posted!');
					setTimeout(function() {
						window.location.href = "./mylistings.html";
					}, 1000);
				}
			}
		}
	}
}