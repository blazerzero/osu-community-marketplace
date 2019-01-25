$(document).ready(function() {
	var onid = 'habibelo';
	var firstname = 'Omeed';
	var middlename = 'Alexander';
	var lastname = 'Habibelahian';
	var email = 'habibelo@oregonstate.edu';
	var phone = '(555) 555-1234'
	var subject = 'Inquiry About [Listing Name] [via OSU Community Marketplace]';
	
	$('#listingPoster').append(firstname+' '+middlename+' '+lastname);
	$('#listingEmail').append(email);
	$('#listingPhone').append(phone);
	$('#listingEmail').click(function() {
		window.location.href="mailto:"+email+"?subject="+subject;
	});
});;