package com.osucm.dao.base.interfaces;

import com.osucm.dao.base.GenericDAO;
import com.osucm.database.pojo.UserPojo;

public interface AuthDAO extends GenericDAO {
	
	public String addUser(UserPojo user);

}
