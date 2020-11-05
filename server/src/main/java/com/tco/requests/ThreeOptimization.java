package com.tco.requests;

import com.tco.misc.BadRequestException;
import com.tco.requests.RequestDistance;

import java.util.HashMap;
import java.util.ArrayList;
import java.lang.String;
import java.lang.Long;

public class ThreeOptimization {

    private ArrayList<HashMap> places = new ArrayList<HashMap>();
    private int num;
    private boolean[] visited;
    private Long[][] distances;
    private Long roundTripDistance = 0L;
    private int[] tour;
    private Double earthRadius;


    public ThreeOptimization(ArrayList places, Double earthRadius){
        this.places = places;
        this.num = places.size();
        this.visited =  new boolean[num];
        this.distances = new Long[num][num];
        this.tour = new int[num];
        this.earthRadius = earthRadius;
        System.out.println(places);
    }

    public void initializeTour(){
        for(int i=0; i< num; i++){
            tour[i] = i;
        }
    }

    public void calculateDistance() throws BadRequestException {
        for(int i=0; i< num; i++){
            for(int j=i; j< num; j++) {
                HashMap place1 = places.get(i);
                HashMap place2 = places.get(j);
                String lat1 = (String)place1.get("latitude");
                String lon1 = (String)place1.get("longitude");
                String lat2 = (String)place2.get("latitude");
                String lon2 = (String)place2.get("longitude");
                String name1 = (String)place1.get("name");
                String name2 = (String)place2.get("name");
                System.out.println(name1 + " " + name2);
                System.out.println("i: " +i + " j: " +j);
                RequestDistance rd =  new RequestDistance(earthRadius,lat1,lon1,lat2,lon2);
                rd.buildResponse();
                Long currentDistance = rd.getDistance();
                distances[i][j] = currentDistance;
                distances[j][i] = currentDistance;
            }
        }
    }

    public void reversePlaces(int index1, int index2){
        if (index1 > index2) {
            int temp = index1;
            index1 = index2;
            index2 = temp;
        }
        while(index1<index2) {
            int temp = tour[index1];
            tour[index1] = tour[index2];
            tour[index2] = temp;
            index1 ++;
            index2 --;
        }
    }


    public void threeOptimize(){
        boolean improvement = true;
        while (improvement) {
            improvement = false;
            for( int i = 0; i <= num -3; i++){
                for ( int j = i+1; j <= num-2; j++){
                    for ( int k=j+1; k <= num-1; k++){
                        Long best = distances[i][i+1] + distances[j][j+1] + distances[k][(k+1)%num];
                        int index1 = 0;                 // track the indexes
                        int index2 = 0;
                        int index3 = 0;
                        int index4 = 0;
                        int index5 = 0;
                        int index6 = 0;
                        //reverse(i+1, j)
                        Long delta1 = distances[i][j] + distances[i+1][j+1] + distances[k][(k+1)%num];
                        if (delta1 < best){
                            best = delta1;
                            index1 = i+1;
                            index2 = j;
                        }
                        // reverse(j+1, k)
                        Long delta2 = distances[i][i+1] +distances[j][k] + distances[j+1][(k+1)%num];
                        if (delta2 < best){
                            best = delta2;
                            index1 = j+1;
                            index2 = k;
                        }
                        // reverse(i+1, k)
                        Long delta3 = distances[i][k] + distances[j][j+1] + distances[i+1][(k+1)%num];
                        if (delta3 < best ){
                            best = delta3;
                            index1 = k;
                            index2 = i+1;
                        }
                        // reverse(i+1,j) and (k,j+1)
                        Long delta4 = distances[i][j] + distances[i+1][k] + distances[j+1][(k+1)%num];
                        if(delta4 < best){
                            best = delta4;
                            index1 = i+1;
                            index2 = j;
                            index3 = j+1;
                            index4 = k;
                        }
                        //first reverse(i+1, k) and then reverse (j+1, k)
                        Long delta5 = distances[i][k] + distances[j+1][i+1] + distances[j][(k+1)%num];
                        if(delta5 < best){
                            best = delta5;
                            index1 = i+1;
                            index2 = k;
                            index3 = j+1;
                            index4 = k;
                        }
                        //first reverse(i+1, k) and then reverse (i+1, j)
                        Long delta6 = distances[i][j+1] + distances[k][j] + distances[i+1][(k+1)%num];
                        if(delta6 < best) {
                            best = delta6;
                            index1 = i + 1;
                            index2 = k;
                            index3 = i+1;
                            index4 = j;
                        }
                        //first reverse(i+1, k) -> (i+1, j) -> (j+1, k)
                        Long delta7 = distances[i][j+1] + distances[k][i+1] + distances[j][(k+1)%num];
                        if(delta7 < best){
                            best = delta7;
                            index1 = i+1;
                            index2 = k;
                            index3 = i+1;
                            index4 = j;
                            index5 = j+1;
                            index6 = k;
                        }
                            reversePlaces(index1,index2);
                            if (index3 != 0){
                                reversePlaces(index3,index4);
                            }
                            if (index5!= 0){
                                reversePlaces(index5,index6);
                            }
                        }
                    }
                }
            }

        }


    public int[] getTour(){
        return tour;
    }

    public Long[][] getDistances(){
        for(int i =0; i < num; i++){
            for(int k = 0; k< num; k++){
                System.out.print(distances[i][k] + " ");
            }
            System.out.println();
        }
        return distances;
    }

    public Long getRoundTripDistance(){
        roundTripDistance = 0L;     //make sure it start form 0
        for(int i = 0; i< num; i++){
            System.out.print("this is the tour:"+ tour[i] + " ");
            System.out.println(distances[tour[i%num]][tour[(i+1)%num]]);
            roundTripDistance += distances[tour[i%num]][tour[(i+1)%num]];
        }
        return roundTripDistance;
    }




}
