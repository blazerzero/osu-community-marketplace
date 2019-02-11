package com.osucm.dao.base.interfaces;

import java.util.ArrayList;

import com.osucm.dao.base.GenericDAO;
import com.osucm.database.pojo.SavedListingPojo;

public interface SavedListingDAO extends GenericDAO {
	
	public String saveListing(SavedListingPojo savedListing);
	public ArrayList<SavedListingPojo> getSavedListings(String onid);
	

}
