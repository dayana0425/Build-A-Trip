package com.tco.requests;
import com.tco.misc.BadRequestException;

import java.util.ArrayList;
import java.util.Arrays;
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


    TwoOptimized(int size, ArrayList<HashMap> places, Double earthRadius) throws BadRequestException {
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
    public void twoOptimizedAlgo(){
        int [] bestTour = this.tour;
        int [] newBestTour;
        Long best = getCost(bestTour);
        Long newBest;

        for( int i = 1; i < tour.length-2; i++) {
            for (int j = i+1; j < tour.length-2; j++) {
                newBestTour = reversePlaces(bestTour, i, j);
                newBest = getCost(newBestTour);

                if (newBest < best) {
                    bestTour = newBestTour;
                    best = newBest;
                }
            }
        }
        this.roundTripDistance = best;
        this.tour = bestTour;
    }

    //Helper Method: will get the cost of the new tour
    public long getCost(int [] currTour){
        long sum = 0;
        for(int i = 0; i < currTour.length-1; i++){
            sum += getDistFromMatrix(currTour[i], currTour[i+1]);
        }
        return sum;
    }

    //Helper Method: will return the distance from place i to place j (indexes) from the distances matrix
    public long getDistFromMatrix(int i, int j){
        return distances[i][j];
    }

    //Helper Method: reversesPlaces
    public int[] reversePlaces(int[] mockTour, int i, int j){
        mockTour[i] = (mockTour[i] + mockTour[j]) - (mockTour[j] = mockTour[i]);
        return mockTour;
    }

    //Helper Method: populates the distance matrix
    public void calculateDistances() throws BadRequestException {
        for(int i = 0; i < this.size-1; i++){
            for(int j = i+1; j < this.size; j++){
                    long dist = getDist(i, j);
                    distances[i][j] = dist;
                    distances[j][i] = dist;
            }
        }
    }

    //Helper Method: calculates the distance between two places
    public long getDist(int i, int j) throws BadRequestException {
        HashMap p1 = places.get(i);
        HashMap p2 = places.get(j);
        String lat1 = (String)p1.get("latitude");
        String lon1 = (String)p1.get("longitude");
        String lat2 = (String)p2.get("latitude");
        String lon2 = (String)p2.get("longitude");
        RequestDistance dist =  new RequestDistance(EARTH_RADIUS,lat1,lon1,lat2,lon2);
        dist.buildResponse();
        return dist.getDistance();
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

    //Accessor Method: returns the optimizedTour result
    public int[] getOptimizedTour(){
        return tour;
    }

    //Accessor Method: returns the optimized round trip result
    public long getRoundTripDistance(){
        return roundTripDistance;
    }

}


