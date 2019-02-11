package com.osucm.database.pojo;

public class SavedListingPojo {
	
	private String onid;
	private int listingID;
	private long dateSaved;
	
	public String getOnid() {
		return onid;
	}
	
	public void setOnid(String onid) {
		this.onid = onid;
	}
	
	public int getListingID() {
		return listingID;
	}
	
	public void setListingID(int listingID) {
		this.listingID = listingID;
	}
	
	public long getDateSaved() {
		return dateSaved;
	}
	
	public void setDateSaved(long dateSaved) {
		this.dateSaved = dateSaved;
	}
	
}
