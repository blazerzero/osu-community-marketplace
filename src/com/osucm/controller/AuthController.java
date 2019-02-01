package com.osucm.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.osucm.common.constants.CommonConstants;
import com.osucm.dao.base.impl.AuthDAOImpl;
import com.osucm.dao.base.interfaces.AuthDAO;
import com.osucm.database.pojo.UserPojo;

public class AuthController extends HttpServlet {
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String message = null;
		String jsonData = null;
		message = request.getParameter("message");
		jsonData = request.getParameter("JDATA");
		AuthDAO dao = null;

		System.out.println("AuthController:doPost @@@@@ message :: " + message + " jdata :: " + jsonData);
		
		
        if (null != message && CommonConstants.OP_ADD_USER.equalsIgnoreCase(message)) {
        	Gson gson = new Gson();
        	dao = new AuthDAOImpl();
        	UserPojo user = gson.fromJson(jsonData, UserPojo.class);
        	System.out.println(user);
        	String status = dao.addUser(user);
        	System.out.println(status);
        	response.getWriter().write(status);
        }

		System.out.println("AuthController:doPost Exiting...");

	}

}
