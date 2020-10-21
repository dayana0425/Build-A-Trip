package com.tco.requests;
import com.tco.misc.BadRequestException;

import java.util.HashMap;
import java.util.ArrayList;
import java.lang.String;

public class RequestTrip extends RequestHeader{
    private HashMap<String,String> options = new HashMap<String, String>();         //haven't initialized it
    private ArrayList<HashMap> places = new ArrayList<HashMap>();
    private int[] distance;

    public RequestTrip(){
        this.requestType = "trip";
        this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
    }

    public RequestTrip(HashMap options2, ArrayList places){
        this();
        options.putAll(options2);
        this.places = places;
        this.distance();
    }

    public void distance(){
        int len = places.size();
        distance = new int[len];
        System.out.println(len);
        Double earthRadius = Double.parseDouble(options.get("earthRadius"));
        System.out.println(earthRadius);
        for(int i = 0; i < len; i++){
            HashMap place1 = places.get(i%len);
            HashMap place2 = places.get((i+1)%len);
            String lat1 = (String)place1.get("latitude");
            String lon1 = (String)place1.get("longitude");
            String lat2 = (String)place2.get("latitude");
            String lon2 = (String)place2.get("longitude");
            RequestDistance rd =  new RequestDistance(earthRadius,lat1,lon1,lat2,lon2);
            rd.buildResponse();
            distance[i] = rd.getDistance().intValue();
        }
    }


    @Override
    public void buildResponse() {
        this.getOptions();
        this.distance();
    }

    public int[] getDistance(){
        return distance;
    }

    public HashMap<String,String> getOptions(){
        return options;
    }

    public ArrayList<HashMap> getPlaces() {
        return places;
    }
}
