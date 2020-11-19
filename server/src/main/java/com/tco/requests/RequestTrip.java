package com.tco.requests;

import com.tco.misc.BadRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.ArrayList;
import java.lang.System;
import java.lang.Long;

public class RequestTrip extends RequestHeader{
    private HashMap<String,String> options = new HashMap<String, String>();
    private ArrayList<HashMap> places = new ArrayList<HashMap>();
    private Long[] distances;
    private final transient Logger log = LoggerFactory.getLogger(RequestTrip.class);


    public RequestTrip(){
        this.requestType = "trip";
        this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;

    }

    public RequestTrip(HashMap options1, ArrayList places) throws BadRequestException {
        this();
        options.putAll(options1);
        this.places = places;
    }

    public Long[][] calculateDistance() throws BadRequestException {    //get the distance matrix
        Long[][] distanceMatrix;
        Double earthRadius = Double.parseDouble(options.get("earthRadius"));
        int num = this.places.size();
        distanceMatrix = new Long[num][num];
        for(int i=0; i< num; i++){
            for(int j=i; j< num; j++) {
                HashMap place1 = places.get(i);
                HashMap place2 = places.get(j);
                String lat1 = (String)place1.get("latitude");
                String lon1 = (String)place1.get("longitude");
                String lat2 = (String)place2.get("latitude");
                String lon2 = (String)place2.get("longitude");
                RequestDistance rd =  new RequestDistance(earthRadius,lat1,lon1,lat2,lon2);
                rd.buildResponse();
                Long currentDistance = rd.getDistance();
                distanceMatrix[i][j] = currentDistance;
                distanceMatrix[j][i] = currentDistance;
            }
        }
        return distanceMatrix;
    }

    public int[] initiaTrip(int num){
        int[] trip = new int[num];
        for(int i=0; i< num; i++){
            trip[i] = i;
        }
        return trip;
    }


    public void optimization() throws BadRequestException{
        Long[][] distanceMatrix = calculateDistance();
        int num = this.places.size();
        distances = new Long[num];
        int[]trip;
        String requirement = options.get("response");
        double requirement_convert = 0;
        if(requirement != null){
            requirement_convert = Double.parseDouble(requirement);
        }
        if(requirement_convert == 0|| num <4  || num > 380  ){
            trip = initiaTrip(num);
        }
        else{
            NearestNeighbor nn = new NearestNeighbor(num,distanceMatrix);
            nn.nearestNeighbor();
            trip = nn.getTrip();
            getOptimizedArray(trip);
//            if(num <= 50){
//                TwoOptimized two = new TwoOptimized(num,distanceMatrix,trip);
//                two.optimization();
//                two.getTour();
//                ThreeOptimization three = new ThreeOptimization(distanceMatrix,num,trip);
//                three.threeOptimize();
//                trip = three.getTrip();
    //        }
        }
        for(int i=0; i< num; i++) {
            distances[i] = distanceMatrix[trip[i]][trip[(i + 1) % num]];
        }
    }


    public void getOptimizedArray(int[] trip){
        ArrayList optimizedPlaces = new ArrayList<HashMap>();
        for(int i=0; i<this.places.size(); i++){
            HashMap singlePlace = this.places.get(trip[i]);
            optimizedPlaces.add(singlePlace);
        }
        HashMap first = this.places.get(trip[0]);
        this.places = optimizedPlaces;

    }


    @Override
    public void buildResponse()throws BadRequestException {
        this.getOptions();
        this.optimization();
    }

    public Long[] getDistance(){
        return distances;
    }

    public HashMap<String,String> getOptions(){
        return options;
    }

    public ArrayList<HashMap> getPlaces() { return places; }

}
