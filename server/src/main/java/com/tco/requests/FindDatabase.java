package com.tco.requests;

import org.eclipse.jetty.client.util.StringContentProvider;

import java.lang.Integer;
import java.lang.String;
import java.util.ArrayList;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import  java.sql.ResultSet;


public class FindDatabase {

    private String match;
    private int limit;
    private int count;
    private ArrayList<ArrayList<String>> places;
    private String useTunnel;
    public FindDatabase(String match, int limit){
        this.match = match;
        this.limit = limit;
    }


    public void connect2DB() {
        String isTravis = System.getenv("TRAVIS");
        useTunnel = System.getenv("CS314_USE_DATABASE_TUNNEL");
        // Note that if the variable isn't defined, System.getenv will return null
        //String isTravis = "true";
        String DB_URL;
        String DB_USER;
        String DB_PASSWORD;
        if(isTravis != null && isTravis.equals("true")) {
            DB_URL = "jdbc:mariadb://127.0.0.1:56247/cs314";
            DB_USER = "root";
            DB_PASSWORD = null;
        }
        else if (useTunnel != null && useTunnel.equals("true")) {
            DB_URL = "jdbc:mariadb://127.0.0.1:56247/cs314";        // the port-number is 56247
            DB_USER = "cs314-db";
            DB_PASSWORD = "eiK5liet1uej";
        } else {
            DB_URL = "jdbc:mariadb://faure.cs.colostate.edu/cs314";
            DB_USER = "cs314-db";
            DB_PASSWORD = "eiK5liet1uej";
        }
        String limitation = Integer.toString(limit);
        String QUERY = "SELECT name, type,latitude,longitude,municipality from " +
                        "world where name like '%" + match + "%' limit " + limit;
            try ( // connect to the database and query
              Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
              Statement query = conn.createStatement();
              ResultSet results = query.executeQuery(QUERY);
            )
            {
                count = 0;
                places = new ArrayList<ArrayList<String>>();
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

    public int getCount(){return count;}

    public ArrayList<ArrayList<String>> getPlaces(){return places;}

    public String getUseDatabaseTunnel() {return useTunnel;}


}