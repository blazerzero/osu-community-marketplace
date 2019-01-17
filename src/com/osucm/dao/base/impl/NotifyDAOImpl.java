package com.osucm.dao.base.impl;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.naming.NamingException;

import com.osucm.database.connection.DBConnectionFactory;
import com.osucm.common.constants.SqlConstants;
import com.osucm.common.constants.CommonConstants;
import com.osucm.dao.base.interfaces.NotifyDAO;

public class NotifyDAOImpl implements NotifyDAO {
	
	Connection connection = null;

	@Override
	public Connection getConnection() throws SQLException, FileNotFoundException, ClassNotFoundException, IOException, NamingException {
		if ((connection == null) || (connection.isClosed())) {
			connection = DBConnectionFactory.getConnection();
		}
		return connection;
	}
	
	public String insertEmail(String email) {
		
		String status = CommonConstants.STATUS_JDBC_ERROR;
		Connection connect = null;
		PreparedStatement preparedStatement = null;
		ResultSet resultSet = null;
		
		try {
			connect = getConnection();
			preparedStatement = connect.prepareStatement(SqlConstants.INSERT_NOTIFY_EMAIL);
			preparedStatement.setString(1, email);
			preparedStatement.setString(2, email);
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
