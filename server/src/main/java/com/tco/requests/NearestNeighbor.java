package com.tco.requests;

import com.google.common.primitives.UnsignedLong;

import java.util.Arrays;

public class NearestNeighbor {

    private int len;
    private boolean[] visited;
    private int[] Tour;
    private Long[][] distance;
    private Long time;

    NearestNeighbor(int len, Long[][] distance) {
        this.len = len;
        this.visited = new boolean[len];
        Arrays.fill(visited, Boolean.FALSE);
        this.Tour = new int[len];
        this.distance = distance;
    }

    public void copyTour(int[] tour){
        for(int i = 0; i< len; i++ ){
            Tour[i] = tour[i];
        }
    }


    public void nearestNeighbor(){
        Long roundTripDistance = 0L;
        for(int p =0; p < len; p++){                //for each starting city
            int current = p;
            int index = 0;
            int[] trip = new int[len];
            while(visited[current]==false){        // get the round trip tour
                visited[current] = true;           // this place has been visited
                trip[index] = current;             // this is the order of visiting a place
                int next = current;                          // next location
                Long min = Long.MAX_VALUE;
                for(int i =0; i < len ; i++){
                    if (i == current)
                        continue;
                    if((distance[current][i] < min) && (!visited[i])){
                        min = distance[current][i];
                        next = i;
                    }
                }
                current = next;
                index ++;
            }
            Long roundDistance = 0L;
            for(int i =0; i<len; i++){
                roundDistance += distance[trip[i]][trip[(i+1)%len]];
            }
            if(p == 0){
                roundTripDistance = roundDistance;
                copyTour(trip);
            }
            else if(roundDistance < roundTripDistance){
                roundTripDistance = roundDistance;
                copyTour(trip);
            }
            Arrays.fill(visited, Boolean.FALSE);
        }
    }

    public int[] getTrip(){ return Tour; }

}
