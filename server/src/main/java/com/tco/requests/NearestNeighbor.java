package com.tco.requests;

import java.util.Arrays;

public class NearestNeighbor {

    private int len;
    private boolean[] visited;
    private int[] trip;
    private Long[][] distance;
    private Long time;

    NearestNeighbor(int len, Long[][]distance){
        this.len = len;
        this.visited = new boolean[len];
        Arrays.fill(visited,Boolean.FALSE);
        this.trip = new int[len];
        this.distance = distance;
    }

    public void nearestNeighbor(){
        int next = 0;
        int index = 0;
        while(visited[next]==false){
            visited[next] = true;           // this place has been visited
            trip[index] = next;             // this is the order of visiting a place
            Long min =  distance[next][(next+1)%len];
            for(int i =0; i < len ; i++){
                if (i == next)
                    continue;
                if(distance[next][i] < min){
                    min = distance[next][i];
                    next = i;
                }
            }
            index ++;
        }
    }

    public int[] getTrip(){ return trip; }

}
