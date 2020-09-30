package com.tco.requests;

import org.eclipse.jetty.client.util.StringContentProvider;

import java.lang.Integer;
import java.lang.String;
import java.util.ArrayList;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import  java.sql.ResultSet;
import java.util.Queue;


public class FindDatabase {

    private String match;
    private int limit;
    private int count;
    private ArrayList<Place> places = new ArrayList<Place>;
    private String useTunnel;
    public FindDatabase(String match, int limit){
        this.match = match;
        this.limit = limit;
    }


    public void connect2DB() {
        String isTravis = System.getenv("TRAVIS");
        useTunnel = System.getenv("CS314_USE_DATABASE_TUNNEL");
        String DB_URL;
        String DB_USER;
        String DB_PASSWORD;
        if(isTravis != null && isTravis.equals("true")) {
            DB_URL = "jdbc:mysql://127.0.0.1/cs314";
            DB_USER = "root";
            DB_PASSWORD = null;
        }
        else if (useTunnel != null && useTunnel.equals("true")) {
            DB_URL = "jdbc:mysql://127.0.0.1:56247/cs314";        // the port-number is 56247
            DB_USER = "cs314-db";
            DB_PASSWORD = "eiK5liet1uej";
        } else {
            DB_URL = "jdbc:mysql://faure.cs.colostate.edu/cs314";
            DB_USER = "cs314-db";
            DB_PASSWORD = "eiK5liet1uej";
        }
        String limitation = Integer.toString(limit);
        String QUERY =
                "SELECT world.name,world.id,world.type,world.latitude,world.longitude,world.municipality,world.altitude " +
                "FROM world INNER JOIN continent INNER JOIN region INNER JOIN country " +
                "WHERE world.continent = continent.id AND world.iso_region = region.id AND world.iso_country = country.id AND " +
                "(world.name LIKE '%" + match + "%' OR world.municipality LIKE '%" + match + "%' OR continent.name LIKE '%" + match + "%' OR region.name LIKE '%" + match + "%') " +
                "ORDER BY world.name asc LIMIT ;";
            try ( // connect to the database and query
              Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
              Statement query = conn.createStatement();
              ResultSet results = query.executeQuery(QUERY);
            )
            {
                System.out.println(QUERY);
                count = 0;
                places = new ArrayList<Place>();
                while (results.next()) {
                  Place p = new Place(

                          results.getString("name"),
                          results.getString("latitude"),
                          results.getString("longitude"),
                          results.getString("id"),
                          results.getString("altitude"),
                          results.getString("municipality"),
                          results.getString("type")
                  );
                  count++;
                  places.add(p);
                }
            }
            catch(Exception e){
                System.err.println("Exception: " + e.getMessage());
            }

    }

    public int getCount(){return count;}

    public ArrayList<Place> getPlaces(){return places;}

    public String getUseDatabaseTunnel() {return useTunnel;}


}