package com.osucm.database.pojo;

public class SavedListingPojo {
	
	private String onid;
	private int listingID;
	private long dateSaved;
	private String title;
	private String type;
	private String campus;
	private String imageIDs;
	private String description;
	private double price;
	private long datePosted;
	
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

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getCampus() {
		return campus;
	}

	public void setCampus(String campus) {
		this.campus = campus;
	}

	public String getImageIDs() {
		return imageIDs;
	}

	public void setImageIDs(String imageIDs) {
		this.imageIDs = imageIDs;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public long getDatePosted() {
		return datePosted;
	}

	public void setDatePosted(long datePosted) {
		this.datePosted = datePosted;
	}
	
	
	
}
