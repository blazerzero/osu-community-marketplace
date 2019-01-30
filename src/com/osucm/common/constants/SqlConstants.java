package com.osucm.common.constants;

public interface SqlConstants {
	
	String INSERT_NOTIFY_EMAIL = "INSERT INTO notify_list (email) VALUES (?) ON DUPLICATE KEY UPDATE email = ?";
	String GET_LISTINGS = "SELECT * FROM listings where type = ?";
	String ADD_LISTING = "INSERT INTO listings (onid, type, title, description, imageIDs, price, payFrequency, showEmail, otherContact, datePosted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
	String GET_LISTING_DETAILS = "SELECT L.onid, L.listingID, L.type, L.title, L.description, L.imageIDs, L.price, L.payFrequency, L.datePosted, L.showEmail, L.otherContact, U.firstname, U.middlename, U.lastname, U.email FROM listings L, users U WHERE L.onid = U.onid AND L.listingID = ?";
	String GET_RECENT_LISTINGS = "SELECT * FROM listings ORDER BY datePosted DESC LIMIT 3";
	String GET_MY_LISTINGS = "SELECT * FROM listings where onid = ? ORDER BY datePosted DESC";
	String GET_MY_RECENT_LISTINGS = "SELECT * FROM listings where onid = ? ORDER BY datePosted DESC LIMIT 3";
}
