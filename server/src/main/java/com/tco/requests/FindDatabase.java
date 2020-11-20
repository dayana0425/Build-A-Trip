package com.tco.requests;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.lang.String;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class FindDatabase {
    private Integer limit;
    private int count = 0;
    private ArrayList<Place> places = new ArrayList<>();
    private String match;
    private String isTravis;
    private String DB_URL;
    private String DB_USER;
    private String DB_PASSWORD;
    private String QUERY;
    private Boolean isRandom = false;
    private Integer limitFound = 0;
    private Filters narrow;
    private final transient Logger log = LoggerFactory.getLogger(RequestConfig.class);

    public FindDatabase(String match, Integer limit) {
        this.match = match;
        this.limit = limit;

        if (match == null) {
            this.match = getRandomMatch(1);
            this.isRandom = true;
            if (limit == null || limit == 0)
                this.limitFound = 1;
            if (limit != null && limit > 0)
                this.limitFound = limit;
        } else if (match != null) {
            if (limit == null || limit == 0)
                this.limit = 100;
        }
    }

    public FindDatabase(String match, Integer limit, Filters narrow) {
        this(match, limit);
        this.narrow = narrow;
    }

    public void environment() {
        isTravis = System.getenv("TRAVIS");
        String useTunnel = System.getenv("CS314_USE_DATABASE_TUNNEL");
        if (checkForTravis()) {
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
        QUERY = "SELECT world.name, world.latitude, world.longitude, world.id, world.altitude, world.municipality, world.type, world.iso_region, world.iso_country, world.home_link, region.wikipedia_link AS 'region_url', continent.wikipedia_link AS 'continent_url', country.wikipedia_link AS 'country_url' " +
                "FROM world INNER JOIN continent ON world.continent = continent.id INNER JOIN region ON world.iso_region = region.id INNER JOIN country ON world.iso_country = country.id " +
                "WHERE (world.name LIKE '%" + match + "%' OR world.municipality LIKE '%" + match + "%' OR continent.name LIKE '%" + match + "%' OR region.name LIKE '%" + match + "%' OR country.name LIKE '%" + match + "%' OR world.id LIKE '%" + match + "%') ";

        if((narrow == null) || (narrow.getType() == null  && narrow.getWhere() == null)){
            queryWithNoFilters();
        }
        else{
            queryWithFilters();
        }
    }

    public void queryWithNoFilters(){
        if (checkForTravis()) {
            QUERY = "SELECT name, id, type, latitude, longitude, municipality, altitude FROM world WHERE (municipality like '%" + match + "%' OR name like '%" + match + "%');";
        } else {
            QUERY += "ORDER BY world.name ASC" + checkIsRandom();
        }
    }

    public void queryWithFilters(){
        List<String> type = (narrow.getType() != null) ? narrow.getType() : null;
        List<String> where = (narrow.getWhere() != null) ? narrow.getWhere() : null;
        String filterAdditions = "";

        if(type != null){
            filterAdditions += getFilterAdditionsForType(type);
        }

        if(where != null){
            filterAdditions += getFilterAdditionsForWhere(where);
        }

        QUERY += filterAdditions + " " + "ORDER BY world.name ASC" + checkIsRandom();
    }

    public void connect2DB() {
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
             Statement query = conn.createStatement();
             ResultSet results = query.executeQuery(QUERY)) {
            if (checkForTravis()) {
                travisGetPlaces(results);
            } else {
                masterGetPlaces(results);
            }
        } catch (Exception e) {
            log.debug("Exception: " + e.getMessage());
        }
    }

    public void masterGetPlaces(ResultSet results) throws SQLException {
        {
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
            }
            limitPlaces();
        }
    }

    /* Helper Methods Below */
    public boolean checkForTravis(){
        return isTravis != null && isTravis.equals("true");
    }

    public void limitPlaces() {
        if (limit != null) {
            if (limit > 0 && limit < places.size()) {
                places = new ArrayList<>(places.subList(0, limit));
            }
        }
    }

    public String getURL(String home_link, String region_wiki, String country_wiki, String continent_wiki) {
        String result = "";
        if (home_link != null) {
            result = home_link;
        } else if (region_wiki != null) {
            result = region_wiki;
        } else if (country_wiki != null) {
            result = country_wiki;
        } else if (continent_wiki != null) {
            result = continent_wiki;
        }
        return result;
    }

    public String getRandomMatch(int n) {
        String alphaString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvxyz";
        StringBuilder sb = new StringBuilder(n);
        for (int i = 0; i < n; i++) {
            int index = (int) (alphaString.length() * Math.random());
            sb.append(alphaString.charAt(index));
        }
        return sb.toString();
    }

    private String getFilterAdditionsForType(List<String> type){
        String filterAdditions = "";
        if(type.contains("airport")) { //if airport is specified then we include all airport sizes
            filterAdditions += " AND (world.type = 'small_airport' OR world.type = 'medium_airport' OR world.type = 'large_airport'";
        }
        for(int i = 0; i < type.size(); i++){
            if(!type.get(i).equals("airport")){
                if(i == 0){
                    filterAdditions += "AND ( world.type = '" + type.get(i) + "'" ;
                }
                else{
                    filterAdditions += " OR world.type = " + "'" + type.get(i) + "'";
                }
            }
        }
        return checkLengthForFilterAdditions(filterAdditions);
    }

    private String getFilterAdditionsForWhere(List<String> where){
        String filterAdditions = "";
        for(int i = 0; i < where.size(); i++){
            if(i == 0){
                filterAdditions += " AND (country.name LIKE '" + where.get(i) + "'" ;
            }
            else{
                filterAdditions += " OR country.name LIKE " + "'" + where.get(i) + "'";
            }
        }
        return checkLengthForFilterAdditions(filterAdditions);
    }

    private String checkLengthForFilterAdditions(String filterAdditions){
        if (filterAdditions.length() > 0) {
            filterAdditions += ") ";
        }
        return filterAdditions;
    }

    private String checkIsRandom(){
        return (this.isRandom) ? " LIMIT " + Integer.toString(this.limitFound) + ";" : ";";
    }

    public void travisGetPlaces(ResultSet results) throws SQLException {
        {
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
            }
            limitPlaces();
        }

    }

    /* Accessor Methods Below */
    public int getCount() {
        return this.count;
    }

    public ArrayList<Place> getPlaces() {
        return this.places;
    }

    public int getLimitFound() {
        return this.limitFound;
    }

    public String getMatch() {
        return this.match;
    }

}