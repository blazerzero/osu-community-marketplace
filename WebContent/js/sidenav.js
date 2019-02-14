$(document).ready(function() {
	$('#sidenav').load("sidenav.html");
});

function logout() {
	sessionStorage.clear();
	window.location.href = 'https://login.oregonstate.edu/idp/profile/cas/logout';
}