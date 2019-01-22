$(document).ready(function() {
  var bgImgPath = './splash/' + chooseBackgroundImg();
  $('#splashImg').attr('src', bgImgPath);
  $('#splashImg').fadeIn(1000);

  $('#closeNotifyX, #closeNotifyBtn').click(function () {
    $('#notifyEmail').val('');
    $('#invalidNotifyEmailAlert').hide();
  });
  
  

  $('#submitNotifyBtn').click(function() {
	var notifyObj = new Object();
    notifyObj.email = $('#notifyEmail').val();
    var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
    if (notifyObj.email == '') {
      $('#invalidNotifyEmailAlert').html("Please enter an email address.");
  		$('#invalidNotifyEmailAlert').show();
    }
    if (!pattern.test(notifyObj.email)) {
      $('#invalidNotifyEmailAlert').html("Invalid email address.");
  		$('#invalidNotifyEmailAlert').show();
    }
    else {
      $('#notifyEmail').val('');
      console.log(JSON.stringify(notifyObj));
      var status = sendDataSync(JSON.stringify(notifyObj), "addNotifyEmail", "NotifyController");
      if (status == "JDBC_OK") {
	      $('#invalidNotifyEmailAlert').hide();
	      $('#notifyEmailLabel').css('display', 'none');
	      $('#notifyEmail').css('display', 'none');
	      $('#closeNotifyBtn').css('display', 'none');
	      $('#submitNotifyBtn').css('display', 'none');
	      $('#notifySuccessAlert').show();
	
	      setTimeout(function() {
	        $('#notifySuccessAlert').hide();
	        $('#notifyMeModal').modal('hide');
	        setTimeout(function() {
	        	$('#notifyEmailLabel').css('display', 'block');
			    $('#notifyEmail').css('display', 'block');
				$('#closeNotifyBtn').css('display', 'block');
				$('#submitNotifyBtn').css('display', 'block');
	        }, 1000);
	      }, 3000);
      }

    }
  });

  $('#splashLoginBtn').click(function() {
    window.location.href = 'https://login.oregonstate.edu/idp/profile/cas/login?service=file:///Users/Omeed/Desktop/OSU/grad/cs562%20-%20software%20proj%20management/project/osu-community-marketplace/osucm/index.html/';
  });
});

function chooseBackgroundImg() {
  var images = ['corvallis.jpg', 'bend.jpg', 'portland.jpg'];
  var idx = Math.floor(Math.random() * images.length);
  return images[idx];
}

function searchKeyPress(e) {
  e = e || window.event;
  if (e.keyCode == 13) {
	  $('#submitNotifyBtn').click();
	  return false;
  }
  return true;
}
