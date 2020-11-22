package com.tco.requests;

import java.util.Arrays;

public class NearestNeighbor {

    private int len;
    private boolean[] visited;
    private int[] finalTour;
    private Long[][] distance;
    private Long currentDistance;        //calculate current distance based on this trip

    NearestNeighbor(int len, Long[][] distance) {
        this.len = len;
        this.visited = new boolean[len];
        this.finalTour = new int[len];
        this.distance = distance;
    }

    public int[] getNearestNeighbor(int startPlace) {
        this.currentDistance = 0L;      //initialize currentDistance
        int current = startPlace;
        int index = 0;
        int[] trip = new int[len+1];
        while (!visited[current]) {              // get the round trip tour
            visited[current] = true;             // this place has been visited
            trip[index] = current;               // this is the order of visiting a place
            int next = current;                  // next location
            Long min = Long.MAX_VALUE;
            for (int i = 0; i < len; i++) {      //iterating all the places to find a nearest and non-visited place
                if (i == current)
                    continue;
                if ((distance[current][i] < min) && (!visited[i])) {
                    min = distance[current][i];
                    next = i;
                }
            }
            currentDistance += min;
            current = next;
            index++;
        }
        return trip;
    }


    public void nearestNeighbor() {
        Long roundTripDistance = 0L;
        for (int place = 0; place < len; place++) {                //for each starting city
            int[] trip = getNearestNeighbor(place);
            if (place == 0) {
                roundTripDistance = currentDistance;
                System.arraycopy(trip,0,finalTour,0,len);
            } else if (currentDistance < roundTripDistance) {
                roundTripDistance = currentDistance;
                System.arraycopy(trip,0,finalTour,0,len);
            }
            Arrays.fill(visited, Boolean.FALSE);
        }
    }

    public int[] getTrip() {
        return finalTour;
    }

}
