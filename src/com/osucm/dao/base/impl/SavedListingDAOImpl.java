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

import com.osucm.common.constants.CommonConstants;
import com.osucm.common.constants.SqlConstants;
import com.osucm.dao.base.interfaces.SavedListingDAO;
import com.osucm.database.connection.DBConnectionFactory;
import com.osucm.database.pojo.ListingPojo;
import com.osucm.database.pojo.SavedListingPojo;

public class SavedListingDAOImpl implements SavedListingDAO {
	
	Connection connection = null;

	@Override
	public Connection getConnection() throws SQLException, FileNotFoundException, ClassNotFoundException, IOException, NamingException {
		if ((connection == null) || (connection.isClosed())) {
			connection = DBConnectionFactory.getConnection();
		}
		return connection;
	}
	
	@Override
	public String saveListing(SavedListingPojo savedListing) {
		String status = CommonConstants.STATUS_JDBC_ERROR;
		Connection connect = null;
		PreparedStatement preparedStatement = null;
		ResultSet resultSet = null;
		
		try {
			connect = getConnection();
			Timestamp dt = new Timestamp(System.currentTimeMillis());
			preparedStatement = connect.prepareStatement(SqlConstants.SAVE_LISTING);
			preparedStatement.setString(1, savedListing.getOnid());
			preparedStatement.setInt(2, savedListing.getListingID());
			preparedStatement.setTimestamp(3, dt);
			
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
	public ArrayList<SavedListingPojo> getSavedListings(String onid) {
		String status = CommonConstants.STATUS_JDBC_ERROR;
		Connection connect = null;
		PreparedStatement preparedStatement = null;
		ResultSet resultSet = null;
		ArrayList<SavedListingPojo> savedListings = new ArrayList<>();
		
		try {
			connect = getConnection();
			preparedStatement = connect.prepareStatement(SqlConstants.GET_SAVED_LISTINGS);
			preparedStatement.setString(1, onid);
			resultSet = preparedStatement.executeQuery();
			
			while(resultSet.next()) {
				System.out.println(resultSet);
				SavedListingPojo savedListingPojo = new SavedListingPojo();
				savedListingPojo.setOnid(resultSet.getString("onid"));
				savedListingPojo.setListingID(resultSet.getInt("listingID"));
				savedListingPojo.setDateSaved(resultSet.getTimestamp("dateSaved").getTime());
				savedListingPojo.setTitle(resultSet.getString("title"));
				savedListingPojo.setType(resultSet.getString("type"));
				savedListingPojo.setCampus(resultSet.getString("campus"));
				savedListingPojo.setImageIDs(resultSet.getString("imageIDs"));
				savedListingPojo.setDescription(resultSet.getString("description"));
				savedListingPojo.setPrice(resultSet.getDouble("price"));
				savedListingPojo.setDatePosted(resultSet.getTimestamp("datePosted").getTime());
				
				savedListings.add(savedListingPojo);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			DBConnectionFactory.close(resultSet, preparedStatement, connect);
		}
		
		return savedListings;
	}
	
	@Override
	public ArrayList<SavedListingPojo> getRecentSavedListings(String onid) {
		String status = CommonConstants.STATUS_JDBC_ERROR;
		Connection connect = null;
		PreparedStatement preparedStatement = null;
		ResultSet resultSet = null;
		ArrayList<SavedListingPojo> savedListings = new ArrayList<>();
		
		try {
			connect = getConnection();
			preparedStatement = connect.prepareStatement(SqlConstants.GET_RECENT_SAVED_LISTINGS);
			preparedStatement.setString(1, onid);
			resultSet = preparedStatement.executeQuery();
			
			while(resultSet.next()) {
				System.out.println(resultSet);
				SavedListingPojo savedListingPojo = new SavedListingPojo();
				savedListingPojo.setOnid(resultSet.getString("onid"));
				savedListingPojo.setListingID(resultSet.getInt("listingID"));
				savedListingPojo.setDateSaved(resultSet.getTimestamp("dateSaved").getTime());
				savedListingPojo.setTitle(resultSet.getString("title"));
				savedListingPojo.setType(resultSet.getString("type"));
				savedListingPojo.setCampus(resultSet.getString("campus"));
				savedListingPojo.setImageIDs(resultSet.getString("imageIDs"));
				savedListingPojo.setDescription(resultSet.getString("description"));
				savedListingPojo.setPrice(resultSet.getDouble("price"));
				savedListingPojo.setDatePosted(resultSet.getTimestamp("datePosted").getTime());
				
				savedListings.add(savedListingPojo);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			DBConnectionFactory.close(resultSet, preparedStatement, connect);
		}
		
		return savedListings;
	}
	
	@Override
	public String removeListingFromSavedList(SavedListingPojo savedListing) {
		String status = CommonConstants.STATUS_JDBC_ERROR;
		Connection connect = null;
		PreparedStatement preparedStatement = null;
		ResultSet resultSet = null;
		
		try {
			connect = getConnection();
			preparedStatement = connect.prepareStatement(SqlConstants.REMOVE_LISTING_FROM_SAVED_LIST);
			preparedStatement.setInt(1, savedListing.getListingID());
			preparedStatement.setString(2, savedListing.getOnid());
						
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
	
}
