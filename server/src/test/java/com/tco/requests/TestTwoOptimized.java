//package com.tco.requests;
//
//import java.util.Arrays;
//import java.util.HashMap;
//import java.util.ArrayList;
//
//import com.tco.misc.BadRequestException;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.DisplayName;
//import static org.junit.jupiter.api.Assertions.assertEquals;
//
//public class TestTwoOptimized {
//
//    private TwoOptimized twoOpt;
//    private double earthRadius = 3959;
//    private ArrayList<HashMap> places = new ArrayList<HashMap>();
//
//    private void initialPlaces(){
//        HashMap<String, String> place1 = new HashMap<String, String>();
//        place1.put("name","Place1");
//        place1.put("latitude","40.573");
//        place1.put("longitude","-105.09");
//        places.add(place1);
//        HashMap<String, String> place2 = new HashMap<String, String>();
//        place2.put("name","Place2");
//        place2.put("latitude","39.7");
//        place2.put("longitude","-105.5");
//        places.add(place2);
//        HashMap<String, String> place3 = new HashMap<String, String>();
//        place3.put("name","Place3");
//        place3.put("latitude","40.4");
//        place3.put("longitude","-105.96");
//        places.add(place3);
//        HashMap<String, String> place4 = new HashMap<String, String>();
//        place4.put("name","Place4");
//        place4.put("latitude","40.24");
//        place4.put("longitude","-104.73");
//        places.add(place4);
//        HashMap<String, String> place5 = new HashMap<String, String>();
//        place5.put("name","Place5");
//        place5.put("latitude","39.97");
//        place5.put("longitude","-106.06");
//        places.add(place5);
//    }
//
//    @Test
//    @DisplayName("Test Get Distance")
//    public void testGetDistance() throws BadRequestException {
//        this.initialPlaces();
//        twoOpt = new TwoOptimized(places.size(), places, earthRadius);
//        long dist = twoOpt.getDist(1,2);
//        assertEquals(dist, 54);
//    }
//
//    @Test
//    @DisplayName("Test Getting The Distance From Matrix")
//    public void testCalculateMatrix() throws BadRequestException {
//        this.initialPlaces();
//        twoOpt = new TwoOptimized(places.size(), places, earthRadius);
//        long [][] before = twoOpt.getDistanceMatrix();
//        twoOpt.calculateDistances();
//        long[][] after = twoOpt.getDistanceMatrix();
//        assertEquals(Arrays.toString(after), Arrays.toString(before));
//    }
//
//    @Test
//    @DisplayName("Test Getting The Distance From Matrix")
//    public void testReversePlaces() throws BadRequestException {
//        this.initialPlaces();
//        twoOpt = new TwoOptimized(places.size(), places, earthRadius);
//        int [] before = twoOpt.getTour();
//        int [] after = twoOpt.reversePlaces(before, 1,2);
//        int [] arrayContents = {0,2,1,3,4,0};
//        assertEquals(Arrays.toString(after), Arrays.toString(arrayContents));
//    }
//
//    @Test
//    @DisplayName("Test Getting The Distance From Matrix")
//    public void testGetDistanceFromDistanceMatrix() throws BadRequestException {
//        this.initialPlaces();
//        twoOpt = new TwoOptimized(places.size(), places, earthRadius);
//        Long dist = twoOpt.getDistFromMatrix(1,1);
//        assertEquals(dist,0);
//    }
//
//    @Test
//    @DisplayName("Test cost")
//    public void testGetCost() throws BadRequestException {
//        this.initialPlaces();
//        twoOpt = new TwoOptimized(places.size(), places, earthRadius);
//        Long cost = twoOpt.getCost(twoOpt.getTour());
//        assertEquals(cost, 323);
//    }
//
//    @Test
//    @DisplayName("Test for distance")
//    public void getDistance() throws BadRequestException {
//        this.initialPlaces();
//        twoOpt = new TwoOptimized(places.size(), places, earthRadius);
//        Long oldD = twoOpt.getRoundTripDistance();
//        twoOpt.twoOptimizedAlgo();
//        Long newD = twoOpt.getRoundTripDistance();
//        assertEquals(newD, 235);
//    }
//}