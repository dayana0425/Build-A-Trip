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


    TwoOptimized(int size, long[][] distances, int[] tour) throws BadRequestException {
        /* INITIALIZING */
        this.size = size;
        this.distances = distances;
        this.tour = tour;
    }

    public void optimization(){
        boolean improvement = true;
        while(improvement)
        improvement = false;
        for(int i =0; i< size-2; i++){
            for(int k = i+2; k<size; k++){
                long delta = distances[tour[i]][tour[i+1]] + distances[tour[k]][tour[(k+1)%size]] - distances[tour[i]][tour[k]]- distances[tour[i+1]][tour[(k+1)%size]];
                if(delta > 0){
                    //reverse(i,k);

                }
            }
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


