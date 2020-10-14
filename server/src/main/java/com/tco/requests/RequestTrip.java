package com.tco.requests;
import java.util.HashMap;
import java.util.ArrayList;
import java.lang.String;

public class RequestTrip extends RequestHeader{
    private HashMap<String,String> options = new HashMap<String, String>;         //haven't initialized it
    private ArrayList places = new ArrayList<Place>;
    private int[] distance;

    public RequestTri(){
        this.requestType = "trip";
        this.requestVersion = 3;
    }

    public RequestTrip(HashMap options, ArrayList places){
        this.options = options;
        this.places = places;
        this.requestType = "trip";
        this.requestVersion = 3;
    }

}
