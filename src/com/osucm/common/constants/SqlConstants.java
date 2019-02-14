package com.osucm.common.constants;

public interface SqlConstants {
	
	String INSERT_NOTIFY_EMAIL = "INSERT INTO notify_list (email) VALUES (?) ON DUPLICATE KEY UPDATE email = ?";
	String ADD_USER = "INSERT INTO users (onid, firstname, middlename, lastname, email) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE onid = ?";
	String GET_LISTINGS = "SELECT * FROM listings WHERE type = ?";
	String ADD_LISTING = "INSERT INTO listings (onid, type, title, campus, description, price, payFrequency, showEmail, otherContact, tags, datePosted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
	String GET_NEW_LISTING_ID = "SELECT listingID FROM listings WHERE onid = ? ORDER BY listingID DESC LIMIT 1";
	String ADD_IMAGE_ID_TO_LISTING = "UPDATE listings SET imageIDs = CONCAT(imageIDs, ', ', ?) WHERE listingID = ?";
	String GET_LISTING_DETAILS = "SELECT L.*, U.firstname, U.middlename, U.lastname, U.email FROM listings L, users U WHERE L.onid = U.onid AND L.listingID = ?";
	String GET_RECENT_LISTINGS = "SELECT * FROM listings ORDER BY datePosted DESC LIMIT 3";
	String GET_MY_LISTINGS = "SELECT * FROM listings WHERE onid = ? ORDER BY datePosted DESC";
	String GET_MY_RECENT_LISTINGS = "SELECT * FROM listings WHERE onid = ? ORDER BY datePosted DESC LIMIT 3";
	String SAVE_LISTING = "INSERT INTO saved_listings (onid, listingID, dateSaved) VALUES (?, ?, ?)";
	String GET_SAVED_LISTINGS = "SELECT SL.*, L.title, L.type, L.campus, L.imageIDs, L.description, L.price, L.datePosted FROM saved_listings SL, listings L WHERE SL.listingID = L.listingID AND SL.onid = ?";
	String SEARCH_LISTINGS = "SELECT * FROM listings WHERE type = ? AND (title LIKE ? OR description LIKE ? OR tags LIKE ?)";
	String DELETE_LISTING = "DELETE FROM listings WHERE listingID = ?";
	String REMOVE_LISTING_FROM_SAVED_LIST = "DELETE FROM saved_listings WHERE listingID = ? AND onid = ?";
	String UPDATE_LISTING = "UPDATE listings SET `type` = ?, `title` = ?, `campus` = ?, `description` = ?, `price` = ?, `datePosted` = ?, `showEmail` = ?, `otherContact` = ?, `tags` = '? WHERE (`listingID` = ?) and (`onid` = ?);"; 
}
