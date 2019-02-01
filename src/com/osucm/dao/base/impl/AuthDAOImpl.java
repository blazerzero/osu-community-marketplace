package com.osucm.dao.base.impl;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.naming.NamingException;

import com.osucm.common.constants.CommonConstants;
import com.osucm.common.constants.SqlConstants;
import com.osucm.dao.base.interfaces.AuthDAO;
import com.osucm.database.connection.DBConnectionFactory;
import com.osucm.database.pojo.UserPojo;

public class AuthDAOImpl implements AuthDAO {
	
	Connection connection = null;

	@Override
	public Connection getConnection() throws SQLException, FileNotFoundException, ClassNotFoundException, IOException, NamingException {
		if ((connection == null) || (connection.isClosed())) {
			connection = DBConnectionFactory.getConnection();
		}
		return connection;
	}
	
	@Override
	public String addUser(UserPojo user) {
		String status = CommonConstants.STATUS_JDBC_ERROR;
		Connection connect = null;
		PreparedStatement preparedStatement = null;
		ResultSet resultSet = null;
		
		try {
			connect = getConnection();
			preparedStatement = connect.prepareStatement(SqlConstants.ADD_USER);
			System.out.println(user.getOnid());
			System.out.println(user.getFirstname());
			System.out.println(user.getMiddlename());
			System.out.println(user.getLastname());
			System.out.println(user.getEmail());
			preparedStatement.setString(1, user.getOnid());
			preparedStatement.setString(2, user.getFirstname());
			preparedStatement.setString(3, user.getMiddlename());
			preparedStatement.setString(4, user.getLastname());
			preparedStatement.setString(5, user.getEmail());
			preparedStatement.setString(6, user.getOnid());
			
			int executeUpdate = preparedStatement.executeUpdate();
			System.out.println(executeUpdate);

			if (executeUpdate > 0) {
				status = CommonConstants.STATUS_JDBC_OK;
			}
			
		} catch (Exception e) {
			status = e.getMessage();
			e.printStackTrace();
		} finally {
			DBConnectionFactory.close(resultSet, preparedStatement, connect);
		}
		return status;
		
	};

}
