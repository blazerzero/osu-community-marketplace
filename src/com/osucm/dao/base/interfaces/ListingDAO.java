package com.osucm.dao.base.interfaces;

import java.util.ArrayList;

import com.osucm.dao.base.GenericDAO;
import com.osucm.database.pojo.ListingPojo;

public interface ListingDAO extends GenericDAO {
	
	public ArrayList<ListingPojo> getListings(String type);
	public String addListing(ListingPojo newListing);

}
