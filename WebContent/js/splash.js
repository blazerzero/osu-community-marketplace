$(document).ready(function() {
  $('#splashContent').css('display', 'none');
  var url = new URL(window.location.href);
  var ticket = url.searchParams.get('ticket');
  if (ticket != null && ticket != '') {
	  const xhr = new XMLHttpRequest();
	  const httpURL = "https://cors-anywhere.herokuapp.com/https://login.oregonstate.edu/idp/profile/cas/serviceValidate?ticket="+ticket+"&service=http://www.worksbythepg.com:8080/osu-community-marketplace/";
	  xhr.open("GET", httpURL);
	  xhr.send();
	  xhr.onreadystatechange=(e)=>{
		  //console.log(xhr.responseText);
		  var xmlDoc = $.parseXML(xhr.responseText), xml = $( xmlDoc );
		  //console.log(xhr.responseText);
		  var userInfo = new Object();
		  userInfo.onid = xml.find('cas\\:user, user').text();
		  userInfo.commonName = xml.find('cas\\:commonName, commonName').text();
		  userInfo.firstName = xml.find('cas\\:firstname, firstname').text();
		  userInfo.osuPrimaryMail = xml.find('cas\\:osuprimarymail, osuprimarymail').text();
		  userInfo.eduPersonAffiliation = xml.find('cas\\:eduPersonAffiliation, eduPersonAffiliation').text();
		  userInfo.osupidm = xml.find('cas\\:osupidm, osupidm').text();
		  userInfo.givenName = xml.find('cas\\:givenName, givenName').text();
		  userInfo.osuuid = xml.find('cas\\:osuuid, osuuid').text();
		  userInfo.lastName = xml.find('cas\\:lastname, lastname').text();
		  userInfo.uid = xml.find('cas\\:uid, uid').text();
		  userInfo.eduPersonaPrimaryAffiliation = xml.find('cas\\:eduPersonPrimaryAffiliation, eduPersonPrimaryAffiliation').text();
		  userInfo.UDC_IDENTIFIER = xml.find('cas\\:UDC_IDENTIFIER, UDC_IDENTIFIER');
		  userInfo.surname = xml.find('cas\\:surname, surname').text();
		  userInfo.eduPersonPrincipalName = xml.find('cas\\:eduPersonPrincipalName, eduPersonPrincipalName').text();
		  userInfo.eduPersonPrincipalPrior = xml.find('cas\\:eduPersonPrincipalPrior, eduPersonPrincipalPrior').text();
		  userInfo.fullName = xml.find('cas\\:fullname, fullname').text();
		  userInfo.email = xml.find('cas\\:email, email').text();
		  
		  var first = userInfo.firstName;
		  var full = userInfo.commonName;
		  
		  var firstAndMiddle = full.split(', ')[1];
		  //console.log(firstAndMiddle);
		  var middle = firstAndMiddle.substring(first.length+1);
		  //console.log(middle);
		  userInfo.middleName = middle;
		  
		  //console.log(userInfo.commonName);
		  
		  basicUserInfo = new Object();
		  basicUserInfo.onid = userInfo.onid;
		  basicUserInfo.firstname = userInfo.firstName;
		  basicUserInfo.middlename = userInfo.middleName;
		  basicUserInfo.lastname = userInfo.lastName;
		  basicUserInfo.email = userInfo.email;
		  
		  //console.log(JSON.stringify(basicUserInfo));
		  
		  var status = sendDataSync(JSON.stringify(basicUserInfo), "addUser", "AuthController");
		  console.log(status);
		  if (status == 'JDBC_OK') {
			  sessionStorage.setItem('onid', userInfo.onid);
			  sessionStorage.setItem('firstname', userInfo.firstName);
			  sessionStorage.setItem('middlename', userInfo.middleName);
			  sessionStorage.setItem('lastname', userInfo.lastName);
			  sessionStorage.setItem('email', userInfo.email);
			  window.location.href = "./home.html";
		  }
	  }
  }
  else {
	  /*if (sessionStorage.length == 5) {
		  console.log(sessionStorage.getItem('onid'));
		  console.log(sessionStorage.getItem('firstname'));
		  console.log(sessionStorage.getItem('middlename'));
		  console.log(sessionStorage.getItem('lastname'));
		  console.log(sessionStorage.getItem('email'));
		  //window.location.href = "./home.html";
	  }*/
	  $('#splashContent').css('display', 'block');
	
	
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
	    window.location.href = 'https://login.oregonstate.edu/idp/profile/cas/login?service=http://www.worksbythepg.com:8080/osu-community-marketplace/';
	  });
  }
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
