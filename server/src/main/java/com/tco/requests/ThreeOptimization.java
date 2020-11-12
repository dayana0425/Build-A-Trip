package com.tco.requests;

import com.tco.misc.BadRequestException;
import com.tco.requests.RequestDistance;

import java.util.HashMap;
import java.util.ArrayList;
import java.lang.String;
import java.lang.Long;

public class ThreeOptimization {
    private int num;
    private Long[][] distances;
    private int[] tour;


    public ThreeOptimization(Long[][]distances, int num, int[]tour){
        this.num = num;
        this.tour = tour;
        this.distances = distances;
    }


    public void reverse(int index1, int index2){
        while(index1<index2) {
            int temp = tour[index1];
            tour[index1] = tour[index2];
            tour[index2] = temp;
            index1 ++;
            index2 --;
        }
    }

    public void reversePlaces(int index, int i, int j, int k){
        if((index & 4) > 0){
            reverse(i+1,k);
        }
        if((index & 2) > 0){
            reverse(j+1,k);
        }
        if((index & 1) >0){
            reverse(i+1,j);
        }
        reverse(i,j);
    }


    public void threeOptimize(){
        boolean improvement = true;
        while (improvement) {
            improvement = false;
            for( int i = 0; i < num -2; i++){
                for ( int j = i+1; j < num-1; j++){
                    for ( int k=j+1; k < num; k++){
                        Long [] compare = new Long [8];
                        compare[0]= distances[tour[i]][tour[i+1]] + distances[tour[j]][tour[j+1]] + distances[tour[k]][tour[(k+1)%num]];
                        //reverse(i+1, j)
                        compare[1] = distances[tour[i]][tour[j]] + distances[tour[i+1]][tour[j+1]] + distances[tour[k]][tour[(k+1)%num]];
                        // reverse(j+1, k)
                        compare[2] = distances[tour[i]][tour[i+1]] +distances[tour[j]][tour[k]] + distances[tour[j+1]][tour[(k+1)%num]];
                        // reverse(i+1, k)
                        compare[4] = distances[tour[i]][tour[k]] + distances[tour[j]][tour[j+1]] + distances[tour[i+1]][tour[(k+1)%num]];
                        // reverse(i+1,j) and (k,j+1)
                        compare[3] = distances[tour[i]][tour[j]] + distances[tour[i+1]][tour[k]] + distances[tour[j+1]][tour[(k+1)%num]];
                        //first reverse(i+1, k) and then reverse (j+1, k)
                        compare[6] = distances[tour[i]][tour[k]] + distances[tour[j+1]][tour[i+1]] + distances[tour[j]][tour[(k+1)%num]];
                        //first reverse(i+1, k) and then reverse (i+1, j)
                        compare[5] = distances[tour[i]][tour[j+1]] + distances[tour[k]][tour[j]] + distances[tour[i+1]][tour[(k+1)%num]];
                        //first reverse(i+1, k) -> (i+1, j) -> (j+1, k)
                        compare[7] = distances[tour[i]][tour[j+1]] + distances[tour[k]][tour[i+1]] + distances[tour[j]][tour[(k+1)%num]];
                        Long best = compare[0];
                        int index = 0;
                        for(int it =0 ; it<8; it++){
                            if(compare[it] <  best){
                                best = compare[it];
                                index = it;
                            }
                        }
                        if(index != 0){
                            reversePlaces(index, i, j, k);
                            improvement = true;
                       }
                        }
                    }
                }
            }
        }

    public int[] getTrip(){
        return tour;
    }

}
