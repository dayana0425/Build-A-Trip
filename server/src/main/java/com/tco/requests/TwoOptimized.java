package com.tco.requests;
import java.util.ArrayList;
import java.util.HashMap;

public class TwoOptimized {
    private int [] tour; // holds the ordered list of places to visit
    private boolean [] visited; // holds whether a city has been visited
    private long [][] distances; // the distance between cities
    private long roundTripDistance; // will hold the resulting optimized round trip distance
    private int size; // saves the size of the matrix
    private ArrayList<HashMap> places = new ArrayList<HashMap>(); // holds the places
    private final Double EARTH_RADIUS; // earth radius constant - will be used to manage unit changes in the findDistance
    private boolean improvement = false;


    TwoOptimized(int size, ArrayList<HashMap> places, Double earthRadius){
        /* INITIALIZING */
        this.size = size;
        this.visited = new boolean[size];
        this.places = places;
        this.EARTH_RADIUS = earthRadius;

        /* SETUP */
        //set tour size
        this.tour = new int[size+1];
        //populate tour
        this.populateTour();
        //set matrix size
        this.distances = new long[size][size];
        //populate matrix
        this.calculateDistances();
        //get initial roundTripDistance
        this.roundTripDistance = getCost(tour);
    }

    //Main method for two opt
    public void twoOptimized(){
        while(improvement){
            improvement = false; //reset improvement
            for(int i = 0; i <= tour.length-3; i++){
                for(int j = i+ 2; j <= tour.length-1; j++){

                }
            }

        }
    }

    //Helper Method: will get the cost of the new tour
    public long getCost(int [] currTour){
        long sum = 0;
        for(int i = 0; i < currTour.length-1; i++){
            sum += getDistFromMatrix(i, i+1);
        }
        return sum;
    }

    //Helper Method: populates tour with initial indexes that index to the corresponding place in the places arraylist in the trip class
    public void populateTour(){
        for(int i = 0; i < tour.length; i++){
            if(i == tour.length-1){
                tour[i] = 0;
            }
            else{
                tour[i] = i;
            }
        }
    }

    //Helper Method: swaps elements in the tour array
    public void swap(int i, int j){
        tour[i] = (tour[i] + tour[j]) - (tour[j] = tour[i]);
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

    //Helper Method: will return the distance from place i to place j (indexes) from the distances matrix
    public long getDistFromMatrix(int i, int j){
        return distances[i][j];
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
    public long getRoundTripDistance(){
        return roundTripDistance;
    }

}


