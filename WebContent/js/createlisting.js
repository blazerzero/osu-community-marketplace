$(document).ready(function() {
	var fileAdder = document.getElementById('fileAdder');
	var fileList = [];
	
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
					+	'<button type="button" class="close" aria-label="Close" id="closeNotifyX" data-id="'+i+'">'
		        	+	  '<span aria-hidden="true">&times;</span>'
		        	+	'</button>'
		        	+ '</div>'
			);
		}
	});
	
	$('.close').click(function() {
		alert('hi');
		console.log('data id: ' + $(this).data('id'));
		var idx = $(this).data('id');
		fileList.splice(idx, 1);
		$('#uploadedFiles').html('');
		for (var i = 0; i < fileList.length; i++) {
			$('#uploadedFiles').append(
					  '<div>'
					+	fileList[i].name
					+	'<button type="button" class="close" aria-label="Close" id="closeNotifyX" data-id="'+i+'">'
		        	+	  '<span aria-hidden="true">&times;</span>'
		        	+	'</button>'
		        	+ '</div>'
			);
		}
	})
	
	
});