$(document).ready(function() {
	$('#sidenav').load("sidenav.html");
});

function logout() {
	sessionStorage.clear();
	window.location.href = "./index.html";
}