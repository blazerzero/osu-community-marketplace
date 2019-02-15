package com.osucm.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.osucm.common.constants.CommonConstants;
import com.osucm.dao.base.impl.ListingDAOImpl;
import com.osucm.dao.base.interfaces.ListingDAO;
import com.osucm.database.pojo.ListingPojo;
import com.osucm.database.pojo.SearchListingPojo;

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
            //System.out.println("before");
            ArrayList<ListingPojo> listings = dao.getListings(searchListing.getType());
            System.out.println("LISTINGOBJ: " + searchListing);
            String jsonString = gson.toJson(listings);
            response.getWriter().write(jsonString);          
        }
        
        else if (null != message && CommonConstants.OP_ADD_LISTING.equalsIgnoreCase(message)) {      	
        	Gson gson = new Gson();
        	ListingPojo newListing = gson.fromJson(jsonData, ListingPojo.class);
        	dao = new ListingDAOImpl();
        	String listingID = String.valueOf(dao.addListing(newListing));
        	System.out.println("ListingController -- listingID: " + listingID);
        	response.getWriter().write(listingID);
        }
        
        else if (null != message && CommonConstants.OP_GET_LISTING_DETAILS.equalsIgnoreCase(message)) {
        	Gson gson = new Gson();
        	ListingPojo newListing = gson.fromJson(jsonData, ListingPojo.class);
        	//System.out.println("HERE");
        	//System.out.println(newListing.getListingID());
        	dao = new ListingDAOImpl();
        	String jsonDetails = dao.getListingDetails(newListing.getListingID());
        	response.getWriter().write(jsonDetails);
        }
        
        else if (null != message && CommonConstants.OP_GET_RECENT_LISTINGS.equalsIgnoreCase(message)) {
            Gson gson = new Gson();
            ListingPojo searchListing = gson.fromJson(jsonData, ListingPojo.class);
            dao = new ListingDAOImpl(); 
            System.out.println("before");
            ArrayList<ListingPojo> listings = dao.getRecentListings();
            Collections.sort(listings, new Comparator<ListingPojo>() {
            	public int compare(ListingPojo o1, ListingPojo o2) {
            		return (int)(o1.getDatePosted() - o2.getDatePosted());
            	}
            });
            System.out.println("LISTINGOBJ: " + listings);
            String jsonString = gson.toJson(listings);
            response.getWriter().write(jsonString);          
        } 
        
        else if (null != message && CommonConstants.OP_GET_MY_LISTINGS.equalsIgnoreCase(message)) {
        	Gson gson = new Gson();
        	ListingPojo userListingPojo = gson.fromJson(jsonData, ListingPojo.class);
        	dao = new ListingDAOImpl();
        	ArrayList<ListingPojo> listings = dao.getMyListings(userListingPojo.getOnid());
        	String jsonString = gson.toJson(listings);
        	response.getWriter().write(jsonString);
        }
        
        else if (null != message && CommonConstants.OP_GET_MY_RECENT_LISTINGS.equalsIgnoreCase(message)) {
        	Gson gson = new Gson();
        	ListingPojo userListingPojo = gson.fromJson(jsonData, ListingPojo.class);
        	dao = new ListingDAOImpl();
        	ArrayList<ListingPojo> listings = dao.getMyRecentListings(userListingPojo.getOnid());
        	String jsonString = gson.toJson(listings);
        	response.getWriter().write(jsonString);
        }
        
        else if (null != message && CommonConstants.OP_SEARCH_LISTINGS.equalsIgnoreCase(message)) {
            Gson gson = new Gson();
            SearchListingPojo searchListing = gson.fromJson(jsonData, SearchListingPojo.class);
            dao = new ListingDAOImpl(); 
            //System.out.println("before");
            ArrayList<ListingPojo> listings = dao.searchListings(searchListing);
            System.out.println("LISTINGOBJ: " + searchListing);
            String jsonString = gson.toJson(listings);
            response.getWriter().write(jsonString);          
        }
        
        else if (null != message && CommonConstants.OP_DELETE_LISTING.equalsIgnoreCase(message)) {      	
        	Gson gson = new Gson();
        	ListingPojo newListing = gson.fromJson(jsonData, ListingPojo.class);
        	dao = new ListingDAOImpl();
        	String status = dao.deleteListing(newListing.getListingID());
        	response.getWriter().write(status);
        }
        
        else if (null != message && CommonConstants.OP_ADD_IMAGE_ID_TO_NEW_LISTING.equalsIgnoreCase(message)) {
        	Gson gson = new Gson();
        	ListingPojo newListing = gson.fromJson(jsonData, ListingPojo.class);
        	System.out.println("got json");
        	dao = new ListingDAOImpl();
        	String status = dao.addImageIDToNewListing(newListing.getListingID(), newListing.getImageIDs());
        	response.getWriter().write(status);
        }
        
        else if (null != message && CommonConstants.OP_UPDATE_LISTING.equalsIgnoreCase(message)) {      	
        	Gson gson = new Gson();
        	ListingPojo newListing = gson.fromJson(jsonData, ListingPojo.class);
        	dao = new ListingDAOImpl();
        	String status = dao.updateListing(newListing);
        	response.getWriter().write(status);
        }
        
		System.out.println("ListingController:doPost Exiting...");
	}

}
