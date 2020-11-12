package com.tco.requests;
import com.tco.misc.BadRequestException;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

public class TwoOptimized {
    private int [] tour; // holds the ordered list of places to visit
    private long [][] distances; // the distance between cities
    private long roundTripDistance; // will hold the resulting optimized round trip distance
    private int size; // saves the size of the matrix
    private boolean improvement = false;


    TwoOptimized(int size, long[][] distances) throws BadRequestException {
        /* INITIALIZING */
        this.size = size;
        this.distances = distances;
        this.tour = new int[size];
        this.populateTour();
    }

    public void populateTour(){
        for(int i=0; i<size; i++){
            tour[i] = i;
        }
    }




    //Accessor Method: returns the optimizedTour result
    public int[] getTour(){
        return tour;
    }

    //Accessor Method: returns the optimized round trip result
    public long getRoundTripDistance(){
        return roundTripDistance;
    }

    //Accessor Method: returns the distance matrix
    public long[][] getDistanceMatrix(){ return distances; }
}


