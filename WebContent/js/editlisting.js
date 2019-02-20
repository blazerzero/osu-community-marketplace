var numOriginalImages = 0;
var originalImages = [];
var fileList = [];
var statusCodes = [];
var originalListingDetails = [];

$(document).ready(function() {
	
	var fileAdder = document.getElementById('fileAdder');

	var url = new URL(window.location.href);
	var listingID = url.searchParams.get("listingID");
	
	var detailsJSON = sendDataSync("{'listingID': '"+listingID+"'}", "getListingDetails", "ListingController");
	console.log(detailsJSON);
	var listingsDetails = [];
	if (detailsJSON != null && detailsJSON.length > 0) {
		listingDetails = jQuery.parseJSON(detailsJSON);
	}
	
	originalListingDetails = listingDetails;
	
	if (sessionStorage.getItem('onid') != listingDetails.onid) {
		alert('You can\'t edit someone else\'s listing.');
		window.location.href = 'home.html';
	}
	
	$(document).attr('title', 'Edit Listing: ' + listingDetails.title + ' - OSU Community Marketplace');

	$('#page-title').html('Edit Listing: ' + originalListingDetails.title);
	$('#listingTitle').val(originalListingDetails.title);
	$('#selectListingCampus').val(originalListingDetails.campus);
	$('#listingDescription').val(originalListingDetails.description);
	$('#selectListingType').val(originalListingDetails.type[0]);
	$('#listingPrice').val(buildPrice(originalListingDetails.price));
	if (originalListingDetails.type == 'housing') {
		$('#selectPayFrequency').val(originalListingDetails.payFrequency);
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
	
	$('#selectShowEmail').val(originalListingDetails.showEmail);
	$('#listingContact').val(originalListingDetails.otherContact);
	$('#listingTags').val(originalListingDetails.tags);
	
	if (originalListingDetails.imageIDs != "") {
		originalImages = originalListingDetails.imageIDs.split(', ');
		console.log("originalImages: " + originalImages);
		originalImages.shift();
		originalListingDetails.imageIDs = originalImages.slice(0);
		numOriginalImages = originalImages.length;
	}
	
	console.log("originalListingDetails.imageIDs.length: " + originalListingDetails.imageIDs.length);
	
	if (numOriginalImages > 0) {
		$('.uploaded-photos-title').css('display', 'block');
	}
	
	$('#addImageBtn').click(function() {
		$('#fileAdder').click();
	});
	
	for (var i = 0; i < originalImages.length; i++) {
		$('#uploadedFiles').append(
				  '<div>'
				+	originalImages[i]
				+	'<button type="button" class="close" aria-label="Close" data-id="'+i+'" onclick="deletePhoto(this)">'
	        	+	  '<span aria-hidden="true">&times;</span>'
	        	+	'</button>'
	        	+ '</div>'
		);
	}
	
	fileAdder.addEventListener('change', function(e) {
		for (var i = 0; i < fileAdder.files.length; i++) {
			if (!fileList.includes(fileAdder.files[i])) {
				console.log('file: ' + fileAdder.files[i].name);
				fileList.push(fileAdder.files[i]);
				if (fileAdder.files[i].size <= 2097152) {
					if (fileList.length == 10) {
						$('#addImageBtn').attr('disabled', 'disabled');
						if (i < fileAdder.files.length - 1) {
							$('#uploadErrorAlert').html('Maximum number of images reached. The first 10 images will be uploaded.');
							$('#uploadErrorAlert').css('display', 'block');
							break;
						}
					}
				}
				else {
					$('#uploadErrorAlert').html('Some images exceed the maximum size limit.');
					$('#uploadErrorAlert').css('display', 'block');
				}
			}
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
		console.log("originalListingDetails.imageIDs.length: " + originalListingDetails.imageIDs.length);
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
		
		if (ready) {
			$('#incompleteFormAlert').css('display', 'none');
			var descriptionText = $('#listingDescription').val().replace(/\r?\n|\r/g, "; ").replace('"', "'");
			
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
			//newListing.imageIDs = originalListingDetails.imageIDs;
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
				console.log("fileList length: " + fileList.length);
				console.log("originalListingDetails.imageIDs length: " + originalListingDetails.imageIDs.length);
				console.log("num original images: " + numOriginalImages);
				if (fileList.length > 0 || originalListingDetails.imageIDs.length > 0) {
					$.each(originalListingDetails.imageIDs, function(index, value) {
						if (!originalImages.includes(value)) {
							deleteFileFromServer(value, type[0]);
						}
					});
					if (fileList.length == 0 && originalImages.length < numOriginalImages) {
						var status = sendDataSync("{'listingID': '"+listingID+"', 'imageIDs': '"+originalImages.join(', ')+"'}", "deleteImagesFromListing", "ListingController");
						console.log(status);
						if (status != 'JDBC_OK') {
							$('#incompleteFormAlert').removeClass('alert-danger');
							$('#incompleteFormAlert').addClass('alert-warning');
							$('#incompleteFormAlert').html('WARNING: Some images were not completely removed.');
							$('#incompleteFormAlert').css('display', 'block');
						}
						else {
							$('#saveChangesBtn').removeClass('btn-primary');
							$('#saveChangesBtn').addClass('btn-success');
							$('#saveChangesBtn').attr('disabled', 'disabled');
							$('#saveChangesBtn').html('Changes Saved!');
							setTimeout(function() {
								window.location.href = "./mylistings.html";
							}, 1000);
						}
					}
					else if (fileList.length > 0) {
						$.each(fileList, function(index, file) {
					 		var numLeftToUpload = fileList.length - index;
							sendFile(file, type[0], newListing.listingID, numLeftToUpload);
						});
					}
					/*else {
						var status = sendDataSync("{'listingID': '"+listingID+"', 'imageIDs': '"+savedName+"'}", "addImageIDToNewListing", "ListingController");
						console.log(status);
						if (status != 'JDBC_OK') {
							$('#incompleteFormAlert').removeClass('alert-danger');
							$('#incompleteFormAlert').addClass('alert-warning');
							$('#incompleteFormAlert').html('WARNING: Not all images were successfully uploaded to the server.');
							$('#incompleteFormAlert').css('display', 'block');
						}
						if (numLeftToUpload - 1 == 0) {
							$('#saveChangesBtn').removeClass('btn-primary');
							$('#saveChangesBtn').addClass('btn-success');
							$('#saveChangesBtn').attr('disabled', 'disabled');
							$('#saveChangesBtn').html('Changes Saved!');
							setTimeout(function() {
								window.location.href = "./mylistings.html";
							}, 1000);
						}
						$('#saveChangesBtn').removeClass('btn-primary');
						$('#saveChangesBtn').addClass('btn-success');
						$('#saveChangesBtn').attr('disabled', 'disabled');
						$('#saveChangesBtn').html('Changes Saved!');*/
						/*setTimeout(function() {
							window.location.href = "./mylistings.html";
						}, 1000);*/
					//}
				}
				else {
					$('#saveChangesBtn').removeClass('btn-primary');
					$('#saveChangesBtn').addClass('btn-success');
					$('#saveChangesBtn').attr('disabled', 'disabled');
					$('#saveChangesBtn').html('Changes Saved!');
					/*setTimeout(function() {
						window.location.href = "./mylistings.html";
					}, 1000);*/
				}
				/*$('#saveChangesBtn').removeClass('btn-primary');
				$('#saveChangesBtn').addClass('btn-success');
				$('#saveChangesBtn').attr('disabled', 'disabled');
				$('#saveChangesBtn').html('Changes Saved!');
				setTimeout(function() {
					window.location.href = "./mylistings.html";
				}, 1000);*/
			}
		}
	});
	
	$('#deleteListingBtn').click(function() {
		listingToDelete = originalListingDetails.listingID;
		//alert(id);
		console.log("listing ID: " + listingToDelete);
		$('#deleteListingLabel').html('Confirm: Delete "' + originalListingDetails.title + '"');
		$('#confirmDeleteListingModal').modal('show');
	});
	
	$('#confirmDeleteListingBtn').click(function() {
		$('#confirmDeleteListingModal').modal('hide');
		var status = sendDataSync("{'listingID': '" + listingToDelete + "'}", "deleteListing", "ListingController");
		if (status == 'JDBC_OK') {
			$('#listingDeletedModal').modal('show');
			setTimeout(function() {
				window.location.href = 'mylistings.html';
			}, 2000);
		}
	});
});

function deletePhoto(deleteBtn) {
	console.log(deleteBtn.getAttribute('data-id'));
	var idx = deleteBtn.getAttribute('data-id');
	console.log("idx: " + idx);
	console.log("numOriginalImages: " + numOriginalImages);
	console.log("original images: " + originalImages);
	console.log("originalListingDetails.imageIDs.length: " + originalListingDetails.imageIDs.length);
	if (idx < numOriginalImages) {
		console.log("originalImages length before: " + originalImages.length);
		originalImages.splice(idx, 1);
		console.log("originalImages length after: " + originalImages.length);
	}
	else {
		console.log("fileList length before: " + fileList.length);
		fileList.splice(idx - numOriginalImages, 1);
		console.log("fileList length after: " + fileList.length);
	}
	console.log("originalListingDetails.imageIDs.length: " + originalListingDetails.imageIDs.length);

	$('#uploadedFiles').html('');
	for (var i = 0; i < originalImages.length; i++) {
		$('#uploadedFiles').append(
				  '<div>'
				+	originalImages[i]
				+	'<button type="button" class="close" aria-label="Close" data-id="'+i+'" onclick="deletePhoto(this)">'
	        	+	  '<span aria-hidden="true">&times;</span>'
	        	+	'</button>'
	        	+ '</div>'
		);
	}
	for (var i = 0; i < fileList.length; i++) {
		$('#uploadedFiles').append(
				  '<div>'
				+	fileList[i].name
				+	'<button type="button" class="close" aria-label="Close" data-id="'+(i+numOriginalImages)+'" onclick="deletePhoto(this)">'
	        	+	  '<span aria-hidden="true">&times;</span>'
	        	+	'</button>'
	        	+ '</div>'
		);
	}
	if (fileList.length == 0 && originalImages.length == 0) {
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
					$('#saveChangesBtn').removeClass('btn-primary');
					$('#saveChangesBtn').addClass('btn-success');
					$('#saveChangesBtn').attr('disabled', 'disabled');
					$('#saveChangesBtn').html('Changes Saved!');
					setTimeout(function() {
						window.location.href = "./mylistings.html";
					}, 1000);
				}
			}
		}
	}
}

function deleteFileFromServer(filename, type) {
	console.log("deleting " + filename + " from server");
	var formData = new FormData();
	var request = new XMLHttpRequest();
	
	var baseURL = 'http://www.worksbythepg.com/osucm-images/';
	var url = baseURL + 'image_deletion.php/';
	formData.append('filename', filename);
	formData.append('type', type);
	request.open("POST", url, true);
	request.send(formData);
	
	request.onreadystatechange = function() {
		if (request.readyState == 4 && (request.status == 200 || request.status == 201 || request.status == 202)) {
			console.log(request.response);
			if (request.response == 'SUCCESS') {
				console.log(filename + " has been deleted from the server.");
			}
			else {
				console.warn("WARNING: some images may not have been deleted from the server.");
			}
		}
	}
}