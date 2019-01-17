package com.osucm.database.pojo;

import java.sql.Timestamp;

public class SavedListingPojo {
	
	private int listingID;
	private int onid;
	private Timestamp dateSaved;
	
	public int getListingID() {
		return listingID;
	}
	
	public void setListingID(int listingID) {
		this.listingID = listingID;
	}
	
	public int getOnid() {
		return onid;
	}
	
	public void setOnid(int onid) {
		this.onid = onid;
	}
	
	public Timestamp getDateSaved() {
		return dateSaved;
	}
	
	public void setDateSaved(Timestamp dateSaved) {
		this.dateSaved = dateSaved;
	}
	
}
