package com.osucm.database.pojo;

import java.sql.Timestamp;
import java.util.ArrayList;

public class ListingPojo {
	
	private int listingID;
	private int onid;
	private String type;
	private String title;
	private String description;
	private ArrayList<Integer> imageIDs;
	private double price;
	private Timestamp datePosted;
	private boolean showEmail;
	private boolean showPhone;
	
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
	
	public String getType() {
		return type;
	}
	
	public void setType(String type) {
		this.type = type;
	}
	
	public String getTitle() {
		return title;
	}
	
	public void setTitle(String title) {
		this.title = title;
	}
	
	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	public ArrayList<Integer> getImageIDs() {
		return imageIDs;
	}
	
	public void setImageIDs(ArrayList<Integer> imageIDs) {
		this.imageIDs = imageIDs;
	}
	
	public double getPrice() {
		return price;
	}
	
	public void setPrice(double price) {
		this.price = price;
	}
	
	public Timestamp getDatePosted() {
		return datePosted;
	}
	
	public void setDatePosted(Timestamp datePosted) {
		this.datePosted = datePosted;
	}
	
	public boolean isShowEmail() {
		return showEmail;
	}
	
	public void setShowEmail(boolean showEmail) {
		this.showEmail = showEmail;
	}
	
	public boolean isShowPhone() {
		return showPhone;
	}
	
	public void setShowPhone(boolean showPhone) {
		this.showPhone = showPhone;
	}
	
}
