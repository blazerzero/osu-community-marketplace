package com.osucm.dao.base.impl;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.stream.Collectors;

import javax.naming.NamingException;

import com.osucm.common.constants.CommonConstants;
import com.osucm.common.constants.SqlConstants;
import com.osucm.dao.base.interfaces.ListingDAO;
import com.osucm.database.connection.DBConnectionFactory;
import com.osucm.database.pojo.ListingPojo;

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
		
		String status = CommonConstants.STATUS_JDBC_ERROR;
		Connection connect = null;
		PreparedStatement preparedStatement = null;
		ResultSet resultSet = null;
		ArrayList<ListingPojo> listings = new ArrayList<>();
		
		try {
			connect = getConnection();
			preparedStatement = connect.prepareStatement(SqlConstants.VIEW_LISTINGS);
			preparedStatement.setString(1, type);
			resultSet = preparedStatement.executeQuery();
			
			while(resultSet.next()) {
				ListingPojo listingPojo = new ListingPojo();
				listingPojo.setListingID(resultSet.getInt("listingID"));
				listingPojo.setOnid(resultSet.getInt("onid"));
				listingPojo.setType(resultSet.getString("type"));
				listingPojo.setTitle(resultSet.getString("title"));
				listingPojo.setDescription(resultSet.getString("description"));
				listingPojo.setImageIDs((ArrayList<Integer>) Arrays.stream(resultSet.getString("imageIDs").split(";")).map(Integer::parseInt).collect(Collectors.toList()));
				listingPojo.setPrice(resultSet.getDouble("price"));
				listingPojo.setDatePosted(resultSet.getTimestamp("datePosted"));
				listingPojo.setShowEmail(resultSet.getBoolean("showEmail"));
				listingPojo.setShowPhone(resultSet.getBoolean("showPhone"));
				
				listings.add(listingPojo);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			DBConnectionFactory.close(resultSet, preparedStatement, connect);
		}
		
		return listings;
	}

}
