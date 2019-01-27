package com.osucm.common.constants;

public interface SqlConstants {
	
	String INSERT_NOTIFY_EMAIL = "INSERT INTO notify_list (email) VALUES (?) ON DUPLICATE KEY UPDATE email = ?";
	String VIEW_LISTINGS = "SELECT * FROM LISTINGS WHERE TYPE=?";

}
