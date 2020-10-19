package com.tco.requests;
import java.util.ArrayList;
import java.lang.String;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class RequestFind extends RequestHeader{
    private String match;
    private Integer limit = 0;
    private Integer found = 0;
    private ArrayList places = new ArrayList<Place>(); //list of places found
    private final transient Logger log = LoggerFactory.getLogger(RequestFind.class);

    public RequestFind(){
        this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
        this.requestType = "find";
    }

    public RequestFind(String match) {
        this();
        this.match = checkForNonAlphaNum(match);
        this.limit = 0;
    }

    public RequestFind(String match, Integer limit){
        this();
        this.match = checkForNonAlphaNum(match);
        this.limit = limit;
    }

    @Override
    public void buildResponse(){
        FindDatabase fdb = getFindDatabase(match, limit);
        fdb.environment();
        fdb.getQuery();
        fdb.connect2DB();
        fdb.limitResult();
        this.found = fdb.getCount();
        this.places = fdb.getPlaces();
    }

    public FindDatabase getFindDatabase(String match, Integer limit){
        FindDatabase fdb;
        if(match != null && limit != null){
            fdb = new FindDatabase(match, limit);
        }
        else if(match != null && limit == null){
            fdb = new FindDatabase(match);
        }
        else{
            fdb = new FindDatabase();
        }

        return fdb;
    }

    public Integer getLimit() {
        return limit;
    }

    public String getMatch() {
        return match;
    }

    public Integer getFound() {
        return found;
    }

    public ArrayList getPlaces() {
        return places;
    }

    public String checkForNonAlphaNum(String match) {
        String newMatch = "";
        for(int i = 0; i < match.length(); i++){
            if(!Character.isLetterOrDigit(match.charAt(i))){
                newMatch += "_";
            }
            else {
                newMatch += match.charAt(i);
            }
        }
        return newMatch;
    }


}