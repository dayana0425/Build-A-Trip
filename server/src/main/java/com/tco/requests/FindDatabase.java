package com.tco.requests;

import java.lang.String;
import java.util.ArrayList;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;


public class FindDatabase {
    private RequestFind rf;
    private int count = 0;
    private ArrayList<ArrayList<String>> places;

    public void connect2DB() {
        String useTunnel = System.getenv("CS314_USE_DATABASE_TUNNEL");
        // Note that if the variable isn't defined, System.getenv will return null
        String DB_URL;
        if (useTunnel != null && useTunnel.equals("true")) {
            DB_URL = "jdbc:mysql://127.0.0.1:56247/cs314";        // the port-number is 56247
        } else {
            DB_URL = "jdbc:mysql://faure.cs.colostate.edu/cs314";
        }
        String DB_USER = "cs314-db";
        String DB_PASSWORD = "eiK5liet1uej";
        String name = rf.getMatch();
        String limit = Integer.toString(rf.getLimit());
        String QUERY = "SELECT name, type,latitude,longitude,municipality from " +
                        "world where name like '%" + name + "%' limit " + limit;
        {
            try ( // connect to the database and query
              Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
              Statement query = conn.createStatement();
              ResultSet results = query.executeQuery(QUERY);
            )
            {
            while (results.next()) {
                ArrayList<String> data = new ArrayList<String>();
                data.add(results.getString("name"));
                data.add(results.getString("type"));
                data.add(results.getString("latitude"));
                data.add(results.getString("longitude"));
                data.add(results.getString("municipality"));
                count++;
                places.add(data);
            }
        }
        catch(Exception e){
                System.err.println("Exception: " + e.getMessage());
            }
        }
    }

    public int getCount(){return count;}

    public ArrayList<ArrayList<String>> getPlaces(){return places;}


}