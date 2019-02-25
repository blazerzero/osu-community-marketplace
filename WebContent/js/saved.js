$(document).ready(function() {
	
	var listingToRemove = 0;
	
	var savedListingsJSON = sendDataSync("{'onid': '"+sessionStorage.getItem("onid")+"'}", "getSavedListings", "SavedListingController");
	//console.log(savedListingsJSON);
	var savedListings = [];
	if (savedListingsJSON != null && savedListingsJSON.length > 0) {
		savedListings = jQuery.parseJSON(savedListingsJSON);
	}
	
	$.each(savedListings, function(index, value) {
		console.log(value);
		var imageIDs = value.imageIDs;
		var imageIDList = imageIDs.split(', ');
		console.log(imageIDList);
		imageIDList.shift();
		value.imageIDs = imageIDList;
	});
	
	savedListings.sort(function(a, b) {
		return (new Date(a.dateSaved).getTime() - new Date(b.dateSaved).getTime());
	});
	
	console.log(savedListings.length);
	
	if (savedListings.length == 0) {
		$('#saved-listings').html("<center><strong>You have not saved any listings.</center></strong>");
	}
	
	var len = savedListings.length - 1;
	while (len >= 0) {
		if (len >= 3) {
			$('#saved-listings').append(
			'<div class="card-deck listing-row">'		
		    + 	'<div class="card">'
		    +     '<div class="card-body">'
		    +		'<button type="button" class="close" aria-label="Close" data-id="removeSaved'+savedListings[len].listingID+'">'
        	+		  '<span aria-hidden="true">&times;</span>'
        	+	  	'</button>'
		    +      	'<h5 class="card-title">'+savedListings[len].title+'</h5>'
		    +		'<p class="card-text">Listing type: '+savedListings[len].type.charAt(0).toUpperCase()+savedListings[len].type.substring(1)+'</p>'
		    +		'<p class="card-text">Campus: '+(savedListings[len].campus == 'Bend' ? 'Bend (Cascades)' : (savedListings[len].campus == 'Other' ? 'Other (See description)' : savedListings[len].campus))+'</p>'
		    +    	(savedListings[len].imageIDs.length == 0 ? '' : '<img src="http://www.worksbythepg.com/osucm-images/'+savedListings[len].type[0]+'/'+savedListings[len].imageIDs[0]+'" class="main-listing-img" alt="listing image">')
		    +      	'<p class="card-text">'+savedListings[len].description+'</p>'
		    +      	'<h5 class="card-title list-price"><strong>$'+buildPrice(savedListings[len].price, savedListings[len].payFrequency)+'</strong></h5>'
		    +      	'<a href="viewlisting.html?listingID='+savedListings[len].listingID+'" class="btn btn-primary listing-action">View Details</a>'
		    +      	'<a href="editlisting.html?listingID='+savedListings[len].listingID+'" class="btn btn-info listing-action">Edit</a>'
		    +  	  '</div>'
		    +  	  '<div class="card-footer text-muted text-center">'
	    	+	  	'Posted on '+buildDatePosted(savedListings[len].datePosted)
	 		+  	  '</div>'
		    +  	'</div>'
		    + 	'<div class="card">'
		    +     '<div class="card-body">'
		    +		'<button type="button" class="close" aria-label="Close" data-id="removeSaved'+savedListings[len-1].listingID+'">'
        	+		  '<span aria-hidden="true">&times;</span>'
        	+	  	'</button>'
		    +      	'<h5 class="card-title">'+savedListings[len].title+'</h5>'
		    +		'<p class="card-text">Listing type: '+savedListings[len-1].type.charAt(0).toUpperCase()+savedListings[len-1].type.substring(1)+'</p>'
		    +		'<p class="card-text">Campus: '+(savedListings[len].campus == 'Bend' ? 'Bend (Cascades)' : (savedListings[len].campus == 'Other' ? 'Other (See description)' : savedListings[len].campus))+'</p>'
		    +    	(savedListings[len-1].imageIDs.length == 0 ? '' : '<img src="http://www.worksbythepg.com/osucm-images/'+savedListings[len-1].type[0]+'/'+savedListings[len].imageIDs[0]+'" class="main-listing-img" alt="listing image">')
		    +      	'<p class="card-text">'+savedListings[len-1].description+'</p>'
		    +      	'<h5 class="card-title list-price"><strong>$'+buildPrice(savedListings[len-1].price)+(savedListings[len-1].payFrequency == '' ? '' : '/'+savedListings[len-1].payFrequency)+'</strong></h5>'
		    +      	'<a href="viewlisting.html?listingID='+savedListings[len-1].listingID+'" class="btn btn-primary listing-action">View Details</a>'
		    +  	  '</div>'
		    +  	  '<div class="card-footer text-muted text-center">'
	    	+	  	'Posted on '+buildDatePosted(savedListings[len-1].datePosted)
	 		+  	  '</div>'
		    +  	'</div>'
		    + 	'<div class="card">'
		    +     '<div class="card-body">'
		    +		'<button type="button" class="close" aria-label="Close" data-id="removeSaved'+savedListings[len-2].listingID+'">'
        	+		  '<span aria-hidden="true">&times;</span>'
        	+	  	'</button>'
		    +      	'<h5 class="card-title">'+savedListings[len-2].title+'</h5>'
		    +		'<p class="card-text">Listing type: '+savedListings[len-2].type.charAt(0).toUpperCase()+savedListings[len-2].type.substring(1)+'</p>'
		    +		'<p class="card-text">Campus: '+(savedListings[len].campus == 'Bend' ? 'Bend (Cascades)' : (savedListings[len].campus == 'Other' ? 'Other (See description)' : savedListings[len].campus))+'</p>'
		    +    	(savedListings[len-2].imageIDs.length == 0 ? '' : '<img src="http://www.worksbythepg.com/osucm-images/'+savedListings[len-2].type[0]+'/'+savedListings[len-2].imageIDs[0]+'" class="main-listing-img" alt="listing image">')
		    +      	'<p class="card-text">'+savedListings[len-2].description+'</p>'
		    +      	'<h5 class="card-title list-price"><strong>$'+buildPrice(savedListings[len-2].price)+(savedListings[len-2].payFrequency == '' ? '' : '/'+savedListings[len-2].payFrequency)+'</strong></h5>'
		    +      	'<a href="viewlisting.html?listingID='+savedListings[len-2].listingID+'" class="btn btn-primary listing-action">View Details</a>'
		    +  	  '</div>'
		    +  	  '<div class="card-footer text-muted text-center">'
	    	+	  	'Posted on '+buildDatePosted(savedListings[len-2].datePosted)
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
					      +			'<button type="button" class="close" aria-label="Close" data-id="removeSaved'+savedListings[len].listingID+'">'
					      +		  	  '<span aria-hidden="true">&times;</span>'
					      +	  		'</button>'
						  +      	'<h5 class="card-title">'+savedListings[len].title+'</h5>'
						  +			'<p class="card-text">Listing type: '+savedListings[len].type.charAt(0).toUpperCase()+savedListings[len].type.substring(1)+'</p>'
						  +			'<p class="card-text">Campus: '+(savedListings[len].campus == 'Bend' ? 'Bend (Cascades)' : (savedListings[len].campus == 'Other' ? 'Other (See description)' : savedListings[len].campus))+'</p>'
						  +    		(savedListings[len].imageIDs.length == 0 ? '' : '<img src="http://www.worksbythepg.com/osucm-images/'+savedListings[len].type[0]+'/'+savedListings[len].imageIDs[0]+'" class="main-listing-img" alt="listing image">')
						  +      	'<p class="card-text">'+savedListings[len].description+'</p>'
						  +      	'<h5 class="card-title list-price"><strong>$'+buildPrice(savedListings[len].price, savedListings[len].payFrequency)+'</strong></h5>'
						  +      	'<a href="viewlisting.html?listingID='+savedListings[len].listingID+'" class="btn btn-primary listing-action">View Details</a>'
						  +  	  '</div>'
						  +  	  '<div class="card-footer text-muted text-center">'
					      +	  		'Posted on '+buildDatePosted(savedListings[len].datePosted)
					 	  +  	  '</div>'
					      +  	'</div>';
					len--;
				}
				else {
					html += '<div class="card" style="opacity: 0" disabled></div>';
				}
			}
			html += '</div>';
		    $('#saved-listings').append(html);
	    }
	}
	
	$('.close').click(function() {
		if ($(this).data('id') != null && $(this).data('id').includes('removeSaved')) {
			listingToRemove = $(this).data('id').substring(11);
			//alert(id);
			console.log("listing ID: " + listingToRemove);
			var listing = savedListings.find(function(e) {
				return e.listingID == listingToRemove;
			});
			$('#removeFromSavedLabel').html('Confirm: Remove "' + listing.title + '" from your saved list');
			$('#confirmRemoveFromSavedModal').modal('show');
		}
	});
	
	$('#removeFromSavedBtn').click(function() {
		$('#confirmRemoveFromSavedModal').modal('hide');
		var status = sendDataSync("{'listingID': '" + listingToRemove + "', 'onid': '"+sessionStorage.getItem('onid')+"'}", "removeListingFromSavedList", "SavedListingController");
		if (status == 'JDBC_OK') {
			$('#listingRemovedModal').modal('show');
			setTimeout(function() {
				window.location.href = 'saved.html';
			}, 2000);
		}
	});
});