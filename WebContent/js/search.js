$(document).ready(function() {
	var type = window.location.href.split('=')[1];
	console.log("Listing type: " + type);
	if (type == 'product' || type == 'product#') {
		$(document).attr('title', 'Search Products - OSU Community Marketplace');
		$('#page-title').html('Search for a Product');
	}
	else if (type == 'service' || type == 'service#') {
		$(document).attr('title', 'Search Services - OSU Community Marketplace');
		$('#page-title').html('Search for a Service');
	}
	else if (type == 'housing' || type == 'housing#') {
		$(document).attr('title', 'Search for Housing - OSU Community Marketplace');
		$('#page-title').html('Search for Housing');
	}
});