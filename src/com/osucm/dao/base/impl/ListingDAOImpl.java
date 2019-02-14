package com.osucm.dao.base.impl;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;

import javax.naming.NamingException;

import com.gargoylesoftware.htmlunit.javascript.host.Console;
import com.osucm.common.constants.CommonConstants;
import com.osucm.common.constants.SqlConstants;
import com.osucm.dao.base.interfaces.ListingDAO;
import com.osucm.database.connection.DBConnectionFactory;
import com.osucm.database.pojo.ListingPojo;
import com.osucm.database.pojo.SearchListingPojo;

public class ListingDAOImpl implements ListingDAO {
	
	Connection connection = null;

	@Override
	public Connection getConnection() throws SQLException, FileNotFoundException, ClassNotFoundException, IOException, NamingException {
		if ((connection == null) || (connection.isClosed())) {
			connection = DBConnectionFactory.getConnection();
		}
		return connection;
	}

	@Override
	public ArrayList<ListingPojo> getListings(String type) {
		Connection connect = null;
		PreparedStatement preparedStatement = null;
		ResultSet resultSet = null;
		ArrayList<ListingPojo> listings = new ArrayList<>();
		
		try {
			connect = getConnection();
			preparedStatement = connect.prepareStatement(SqlConstants.GET_LISTINGS);
			preparedStatement.setString(1, type);
			resultSet = preparedStatement.executeQuery();
			
			while(resultSet.next()) {
				ListingPojo listingPojo = new ListingPojo();
				listingPojo.setListingID(resultSet.getInt("listingID"));
				listingPojo.setOnid(resultSet.getString("onid"));
				listingPojo.setType(resultSet.getString("type"));
				listingPojo.setTitle(resultSet.getString("title"));
				listingPojo.setCampus(resultSet.getString("campus"));
				listingPojo.setDescription(resultSet.getString("description"));
				listingPojo.setImageIDs(resultSet.getString("imageIDs"));
				listingPojo.setPrice(resultSet.getDouble("price"));
				listingPojo.setPayFrequency(resultSet.getString("payFrequency"));
				listingPojo.setDatePosted(resultSet.getTimestamp("datePosted").getTime());
				listingPojo.setShowEmail(resultSet.getInt("showEmail"));
				listingPojo.setOtherContact(resultSet.getString("otherContact"));
				listingPojo.setTags(resultSet.getString("tags"));
				
				listings.add(listingPojo);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			DBConnectionFactory.close(resultSet, preparedStatement, connect);
		}
		
		return listings;
	}

	@Override
	public int addListing(ListingPojo newListing) {
		
		String status = CommonConstants.STATUS_JDBC_ERROR;
		Connection connect = null;
		PreparedStatement preparedStatement = null;
		ResultSet resultSet = null;
		int listingID = 0;
		
		try {
			connect = getConnection();
			Timestamp dt = new Timestamp(newListing.getDatePosted());
			preparedStatement = connect.prepareStatement(SqlConstants.ADD_LISTING);
			preparedStatement.setString(1, newListing.getOnid());
			preparedStatement.setString(2, newListing.getType());
			preparedStatement.setString(3, newListing.getTitle());
			preparedStatement.setString(4, newListing.getCampus());
			preparedStatement.setString(5, newListing.getDescription());
			preparedStatement.setDouble(6, newListing.getPrice());
			preparedStatement.setString(7, newListing.getPayFrequency());
			preparedStatement.setInt(8, newListing.getShowEmail());
			preparedStatement.setString(9, newListing.getOtherContact());
			preparedStatement.setString(10, newListing.getTags());
			preparedStatement.setTimestamp(11, dt);
						
			int executeUpdate = preparedStatement.executeUpdate();

			if (executeUpdate > 0) {
				status = CommonConstants.STATUS_JDBC_OK;
				preparedStatement = connect.prepareStatement(SqlConstants.GET_NEW_LISTING_ID);
				preparedStatement.setString(1, newListing.getOnid());
				resultSet = preparedStatement.executeQuery();
				
				resultSet.next();
				listingID = resultSet.getInt("listingID");
			}
			
		} catch (Exception e) {
			status = CommonConstants.STATUS_JDBC_ERROR;
			e.printStackTrace();
		} finally {
			DBConnectionFactory.close(resultSet, preparedStatement, connect);
		}
		System.out.println("listing ID: " + listingID);
		return listingID;
	}
	
	@Override
	public String addImageIDToNewListing(int listingID, String imageID) {
		String status = CommonConstants.STATUS_JDBC_ERROR;
		Connection connect = null;
		PreparedStatement preparedStatement = null;
		ResultSet resultSet = null;
		
		try {
			connect = getConnection();
			preparedStatement = connect.prepareStatement(SqlConstants.ADD_IMAGE_ID_TO_LISTING);
			preparedStatement.setString(1, imageID);
			preparedStatement.setInt(2, listingID);
			int executeUpdate = preparedStatement.executeUpdate();
			if (executeUpdate > 0) {
				status = CommonConstants.STATUS_JDBC_OK;
			}
		}
		catch (Exception e) {
			status = CommonConstants.STATUS_JDBC_ERROR;
			e.printStackTrace();
		} finally {
			DBConnectionFactory.close(resultSet, preparedStatement, connect);
		}
		return status;
	}
	
	@Override
	public String getListingDetails(int listingID) {
		
		String status = CommonConstants.STATUS_JDBC_ERROR;
		Connection connect = null;
		PreparedStatement preparedStatement = null;
		ResultSet resultSet = null;
		String listingDetails = "";
		
		try {
			connect = getConnection();
			preparedStatement = connect.prepareStatement(SqlConstants.GET_LISTING_DETAILS);
			preparedStatement.setInt(1, listingID);
			System.out.println(listingID);
			resultSet = preparedStatement.executeQuery();
			System.out.println("After execute");
			
			resultSet.next();
			listingDetails = "{";
			listingDetails += "\"onid\": \"" + resultSet.getString("onid") + "\", ";
			listingDetails += "\"listingID\": \"" + resultSet.getInt("listingID") + "\", ";
			listingDetails += "\"type\": \"" + resultSet.getString("type") + "\", ";
			listingDetails += "\"title\": \"" + resultSet.getString("title") + "\", ";
			listingDetails += "\"campus\": \"" + resultSet.getString("campus") + "\", ";
			listingDetails += "\"description\": \"" + resultSet.getString("description") + "\", ";
			listingDetails += "\"imageIDs\": \"" + resultSet.getString("imageIDs") + "\", ";
			listingDetails += "\"price\": \"" + resultSet.getDouble("price") + "\", ";
			listingDetails += "\"payFrequency\": \"" + resultSet.getString("payFrequency") + "\", ";
			listingDetails += "\"datePosted\": \"" + resultSet.getTimestamp("datePosted").getTime() + "\", ";
			listingDetails += "\"showEmail\": \"" + resultSet.getInt("showEmail") + "\", ";
			listingDetails += "\"otherContact\": \"" + resultSet.getString("otherContact") + "\", ";
			listingDetails += "\"tags\": \"" + resultSet.getString("tags") + "\", ";
			listingDetails += "\"firstname\": \"" + resultSet.getString("firstname") + "\", ";
			listingDetails += "\"middlename\": \"" + resultSet.getString("middlename") + "\", ";
			listingDetails += "\"lastname\": \"" + resultSet.getString("lastname") + "\", ";
			listingDetails += "\"email\": \"" + resultSet.getString("email") + "\"}";
			
			System.out.println(listingDetails);
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			DBConnectionFactory.close(resultSet, preparedStatement, connect);
		}
		
		return listingDetails;
	}
	
	@Override
	public ArrayList<ListingPojo> getRecentListings() {
		
		String status = CommonConstants.STATUS_JDBC_ERROR;
		Connection connect = null;
		PreparedStatement preparedStatement = null;
		ResultSet resultSet = null;
		ArrayList<ListingPojo> listings = new ArrayList<>();
		
		try {
			connect = getConnection();
			preparedStatement = connect.prepareStatement(SqlConstants.GET_RECENT_LISTINGS);
			resultSet = preparedStatement.executeQuery();
			
			while(resultSet.next()) {
				ListingPojo listingPojo = new ListingPojo();
				listingPojo.setListingID(resultSet.getInt("listingID"));
				listingPojo.setOnid(resultSet.getString("onid"));
				listingPojo.setType(resultSet.getString("type"));
				listingPojo.setTitle(resultSet.getString("title"));
				listingPojo.setCampus(resultSet.getString("campus"));
				listingPojo.setDescription(resultSet.getString("description"));
				listingPojo.setImageIDs(resultSet.getString("imageIDs"));
				listingPojo.setPrice(resultSet.getDouble("price"));
				listingPojo.setPayFrequency(resultSet.getString("payFrequency"));
				listingPojo.setDatePosted(resultSet.getTimestamp("datePosted").getTime());
				listingPojo.setShowEmail(resultSet.getInt("showEmail"));
				listingPojo.setOtherContact(resultSet.getString("otherContact"));
				listingPojo.setTags(resultSet.getString("tags"));
				
				listings.add(listingPojo);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			DBConnectionFactory.close(resultSet, preparedStatement, connect);
		}
		
		return listings;
	}

	@Override
	public ArrayList<ListingPojo> getMyListings(String onid) {
		Connection connect = null;
		PreparedStatement preparedStatement = null;
		ResultSet resultSet = null;
		ArrayList<ListingPojo> userListings = new ArrayList<>();
		
		try {
			connect = getConnection();
			preparedStatement = connect.prepareStatement(SqlConstants.GET_MY_LISTINGS);
			preparedStatement.setString(1, onid);
			resultSet = preparedStatement.executeQuery();
			
			while(resultSet.next()) {
				ListingPojo listingPojo = new ListingPojo();
				listingPojo.setListingID(resultSet.getInt("listingID"));
				listingPojo.setOnid(resultSet.getString("onid"));
				listingPojo.setType(resultSet.getString("type"));
				listingPojo.setTitle(resultSet.getString("title"));
				listingPojo.setCampus(resultSet.getString("campus"));
				listingPojo.setDescription(resultSet.getString("description"));
				listingPojo.setImageIDs(resultSet.getString("imageIDs"));
				listingPojo.setPrice(resultSet.getDouble("price"));
				listingPojo.setPayFrequency(resultSet.getString("payFrequency"));
				listingPojo.setDatePosted(resultSet.getTimestamp("datePosted").getTime());
				listingPojo.setShowEmail(resultSet.getInt("showEmail"));
				listingPojo.setOtherContact(resultSet.getString("otherContact"));
				listingPojo.setTags(resultSet.getString("tags"));
				
				userListings.add(listingPojo);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			System.out.println("In getUserListings in DAOImpl: "+userListings.get(0).getTitle());
			DBConnectionFactory.close(resultSet, preparedStatement, connect);
		}
		
		return userListings;
	}
	
	@Override
	public ArrayList<ListingPojo> getMyRecentListings(String onid) {
		Connection connect = null;
		PreparedStatement preparedStatement = null;
		ResultSet resultSet = null;
		ArrayList<ListingPojo> userListings = new ArrayList<>();
		
		try {
			connect = getConnection();
			preparedStatement = connect.prepareStatement(SqlConstants.GET_MY_RECENT_LISTINGS);
			preparedStatement.setString(1, onid);
			resultSet = preparedStatement.executeQuery();
			
			while(resultSet.next()) {
				ListingPojo listingPojo = new ListingPojo();
				listingPojo.setListingID(resultSet.getInt("listingID"));
				listingPojo.setOnid(resultSet.getString("onid"));
				listingPojo.setType(resultSet.getString("type"));
				listingPojo.setTitle(resultSet.getString("title"));
				listingPojo.setCampus(resultSet.getString("campus"));
				listingPojo.setDescription(resultSet.getString("description"));
				listingPojo.setImageIDs(resultSet.getString("imageIDs"));
				listingPojo.setPrice(resultSet.getDouble("price"));
				listingPojo.setPayFrequency(resultSet.getString("payFrequency"));
				listingPojo.setDatePosted(resultSet.getTimestamp("datePosted").getTime());
				listingPojo.setShowEmail(resultSet.getInt("showEmail"));
				listingPojo.setOtherContact(resultSet.getString("otherContact"));
				listingPojo.setTags(resultSet.getString("tags"));
				
				userListings.add(listingPojo);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			System.out.println("In getUserListings in DAOImpl: "+userListings.get(0).getTitle());
			DBConnectionFactory.close(resultSet, preparedStatement, connect);
		}
		
		return userListings;
	}
	
	public ArrayList<ListingPojo> searchListings(SearchListingPojo slPojo) {
		Connection connect = null;
		PreparedStatement preparedStatement = null;
		ResultSet resultSet = null;
		ArrayList<ListingPojo> listings = new ArrayList<>();
		
		String[] queryWords = slPojo.getQuery().split(" ");
		try {
			connect = getConnection();
			System.out.println(queryWords.length);
			for (int i = 0; i < queryWords.length; i++) {

				preparedStatement = connect.prepareStatement(SqlConstants.SEARCH_LISTINGS);
				preparedStatement.setString(1, slPojo.getType());
				preparedStatement.setString(2, "%"+queryWords[i]+"%");
				preparedStatement.setString(3, "%"+queryWords[i]+"%");
				resultSet = preparedStatement.executeQuery();
				
				while(resultSet.next()) {
					ListingPojo listingPojo = new ListingPojo();
					listingPojo.setListingID(resultSet.getInt("listingID"));
					listingPojo.setOnid(resultSet.getString("onid"));
					listingPojo.setType(resultSet.getString("type"));
					listingPojo.setTitle(resultSet.getString("title"));
					listingPojo.setCampus(resultSet.getString("campus"));
					listingPojo.setDescription(resultSet.getString("description"));
					listingPojo.setImageIDs(resultSet.getString("imageIDs"));
					listingPojo.setPrice(resultSet.getDouble("price"));
					listingPojo.setPayFrequency(resultSet.getString("payFrequency"));
					listingPojo.setDatePosted(resultSet.getTimestamp("datePosted").getTime());
					listingPojo.setShowEmail(resultSet.getInt("showEmail"));
					listingPojo.setOtherContact(resultSet.getString("otherContact"));
					listingPojo.setTags(resultSet.getString("tags"));
					
					System.out.println(listingPojo.toString());
					boolean contains = false;
					for (int j = 0; j < listings.size(); j++) {
						if (listingPojo.getListingID() == listings.get(j).getListingID()) {
							contains = true;
						}
					}
					if (!contains) {
						listings.add(listingPojo);
					}
				}
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			DBConnectionFactory.close(resultSet, preparedStatement, connect);
		}
		
		return listings;
	}
	
	public String deleteListing(int listingID) {
		String status = CommonConstants.STATUS_JDBC_ERROR;
		Connection connect = null;
		PreparedStatement preparedStatement = null;
		ResultSet resultSet = null;
		
		try {
			connect = getConnection();
			preparedStatement = connect.prepareStatement(SqlConstants.DELETE_LISTING);
			preparedStatement.setInt(1, listingID);
						
			int executeUpdate = preparedStatement.executeUpdate();

			if (executeUpdate > 0) {
				status = CommonConstants.STATUS_JDBC_OK;
			}
			
		} catch (Exception e) {
			status = CommonConstants.STATUS_JDBC_ERROR;
			e.printStackTrace();
		} finally {
			DBConnectionFactory.close(resultSet, preparedStatement, connect);
		}
		return status;
	}

	@Override
	public String updateListing(ListingPojo listingPojo) {
		String status = CommonConstants.STATUS_JDBC_ERROR;
		Connection connect = null;
		PreparedStatement preparedStatement = null;
		ResultSet resultSet = null;
		
		try {
			connect = getConnection();
			preparedStatement = connect.prepareStatement(SqlConstants.UPDATE_LISTING);
			preparedStatement.setString(1, listingPojo.getType());
			preparedStatement.setString(2, listingPojo.getTitle());
			preparedStatement.setString(3, listingPojo.getCampus());
			preparedStatement.setString(4, listingPojo.getDescription());
			//TODO - Add code to update imageID 
			//preparedStatement.setString(5, listingPojo.get);
			preparedStatement.setDouble(5, listingPojo.getPrice());
			preparedStatement.setLong(6, listingPojo.getDatePosted());
			preparedStatement.setInt(7, listingPojo.getShowEmail());
			preparedStatement.setString(8, listingPojo.getOtherContact());
			preparedStatement.setString(9, listingPojo.getTags());
			preparedStatement.setInt(10, listingPojo.getListingID());
			preparedStatement.setString(11, listingPojo.getOnid());
			
			int executeUpdate = preparedStatement.executeUpdate();
			
			if(executeUpdate == 1) {
				status = CommonConstants.STATUS_JDBC_OK;
			}
			
		} catch (ClassNotFoundException | SQLException | IOException | NamingException e) {
			status = CommonConstants.STATUS_JDBC_ERROR;
			e.printStackTrace();
		} finally {
			DBConnectionFactory.close(resultSet, preparedStatement, connect);
		}
		
		
		
		return status;
	}
}
