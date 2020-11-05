package com.tco.requests;
import com.tco.misc.BadRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.ArrayList;
import java.lang.String;

public class RequestTrip extends RequestHeader{
    private HashMap<String,String> options = new HashMap<String, String>();
    private ArrayList<HashMap> places = new ArrayList<HashMap>();
    private Long[] distances;
    private final transient Logger log = LoggerFactory.getLogger(RequestTrip.class);

    public RequestTrip(){
        this.requestType = "trip";
        this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
    }

    public RequestTrip(HashMap options2, ArrayList places) throws BadRequestException {
        this();
        System.out.println("hello");
        options.putAll(options2);
        this.places = places;
        this.distance();
    }

    public void distance() throws BadRequestException {
        int len = places.size();
        distances = new Long[len];
        Double earthRadius = Double.parseDouble(options.get("earthRadius"));
        for(int i = 0; i < len; i++){
            HashMap place1 = places.get(i%len);
            HashMap place2 = places.get((i+1)%len);
            String lat1 = (String)place1.get("latitude");
            String lon1 = (String)place1.get("longitude");
            String lat2 = (String)place2.get("latitude");
            String lon2 = (String)place2.get("longitude");
            RequestDistance rd =  new RequestDistance(earthRadius,lat1,lon1,lat2,lon2);
            rd.buildResponse();
            distances[i] = rd.getDistance();
        }
    }


    @Override
    public void buildResponse() throws BadRequestException {
        this.getOptions();
        this.distance();
    }

    public Long[] getDistance(){
        return distances;
    }

    public HashMap<String,String> getOptions(){
        return options;
    }

    public ArrayList<HashMap> getPlaces() { return places; }
}
