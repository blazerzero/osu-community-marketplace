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