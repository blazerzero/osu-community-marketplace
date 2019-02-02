$(document).ready(function() {
	$('#header').load("header.html");
	if (sessionStorage.length < 5) {
		window.location.href = "./index.html";
	}
});

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("backToTop").style.display = "block";
    } else {
        document.getElementById("backToTop").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function escapeJSON(jString) {
	console.log("escaping special characters");
	return jString.replace(/\n/g, "<br/>").replace(/\r/g, "</br>").replace(/\t/g, " ").replace('"', "\"");
}

function buildPrice(listingPrice, payFrequency) {
	console.log(listingPrice);
	var afterDecimal = "";
	var tempPrice = listingPrice.toString();
	if (tempPrice.includes('.')) {
		afterDecimal = tempPrice.split('.')[1];
		if (afterDecimal.length == 1) tempPrice += '0';
	}
	else {
		tempPrice += '.00';
	}
	if (payFrequency == 'mo') tempPrice += '/mo';
	return tempPrice;
}

function buildDatePosted(listingDatePosted) {
	//console.log(listingDatePosted);
	//console.log(typeof listingDatePosted);
	//console.log(new Date(parseInt(listingDatePosted)).toLocaleString("en-US", {timezone: "America/Los_Angeles"}));
	var datePosted = new Date(parseInt(listingDatePosted)).toLocaleString("en-US", {timezone: "America/Los_Angeles"}).split(',')[0];
	//console.log(datePosted);
	//console.log(datePosted.substring(0,3)+'. '+datePosted.substring(4,6)+', '+datePosted.substring(7,11));
	return datePosted;
}

function buildDescription(listingDescription) {
	var tempDesc = listingDescription;
	return (tempDesc.length > 128 ? tempDesc.substring(0,128)+'...' : tempDesc);
}