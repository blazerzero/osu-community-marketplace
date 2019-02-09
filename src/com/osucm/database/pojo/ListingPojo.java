package com.osucm.database.pojo;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ListingPojo {
	
	private int listingID;
	private String onid;
	private String type;
	private String title;
	private String description;
	private String imageIDs;
	private double price;
	private String payFrequency;
	private long datePosted;
	private int showEmail;
	private String otherContact;
	private List<String> tags;
	
	public int getListingID() {
		return listingID;
	}
	
	public void setListingID(int listingID) {
		this.listingID = listingID;
	}
	
	public String getOnid() {
		return onid;
	}
	
	public void setOnid(String onid) {
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
	
	public String getImageIDs() {
		return imageIDs;
	}
	
	public void setImageIDs(String imageIDs) {
		this.imageIDs = imageIDs;
	}
	
	public double getPrice() {
		return price;
	}
	
	public void setPrice(double price) {
		this.price = price;
	}
	
	public String getPayFrequency() {
		return payFrequency;
	}

	public void setPayFrequency(String payFrequency) {
		this.payFrequency = payFrequency;
	}
	
	public long getDatePosted() {
		return datePosted;
	}
	
	public void setDatePosted(long datePosted) {
		this.datePosted = datePosted;
	}
	
	public int getShowEmail() {
		return showEmail;
	}
	
	public void setShowEmail(int showEmail) {
		this.showEmail = showEmail;
	}
	
	public String getOtherContact() {
		return otherContact;
	}
	
	public void setOtherContact(String otherContact) {
		this.otherContact = otherContact;
	}

	public List<String> getTags() {
		return tags;
	}

	public void setTags(String tags) {
		this.tags = new ArrayList<String>(Arrays.asList(tags.split(",")));
	}
	
	
	
}
