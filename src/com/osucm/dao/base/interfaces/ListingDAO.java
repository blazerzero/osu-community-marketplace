package com.osucm.dao.base.interfaces;

import java.util.ArrayList;

import com.osucm.dao.base.GenericDAO;
import com.osucm.database.pojo.ListingPojo;
import com.osucm.database.pojo.SearchListingPojo;

public interface ListingDAO extends GenericDAO {
	
	public ArrayList<ListingPojo> getListings(String type);
	public String addListing(ListingPojo newListing);
	public String getListingDetails(int listingID);
	public ArrayList<ListingPojo> getRecentListings();
	public ArrayList<ListingPojo> getMyListings(String onid);
	public ArrayList<ListingPojo> getMyRecentListings(String onid);
	public ArrayList<ListingPojo> searchListings(SearchListingPojo slPojo);
	public String deleteListing(int listingID);

}
