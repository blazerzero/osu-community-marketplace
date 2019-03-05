$(document).ready(function() {
	
	var myListingsJSON = sendDataSync("{'onid': '"+sessionStorage.getItem("onid")+"'}", "getMyListings", "ListingController");
	//console.log(myListingsJSON);
	var myListings = [];
	if (myListingsJSON != null && myListingsJSON.length > 0) {
		myListings = jQuery.parseJSON(myListingsJSON);
	}
	
	myListings.sort(function(a, b) {
		return (new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime());
	});
	
	$.each(myListings, function(index, value) {
		var imageIDs = value.imageIDs;
		var imageIDList = imageIDs.split(', ');
		console.log(imageIDList);
		if (imageIDs.includes(', ')) {
			imageIDList.shift();
		}
		value.imageIDs = imageIDList;
	});
	
	var listingToDelete = 0;
	
	if (myListings.length == 0) {
		$('#my-listings').html("<center><strong>You have not posted any listings yet.</strong><div><a href='createlisting.html' class='btn btn-primary'>Create a Listing!</a></div></center>");
	}
	
	var len = myListings.length - 1;
	//console.log(len);
	while (len >= 0) {
		if (len >= 3) {
			$('#my-listings').append(
			'<div class="card-deck listing-row">'		
		    + 	'<div class="card">'
		    +     '<div class="card-body">'
		    +		'<button type="button" class="close" aria-label="Close" data-id="deleteListing'+myListings[len].listingID+'">'
        	+		  '<span aria-hidden="true">&times;</span>'
        	+	  	'</button>'
		    +      	'<h5 class="card-title">'+myListings[len].title+'</h5>'
		    +		'<p class="card-text">Listing type: '+myListings[len].type.charAt(0).toUpperCase()+myListings[len].type.substring(1)+'</p>'
		    +		'<p class="card-text">Campus: '+(myListings[len].campus == 'Bend' ? 'Bend (Cascades)' : (myListings[len].campus == 'Other' ? 'Other (See description)' : myListings[len].campus))+'</p>'
		    +    	((myListings[len].imageIDs.length == 0 || myListings[len].imageIDs[0] == '') ? '' : '<img src="http://www.worksbythepg.com/osucm-images/'+myListings[len].type[0]+'/'+myListings[len].imageIDs[0]+'" class="main-listing-img" alt="listing image">')
		    +      	'<p class="card-text">'+buildDescription(myListings[len].description)+'</p>'
		    +      	'<h5 class="card-title list-price"><strong>$'+buildPrice(myListings[len].price, myListings[len].payFrequency)+'</strong></h5>'
		    +      	'<a href="viewlisting.html?listingID='+myListings[len].listingID+'" class="btn btn-primary listing-action">View Details</a>'
		    +      	'<a href="editlisting.html?listingID='+myListings[len].listingID+'" class="btn btn-info listing-action">Edit</a>'
		    +  	  '</div>'
		    +  	  '<div class="card-footer text-muted text-center">'
	    	+	  	'Posted on '+buildDatePosted(myListings[len].datePosted)
	 		+  	  '</div>'
		    +  	'</div>'
		    + 	'<div class="card">'
		    +     '<div class="card-body">'
		    +		'<button type="button" class="close" aria-label="Close" data-id="deleteListing'+myListings[len-1].listingID+'">'
        	+		  '<span aria-hidden="true">&times;</span>'
        	+	  	'</button>'
		    +      	'<h5 class="card-title">'+myListings[len-1].title+'</h5>'
		    +		'<p class="card-text">Listing type: '+myListings[len-1].type.charAt(0).toUpperCase()+myListings[len-1].type.substring(1)+'</p>'
		    +		'<p class="card-text">Campus: '+(myListings[len-1].campus == 'Bend' ? 'Bend (Cascades)' : (myListings[len-1].campus == 'Other' ? 'Other (See description)' : myListings[len-1].campus))+'</p>'
		    +    	((myListings[len-1].imageIDs.length == 0 || myListings[len-1].imageIDs[0] == '') ? '' : '<img src="http://www.worksbythepg.com/osucm-images/'+myListings[len-1].type[0]+'/'+myListings[len-1].imageIDs[0]+'" class="main-listing-img" alt="listing image">')
		    +      	'<p class="card-text">'+buildDescription(myListings[len-1].description)+'</p>'
		    +      	'<h5 class="card-title list-price"><strong>$'+buildPrice(myListings[len-1].price)+(myListings[len-1].payFrequency == '' ? '' : '/'+myListings[len-1].payFrequency)+'</strong></h5>'
		    +      	'<a href="viewlisting.html?listingID='+myListings[len-1].listingID+'" class="btn btn-primary listing-action">View Details</a>'
		    +      	'<a href="editlisting.html?listingID='+myListings[len-1].listingID+'" class="btn btn-info listing-action">Edit</a>'
		    +  	  '</div>'
		    +  	  '<div class="card-footer text-muted text-center">'
	    	+	  	'Posted on '+buildDatePosted(myListings[len-1].datePosted)
	 		+  	  '</div>'
		    +  	'</div>'
		    + 	'<div class="card">'
		    +     '<div class="card-body">'
		    +		'<button type="button" class="close" aria-label="Close" data-id="deleteListing'+myListings[len-2].listingID+'">'
        	+		  '<span aria-hidden="true">&times;</span>'
        	+	  	'</button>'
		    +      	'<h5 class="card-title">'+myListings[len-2].title+'</h5>'
		    +		'<p class="card-text">Listing type: '+myListings[len-2].type.charAt(0).toUpperCase()+myListings[len-2].type.substring(1)+'</p>'
		    +		'<p class="card-text">Campus: '+(myListings[len-2].campus == 'Bend' ? 'Bend (Cascades)' : (myListings[len-2].campus == 'Other' ? 'Other (See description)' : myListings[len-2].campus))+'</p>'
		    +    	((myListings[len-2].imageIDs.length == 0 || myListings[len-2].imageIDs[0] == '') ? '' : '<img src="http://www.worksbythepg.com/osucm-images/'+myListings[len-2].type[0]+'/'+myListings[len-2].imageIDs[0]+'" class="main-listing-img" alt="listing image">')
		    +      	'<p class="card-text">'+buildDescription(myListings[len-2].description)+'</p>'
		    +      	'<h5 class="card-title list-price"><strong>$'+buildPrice(myListings[len-2].price)+(myListings[len-2].payFrequency == '' ? '' : '/'+myListings[len-2].payFrequency)+'</strong></h5>'
		    +      	'<a href="viewlisting.html?listingID='+myListings[len-2].listingID+'" class="btn btn-primary listing-action">View Details</a>'
		    +      	'<a href="editlisting.html?listingID='+myListings[len-2].listingID+'" class="btn btn-info listing-action">Edit</a>'
		    +  	  '</div>'
		    +  	  '<div class="card-footer text-muted text-center">'
	    	+	  	'Posted on '+buildDatePosted(myListings[len-2].datePosted)
	 		+  	  '</div>'
		    +  	'</div>'
		  	+ '</div><br/>');
		  	len -= 3;
		}
		else {
			console.log("Less than 3 listings left to display");
			var html = '';
			html += '<div class="card-deck listing-row">';
			for (i = 0; i < 3; i++) {
				if (len >= 0) {
					html += '<div class="card">'
					      +     '<div class="card-body">'
					      +			'<button type="button" class="close" aria-label="Close" data-id="deleteListing'+myListings[len].listingID+'">'
					      +		  	  '<span aria-hidden="true">&times;</span>'
					      +	  		'</button>'
						  +      	'<h5 class="card-title">'+myListings[len].title+'</h5>'
						  +			'<p class="card-text">Listing type: '+myListings[len].type.charAt(0).toUpperCase()+myListings[len].type.substring(1)+'</p>'
						  +			'<p class="card-text">Campus: '+(myListings[len].campus == 'Bend' ? 'Bend (Cascades)' : (myListings[len].campus == 'Other' ? 'Other (See description)' : myListings[len].campus))+'</p>'
						  +    		((myListings[len].imageIDs.length == 0 || myListings[len].imageIDs[0] == '') ? '' : '<img src="http://www.worksbythepg.com/osucm-images/'+myListings[len].type[0]+'/'+myListings[len].imageIDs[0]+'" class="main-listing-img" alt="listing image">')
						  +      	'<p class="card-text">'+buildDescription(myListings[len].description)+'</p>'
						  +      	'<h5 class="card-title list-price"><strong>$'+buildPrice(myListings[len].price)+(myListings[len].payFrequency == '' ? '' : '/'+myListings[len].payFrequency)+'</strong></h5>'
						  +      	'<a href="viewlisting.html?listingID='+myListings[len].listingID+'" class="btn btn-primary listing-action">View Details</a>'
						  +      	'<a href="editlisting.html?listingID='+myListings[len].listingID+'" class="btn btn-info listing-action">Edit</a>'
						  +  	  '</div>'
						  +  	  '<div class="card-footer text-muted text-center">'
					      +	  		'Posted on '+buildDatePosted(myListings[len].datePosted)
					 	  +  	  '</div>'
					      +  	'</div>';
					len--;
				}
				else {
					html += '<div class="card" style="opacity: 0" disabled></div>';
				}
			}
			html += '</div>';
		    $('#my-listings').append(html);
	    }
	}
	
	$('.close').click(function() {
		if ($(this).data('id') != null && $(this).data('id').includes('deleteListing')) {
			listingToDelete = $(this).data('id').substring(13);
			//alert(id);
			console.log("listing ID: " + listingToDelete);
			var listing = myListings.find(function(e) {
				return e.listingID == listingToDelete;
			});
			$('#deleteListingLabel').html('Confirm: Delete "' + listing.title + '"');
			$('#confirmDeleteListingModal').modal('show');
		}
	});
	
	$('#deleteListingBtn').click(function() {
		$('#confirmDeleteListingModal').modal('hide');
		var status = sendDataSync("{'listingID': '" + listingToDelete + "'}", "deleteListing", "ListingController");
		if (status == 'JDBC_OK') {
			$('#listingDeletedModal').modal('show');
			setTimeout(function() {
				window.location.href = 'mylistings.html';
			}, 2000);
		}
	});
});