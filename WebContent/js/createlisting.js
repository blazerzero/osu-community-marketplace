var fileList = [];

$(document).ready(function() {
	var fileAdder = document.getElementById('fileAdder');
	
	$('#addImageBtn').click(function() {
		$('#fileAdder').click();
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
		} else $('#listingTitleSection').css('box-shadow', '0 0 0 white');
		
		if ($('#listingDescription').val() == '') {
			ready = false;
			$('#listingDescriptionSection').css('box-shadow', '0 0 5px red');
		} else $('#listingDescriptionSection').css('box-shadow', '0 0 0 white');
		
		if ($('#selectListingType').val() == '') {
			ready = false;
			$('#listingTypeSection').css('box-shadow', '0 0 5px red');
		} else $('#listingTypeSection').css('box-shadow', '0 0 0 white');
		
		if ($('#listingPrice').val() == '') {
			ready = false;
			$('#listingPriceSection').css('box-shadow', '0 0 5px red');
		} else $('#listingPriceSection').css('box-shadow', '0 0 0 white');
		
		if ($('#selectShowEmail').val() == '') {
			ready = false;
			$('#showEmailSection').css('box-shadow', '0 0 5px red');
		} else $('#showEmailSection').css('box-shadow', '0 0 0 white');
		
		if ($('#selectShowPhone').val() == '') {
			ready = false;
			$('#showPhoneSection').css('box-shadow', '0 0 5px red');
		} else $('#showPhoneSection').css('box-shadow', '0 0 0 white');
		
		if (ready) {
			/* code to post listing */
			var type = "";
			if ($('#listingType').val() == 'p') type = 'product';
			else if ($('#listingType').val() == 's') type = 'service';
			else if ($('#listingType').val() == 'h') type = 'housing';
			var newListing = new Object();
			newListing.onid = "habibelo"; // once connected with ONID, this should hold the ONID of the logged-in user
			newListing.title = $('#listingTitle').val();
			newListing.type = type;
			newListing.description = $('#listingDescription').val();
			newListing.datePosted = new Date().getTime();
			newListing.price = $('#listingPrice').val();
			newListing.showEmail = $('#selectShowEmail').val();
			newListing.showPhone = $('#selectShowPhone').val();
			// var status = sendDataSync(JSON.stringify(newListing), "addListing", "ListingController");
			var status = "JDBC_OK";
			if (status == "JDBC_OK") {
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
}