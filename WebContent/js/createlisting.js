var fileList = [];

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
		var reader = new FileReader();
		for (var i = 0; i < fileAdder.files.length; i++) {
			if (!fileList.includes(fileAdder.files[i])) {
				console.log('file: ' + fileAdder.files[i].name);
				fileList.push(fileAdder.files[i]);
				if (fileList.length == 15) {
					$('#addImageBtn').attr('disabled', 'disabled');
					if (i < fileAdder.files.length - 1) {
						//$('#uploadErrorAlert').html('Not all photos could be uploaded. Maximum number of photos reached.');
						$('#uploadErrorAlert').css('display', 'block');
					}
				}
			}
		}
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
		} else $('#listingPriceSection').css('box-shadow', '0 0 0 white');
		
		if ($('#selectShowEmail').val() == '') {
			ready = false;
			$('#showEmailSection').css('box-shadow', '0 0 5px red');
			$('#incompleteFormAlert').html('Please fill all required fields.');
			$('#incompleteFormAlert').css('display', 'block');
		} else $('#showEmailSection').css('box-shadow', '0 0 0 white');
		
		if ($.isNumeric($('#listingPrice').val())) {
			$('#incompleteFormAlert').html('Price must be a number.');
			$('#incompleteFormAlert').css('display', 'block');
		}
		
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
			/* code to post listing */
			var type = "";
			if ($('#selectListingType').val() == 'p') type = 'product';
			else if ($('#selectListingType').val() == 's') type = 'service';
			else if ($('#selectListingType').val() == 'h') type = 'housing';
			console.log('type: ' + type);
			var fileNames = [];
			$.each(fileList, function(index, file) {
				fileNames.push(file.name);
				sendFile(file, type[0]);
			});
			console.log(fileNames);
			var newListing = new Object();
			newListing.onid = sessionStorage.getItem('onid'); // once connected with ONID, this should hold the ONID of the logged-in user
			newListing.title = $('#listingTitle').val();
			newListing.type = type;
			newListing.campus = $('#selectListingCampus').val();
			newListing.description = $('#listingDescription').val();
			//newListing.imageIDs = fileNames.toString();
			newListing.imageIDs = '';
			newListing.datePosted = new Date().getTime();
			newListing.price = $('#listingPrice').val();
			newListing.payFrequency = (type[0] == 'h' ? $('#selectPayFrequency').val() : '');
			if (newListing.payFrequency == 'once') newListing.payFrequency = '';
			newListing.showEmail = $('#selectShowEmail').val();
			newListing.otherContact = $('#listingContact').val();
			newListing.tags = $('#listingTags').val();
			console.log(JSON.stringify(newListing));
			//var status = sendDataSync(JSON.stringify(newListing), "addListing", "ListingController");
			var status = "JDBC_OK";
			console.log(status);
			/*if (status == "JDBC_OK") {
				$('#postListingBtn').removeClass('btn-primary');
				$('#postListingBtn').addClass('btn-success');
				$('#postListingBtn').attr('disabled', 'disabled');
				$('#postListingBtn').html('Posted!');
				setTimeout(function() {
					window.location.href = "./mylistings.html";
				}, 1000);
			}*/
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
}

function sendFile(file, type) {
	var formData = new FormData();
	var request = new XMLHttpRequest();
	
	var url = 'http://www.worksbythepg.com/osucm-images/image_upload.php/';
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
			console.log(request);
			if (request.response.includes('SUCCESS')) {
				console.log(file.name + ' has been uploaded to ' + url);
			}
		}
	}
}