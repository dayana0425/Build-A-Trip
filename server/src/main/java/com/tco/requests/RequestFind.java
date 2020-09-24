package com.tco.requests;

import com.tco.misc.BadRequestException;
import java.util.ArrayList;
import java.lang.String;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class RequestFind extends RequestHeader{

    private String match;            //an alphanumeric pattern used to find geographic locations
    private Integer limit;          //the maximun number of matching places that may be return
    private Integer found;          //the total number of matching places in the data sources
    private ArrayList places;       //list of places found
    private final transient Logger log = LoggerFactory.getLogger(RequestConfig.class);
    private FindDatabase fdb;


    public RequestFind(){       //default constructor
        this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
        this.requestType = "find";
    }


    public RequestFind(String match, int limit){
        this();
        this.match = match;
        this.limit = limit;     // this means the client doesn't give a limitation for how many do they want
        if(this.limit == 0) {
            this.limit = 100;
        }

    }

    @Override
    public void buildResponse() throws BadRequestException {
      this.found = fdb.getCount();
      this.places = fdb.getPlaces();
    }

    public Integer getLimit() {return limit;}

    public String getMatch() {return match;}

    public Integer getFound() {return found;}

    public ArrayList getPlaces() {return places;}
}