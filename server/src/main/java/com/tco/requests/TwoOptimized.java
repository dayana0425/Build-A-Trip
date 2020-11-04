package com.tco.requests;

import com.tco.misc.BadRequestException;

import java.util.ArrayList;
import java.util.HashMap;

public class TwoOptimized {
    private int [] tour; // holds the ordered list of places to visit
    private boolean [] visited; // holds whether a city has been visited
    private long [][] distances; // the distance between cities
    private long roundTripDistance; // will hold the resulting optimized round trip distance
    private int size; // saves the size of the matrix
    private ArrayList<HashMap> places = new ArrayList<HashMap>(); // holds the places
    private final double EARTH_RADIUS; // earth radius constant - will be used to manage unit changes in the findDistance
    private boolean improvement = false;


    TwoOptimized(int size, ArrayList<HashMap> places, Double earthRadius){
        this.size = size;
        this.tour = new int[size];
        this.visited = new boolean[size];
        this.distances = new long[size][size];
        this.roundTripDistance = 0;
        this.places = places;
        this.EARTH_RADIUS = earthRadius;
    }

    //Main method for two opt
//    public void twoOptimized(){
//        populateTour(); //populate tour
//        calculateDistances(); //populate distance matrix
//
//        this.improvement = true;
//        while (improvement) {
//            this.improvement = false; // reset
//            for (int i = 0; i <= n-3; i++) {
//                for (k = i + 2; k <= n-1; k++) {
//                    delta = -dis(route,i,i+1)-dis(route,k,k+1)+dis(route,i,k)+dis(route,i+1,k+1)
//                    if (delta < 0) { //improvement?
//                        2optReverse(route, i+1, k)
//                        improvement = true
//                    }
//                }
//            }
//        }
//    }

    //Helper Method: populates tour with initial indexes that index to the corresponding place in the places arraylist in the trip class
    public void populateTour(){
        for(int i = 0; i < tour.length; i++){
            tour[i] = i;
        }
    }

    //Helper Method: populates the distance matrix
    public void calculateDistances(){
        for(int i = 0; i < this.size-1; i++){
            for(int j = i+1; j < this.size; j++){
                    long dist = getDist(i, j);
                    distances[i][j] = dist;
                    distances[j][i] = dist;
            }
        }
    }

    //Helper Method: calculates the distance between two places
    public long getDist(int i, int j) {
        HashMap p1 = places.get(i);
        HashMap p2 = places.get(j);
        String lat1 = (String)p1.get("latitude");
        String lon1 = (String)p1.get("longitude");
        String lat2 = (String)p2.get("latitude");
        String lon2 = (String)p2.get("longitude");
        RequestDistance dist =  new RequestDistance(EARTH_RADIUS,lat1,lon1,lat2,lon2);
        return dist.getDistance();
    }

    //Accessor Method: returns the optimizedTour result
    public int[] getOptimizedTour(){
        return tour;
    }

    //Accessor Method: returns the optimized round trip result
    public long getOptimizedRoundTrip(){
        return roundTripDistance;
    }

//    2optReverse(route, i1, k) { // reverse in place
//        while(i1 < k) {
//            temp = route[i1]
//            route[i1] = route[k]
//            route[k] = temp
//            i1++; k--
//        }
//    }

}


