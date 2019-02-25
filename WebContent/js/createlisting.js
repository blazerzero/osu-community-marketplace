var fileList = [];
var fileNames = [];
var statusCodes = [];

$(document).ready(function() {
	
	var fileAdder = document.getElementById('fileAdder');
	
	$('#addImageBtn').click(function() {
		$('#fileAdder').click();
	});
	
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
	
	$('#postListingBtn').click(function() {
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
		} else if (isNaN($('#listingPrice').val())) {
			ready = false;
			$('#incompleteFormAlert').html('Price must be a number.');
			$('#incompleteFormAlert').css('display', 'block');
		} else $('#listingPriceSection').css('box-shadow', '0 0 0 white');
		
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
			/*setTimeout(function() {
				console.log(fileNames);
			}, 1000);*/
			/*var allImagesUploaded = true;
			$.each(statusCodes, function(index, value) {
				if (value.substring(0,7) != 'SUCCESS') allImagesUploaded = false;
				else fileNames.push(value.substring(8));
			});
			console.log(fileNames);
			if (!allImagesUploaded) {
				$('#incompleteFormAlert').removeClass('alert-danger');
				$('#incompleteFormAlert').addClass('alert-warning');
				$('#incompleteFormAlert').html('WARNING: Not all images were successfully uploaded to the server.');
				$('#incompleteFormAlert').css('display', 'block');
			}*/
			var newListing = new Object();
			newListing.onid = sessionStorage.getItem('onid'); // once connected with ONID, this should hold the ONID of the logged-in user
			newListing.title = $('#listingTitle').val();
			newListing.type = type;
			newListing.campus = $('#selectListingCampus').val();
			newListing.description = descriptionText;
			//newListing.imageIDs = fileNames.toString();
			//newListing.imageIDs = '';
			newListing.datePosted = new Date().getTime();
			newListing.price = $('#listingPrice').val();
			newListing.payFrequency = (type[0] == 'h' ? $('#selectPayFrequency').val() : '');
			if (newListing.payFrequency == 'once') newListing.payFrequency = '';
			newListing.showEmail = $('#selectShowEmail').val();
			newListing.otherContact = $('#listingContact').val();
			newListing.tags = $('#listingTags').val();
			console.log(JSON.stringify(newListing));
			var listingID = sendDataSync(JSON.stringify(newListing), "addListing", "ListingController");
			//var status = "JDBC_OK";
			console.log(listingID);
			if (fileList.length > 0) {
			 	$.each(fileList, function(index, file) {
			 		var numLeftToUpload = fileList.length - index;
					sendFile(file, type[0], listingID, numLeftToUpload);
				});
			}
			else {
				$('#postListingBtn').removeClass('btn-primary');
				$('#postListingBtn').addClass('btn-success');
				$('#postListingBtn').attr('disabled', 'disabled');
				$('#postListingBtn').html('Posted!');
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