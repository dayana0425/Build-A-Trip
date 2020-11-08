package com.tco.requests;

import java.lang.String;
import java.sql.*;
import java.util.ArrayList;

public class FiltersDBRequests {
    private String table;
    private String isTravis;
    private String useTunnel;
    private String DB_URL;
    private String DB_USER;
    private String DB_PASSWORD;
    private String QUERY;
    private ArrayList<String> countries = new ArrayList<String>();


    public FiltersDBRequests(String table) {
        this.table = table;
    }

    public void environment() {
        isTravis = System.getenv("TRAVIS");
        useTunnel = System.getenv("CS314_USE_DATABASE_TUNNEL");

        if (isTravis != null && isTravis.equals("true")) {
            DB_URL = "jdbc:mysql://127.0.0.1/cs314";
            DB_USER = "root";
            DB_PASSWORD = "";
        } else if (useTunnel != null && useTunnel.equals("true")) {
            DB_URL = "jdbc:mysql://127.0.0.1:56247/cs314"; // the port-number is 56247
            DB_USER = "cs314-db";
            DB_PASSWORD = "eiK5liet1uej";
        } else {
            DB_URL = "jdbc:mysql://faure.cs.colostate.edu/cs314";
            DB_USER = "cs314-db";
            DB_PASSWORD = "eiK5liet1uej";
        }
    }

    public void getQuery() {
        if(table.equals("country")){
            this.QUERY = "SELECT name FROM country ORDER BY name ASC";
            return;
        }
    }

    public void connect2DB() {
        try (
                Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
                Statement query = conn.createStatement();
                ResultSet results = query.executeQuery(QUERY);
        ){
            if(table.equals("country")) {
                helpCountries(results);
            }
        }
        catch (Exception e) {
            System.err.println("Exception: " + e.getMessage());
        }
    }

    public void helpCountries(ResultSet results) throws SQLException {
        ArrayList<String> countries = new ArrayList<>();

        while(results.next()){
            if(results.getString("name").equals("Unknown or unassigned country")){
                continue;
            }
            countries.add(results.getString("name"));
        }

        this.countries = countries;
    }

    public ArrayList<String> getCountries() {
        return this.countries;
    }

}