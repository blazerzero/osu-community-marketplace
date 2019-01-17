package com.osucm.controller;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;
import com.mysql.cj.Session;
import com.osucm.common.constants.CommonConstants;
import com.osucm.dao.base.impl.NotifyDAOImpl;
import com.osucm.dao.base.interfaces.NotifyDAO;
import com.osucm.database.pojo.NotifyPojo;

public class NotifyController extends HttpServlet {
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String message = null;
		String jsonData = null;
		message = request.getParameter("message");
		jsonData = request.getParameter("JDATA");
		NotifyDAO dao = null;

		System.out.println("NotifyController:doPost @@@@@ message :: " + message + " jdata :: " + jsonData);
		
        if (null != message && CommonConstants.OP_ADD_NOTIFY_EMAIL.equalsIgnoreCase(message)) {
            
            Gson gson = new Gson();
            dao = new NotifyDAOImpl();
            NotifyPojo notifyObj = gson.fromJson(jsonData, NotifyPojo.class);
            System.out.println("NOTIFYOBJ: " + notifyObj);
            String status = dao.insertEmail(notifyObj.getEmail());
            response.getWriter().write(status);
            
        }
		System.out.println("NotifyController:doPost Exiting...");
	}

}
