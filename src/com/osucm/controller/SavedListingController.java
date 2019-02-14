package com.osucm.controller;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.osucm.common.constants.CommonConstants;
import com.osucm.dao.base.impl.ListingDAOImpl;
import com.osucm.dao.base.impl.SavedListingDAOImpl;
import com.osucm.dao.base.interfaces.ListingDAO;
import com.osucm.dao.base.interfaces.SavedListingDAO;
import com.osucm.database.pojo.ListingPojo;
import com.osucm.database.pojo.SavedListingPojo;

public class SavedListingController extends HttpServlet {
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String message = null;
		String jsonData = null;
		message = request.getParameter("message");
		jsonData = request.getParameter("JDATA");
		SavedListingDAO dao = null;

		System.out.println("SavedListingController:doPost @@@@@ message :: " + message + " jdata :: " + jsonData);
		
		if (null != message && CommonConstants.OP_SAVE_LISTING.equalsIgnoreCase(message)) {
        	Gson gson = new Gson();
        	SavedListingPojo savedListingPojo = gson.fromJson(jsonData, SavedListingPojo.class);
        	dao = new SavedListingDAOImpl();
        	String status = dao.saveListing(savedListingPojo);
        	response.getWriter().write(status);
        }
        
        else if (null != message && CommonConstants.OP_GET_SAVED_LISTINGS.equalsIgnoreCase(message)) {
        	Gson gson = new Gson();
        	SavedListingPojo savedListingPojo = gson.fromJson(jsonData, SavedListingPojo.class);
        	dao = new SavedListingDAOImpl();
        	System.out.println(savedListingPojo.getOnid());
        	ArrayList<SavedListingPojo> savedListings = dao.getSavedListings(savedListingPojo.getOnid());
        	String jsonString = gson.toJson(savedListings);
        	response.getWriter().write(jsonString);
        }
		
        else if (null != message && CommonConstants.OP_REMOVE_LISTING_FROM_SAVED.equalsIgnoreCase(message)) {      	
        	Gson gson = new Gson();
        	SavedListingPojo savedListing = gson.fromJson(jsonData, SavedListingPojo.class);
        	dao = new SavedListingDAOImpl();
        	String status = dao.removeListingFromSavedList(savedListing);
        	response.getWriter().write(status);
        }
		
		System.out.println("SavedListingController:doPost Exiting...");
	}

}
