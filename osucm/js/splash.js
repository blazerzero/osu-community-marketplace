$(document).ready(function() {
  var bgImgPath = './splash/' + chooseBackgroundImg();
  $('#splashImg').attr('src', bgImgPath);
  $('#splashImg').fadeIn(1000);

  $('#closeNotifyX, #closeNotifyBtn').click(function () {
    $('#notifyEmail').val('');
    $('#invalidNotifyEmailAlert').hide();
  });

  $('#submitNotifyBtn').click(function() {
    var email = $('#notifyEmail').val();
    var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
    if (email == '') {
      $('#invalidNotifyEmailAlert').html("Please enter an email address.");
  		$('#invalidNotifyEmailAlert').show();
    }
    if (!pattern.test(email)) {
      $('#invalidNotifyEmailAlert').html("Invalid email address.");
  		$('#invalidNotifyEmailAlert').show();
    }
    else {
      $('#notifyEmail').val('');
      // save email in db table of emails to notify
      $('#invalidNotifyEmailAlert').hide();
      $('#notifySuccessAlert').show();

      setTimeout(function() {
        $('#notifySuccessAlert').hide();
        $('#notifyMeModal').modal('hide');
			}, 3000);

    }
  })
});

function chooseBackgroundImg() {
  var images = ['corvallis.jpg', 'bend.jpg', 'portland.jpg'];
  var idx = Math.floor(Math.random() * images.length);
  return images[idx];
}
