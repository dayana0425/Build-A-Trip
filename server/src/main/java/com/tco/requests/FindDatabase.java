package com.tco.requests;
import java.lang.String;
import java.sql.*;
import java.util.ArrayList;

public class FindDatabase {
    private Integer limit = 0;
    private int count = 0;
    private ArrayList<Place> places = new ArrayList<Place>();
    private String match;
    private String isTravis;
    private String useTunnel;
    private String DB_URL;
    private String DB_USER;
    private String DB_PASSWORD;
    private String QUERY;
    private Boolean isRandom = false;

    public FindDatabase(String match, Integer limit){
        this.match = match;
        this.limit = limit;
    }

    public FindDatabase(String match){
        this.match = match;
        this.limit = 0;

    }

    public FindDatabase(){
        this.match = getRandomMatch(2);
        this.isRandom = true;
    }

    public void environment(){
        isTravis = System.getenv("TRAVIS");
        useTunnel = System.getenv("CS314_USE_DATABASE_TUNNEL");

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
    }

    public void getQuery(){
        if(isTravis != null && isTravis.equals("true")){
            QUERY = "SELECT name, id, type, latitude, longitude, municipality, altitude FROM world WHERE (municipality like '%" + match + "%' OR name like '%"+ match +"%');";
        }
        else{
            QUERY = "SELECT world.name, world.latitude, world.longitude, world.id, world.altitude, world.municipality, world.type, world.iso_region, world.iso_country, world.home_link, region.wikipedia_link AS 'region_url', continent.wikipedia_link AS 'continent_url', country.wikipedia_link AS 'country_url' " +
                    "FROM world INNER JOIN continent ON world.continent = continent.id INNER JOIN region ON world.iso_region = region.id INNER JOIN country ON world.iso_country = country.id " +
                    "WHERE (world.name LIKE '%" + match + "%' OR world.municipality LIKE '%" + match + "%' OR continent.name LIKE '%" + match + "%' OR region.name LIKE '%" + match + "%' OR country.name LIKE '%"+ match + "%' OR world.id LIKE '%" + match + "%') " +
                    "ORDER BY world.name ASC;";
        }
    }

    public void connect2DB() {
        if(isTravis != null && isTravis.equals("true")){
            travisGetPlaces();
        }
        else {
            masterGetPlaces();
        }
    }

    public void travisGetPlaces() {
        try (
                Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
                Statement query = conn.createStatement();
                ResultSet results = query.executeQuery(QUERY);
        ) {
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
                places.add(p);
                count++;

                if(isRandom){
                    break;
                }
            }
        }
        catch(Exception e){
            System.err.println("Exception: " + e.getMessage());
        }
    }

    public void masterGetPlaces() {
        try (
                Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
                Statement query = conn.createStatement();
                ResultSet results = query.executeQuery(QUERY);
        ) {
            while (results.next()) {
                Place p = new Place(
                        results.getString("name"),
                        results.getString("latitude"),
                        results.getString("longitude"),
                        results.getString("id"),
                        results.getString("altitude"),
                        results.getString("municipality"),
                        results.getString("type"),
                        results.getString("iso_region"),
                        results.getString("iso_country"),
                        getURL(results.getString("home_link"), results.getString(11), results.getString(12), results.getString(13))
                );
                places.add(p);
                count++;

                if(isRandom){
                    break;
                }
            }
        }
        catch(Exception e){
            System.err.println("Exception: " + e.getMessage());
        }
    }

    public String getURL(String home_link, String region_wiki, String country_wiki, String continent_wiki){
        String result = "";
        if(home_link != null){
            result = home_link;
        }
        else if(region_wiki != null){
            result = region_wiki;
        }
        else if(country_wiki != null){
            result = country_wiki;
        }
        else if(continent_wiki != null){
            result = continent_wiki;
        }
        else{
            return result;
        }

        return result;
    }

    public void limitResult(){
        if(this.limit == null){
            getLimitIfZero();
        }

        if(limit > 0 && limit < places.size()){
            places = new ArrayList<Place>(places.subList(0,limit));
        }
    }

    public void getLimitIfZero(){
        this.limit = Math.min(places.size(), 100);
    }

    public int getCount(){
        return this.count;
    }

    public ArrayList<Place> getPlaces(){
        return this.places;
    }

    public String getRandomMatch(int n) {
        String alphaString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvxyz";
        StringBuilder sb = new StringBuilder(n);
        for (int i = 0; i < n; i++) {
            int index = (int)(alphaString.length() * Math.random());
            sb.append(alphaString.charAt(index));
        }
        return sb.toString();
    }
}