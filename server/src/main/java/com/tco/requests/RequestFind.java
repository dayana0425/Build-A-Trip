package com.tco.requests;
import java.util.ArrayList;
import java.lang.String;

import com.tco.misc.BadRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RequestFind extends RequestHeader{
    private String match = null;
    private Integer limit = null;
    private Integer found = 0;
    private ArrayList places = new ArrayList<Place>(); //list of places found
    private Filters narrow = new Filters(null, null);
    private final transient Logger log = LoggerFactory.getLogger(RequestFind.class);

    public RequestFind() throws BadRequestException {
        this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
        this.requestType = "find";
    }

    public RequestFind(String match, Integer limit) throws BadRequestException {
        this();
        this.limit = limit;
        this.match = match;
    }

    @Override
    public void buildResponse() throws BadRequestException {
        this.getRequestVersion();
        FindDatabase fdb = new FindDatabase(match, limit, narrow);
        fdb.environment();
        fdb.getQuery();
        fdb.connect2DB();
        this.found = fdb.getCount();
        this.places = fdb.getPlaces();
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


}