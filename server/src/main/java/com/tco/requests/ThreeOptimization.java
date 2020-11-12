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
        if(index1 > index2){
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

    public Long getCompareDistance(int index1, int index2, int index3, int index4, int index5, int index6){
        int p1 = tour[index1];
        int p2 = tour[index2];
        int p3 = tour[index3];
        int p4 = tour[index4];
        int p5 = tour[index5];
        int p6 = tour[index6 % num];
        Long result = distances[p1][p2] + distances[p3][p4] + distances[p5][p6];
        return result;
    }


    public void threeOptimize(){
        boolean improvement = true;
        while (improvement) {
            improvement = false;
            for( int i = 0; i < num -2; i++){
                for ( int j = i+1; j < num-1; j++){
                    for ( int k=j+1; k < num; k++){
                        Long [] compare = new Long [8];
                        compare[0] = getCompareDistance(i,i+1,j,j+1,k,k+1);
                        //reverse(i+1, j)
                        compare[1] = getCompareDistance(i,j,i+1,j+1,k,k+1);
                        // reverse(j+1, k)
                        compare[2] = getCompareDistance(i,i+1,j,k,j+1,k+1);
                        // reverse(i+1,j) and (k,j+1)
                        compare[3] = getCompareDistance(i,j,i+1,k,j+1,k+1);
                        // reverse(i+1, k)
                        compare[4] = getCompareDistance(i,k,j,j+1,i+1,k+1);
                        // reverse(i+1, k) -> (i+1, j)
                        compare[5] = getCompareDistance(i,j+1,k,j,i+1,k+1);
                        // reverse(i+1,k) -> (k,j+1)
                        compare[6] = getCompareDistance(i,k,j+1,i+1,j,k+1);
                        // reverse(i+1, k) -> (i+1, j) -> (j+1, k)
                        compare[7] = getCompareDistance(i,j+1,k,i+1,j,k+1);
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
