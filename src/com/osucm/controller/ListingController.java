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
import com.osucm.dao.base.interfaces.ListingDAO;
import com.osucm.database.pojo.ListingPojo;

public class ListingController extends HttpServlet {
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String message = null;
		String jsonData = null;
		message = request.getParameter("message");
		jsonData = request.getParameter("JDATA");
		ListingDAO dao = null;

		System.out.println("ListingController:doPost @@@@@ message :: " + message + " jdata :: " + jsonData);
		
        if (null != message && CommonConstants.OP_GET_LISTINGS.equalsIgnoreCase(message)) {
            Gson gson = new Gson();
            ListingPojo searchListing = gson.fromJson(jsonData, ListingPojo.class);
            dao = new ListingDAOImpl(); 
            System.out.println("before");
            ArrayList<ListingPojo> listings = dao.getListings(searchListing.getType());
            System.out.println("LISTINGOBJ: " + searchListing);
            String jsonString = gson.toJson(listings);
            response.getWriter().write(jsonString);          
        }
        
        else if (null != message && CommonConstants.OP_ADD_LISTING.equalsIgnoreCase(message)) {      	
        	Gson gson = new Gson();
        	ListingPojo newListing = gson.fromJson(jsonData, ListingPojo.class);
        	dao = new ListingDAOImpl();
        	String status = dao.addListing(newListing);
        	response.getWriter().write(status);
        }
        
        else if (null != message && CommonConstants.OP_GET_LISTING_DETAILS.equalsIgnoreCase(message)) {
        	Gson gson = new Gson();
        	ListingPojo newListing = gson.fromJson(jsonData, ListingPojo.class);
        	dao = new ListingDAOImpl();
        	String jsonDetails = dao.getListingDetails(newListing.getListingID());
        	response.getWriter().write(jsonDetails);
        }
        
        else if (null != message && CommonConstants.OP_GET_RECENT_LISTINGS.equalsIgnoreCase(message)) {
            Gson gson = new Gson();
            ListingPojo searchListing = gson.fromJson(jsonData, ListingPojo.class);
            dao = new ListingDAOImpl(); 
            System.out.println("before");
            ArrayList<ListingPojo> listings = dao.getListings(searchListing.getType());
            System.out.println("LISTINGOBJ: " + searchListing);
            String jsonString = gson.toJson(listings);
            response.getWriter().write(jsonString);          
        }
        
		System.out.println("ListingController:doPost Exiting...");
	}

}
