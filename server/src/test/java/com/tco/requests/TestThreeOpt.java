package com.tco.requests;

import java.util.HashMap;
import java.util.ArrayList;

import com.tco.misc.BadRequestException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestThreeOpt {

    private ThreeOptimization threeOpt;
    private double earthRadius = 3959;
    private ArrayList<HashMap> places = new ArrayList<HashMap>();

    private void initialPlaces(){
        HashMap<String, String> place1 = new HashMap<String, String>();
        place1.put("name","Place1");
        place1.put("latitude","40.573");
        place1.put("longitude","-105.09");
        places.add(place1);
        HashMap<String, String> place2 = new HashMap<String, String>();
        place2.put("name","Place2");
        place2.put("latitude","39.7");
        place2.put("longitude","-105.5");
        places.add(place2);
        HashMap<String, String> place3 = new HashMap<String, String>();
        place3.put("name","Place3");
        place3.put("latitude","40.4");
        place3.put("longitude","-105.96");
        places.add(place3);
        HashMap<String, String> place4 = new HashMap<String, String>();
        place4.put("name","Place4");
        place4.put("latitude","40.24");
        place4.put("longitude","-104.73");
        places.add(place4);
        HashMap<String, String> place5 = new HashMap<String, String>();
        place5.put("name","Place5");
        place5.put("latitude","39.97");
        place5.put("longitude","-106.06");
        places.add(place5);
    }

    @BeforeEach
    public void initialize()throws BadRequestException{
        this.initialPlaces();
        threeOpt = new ThreeOptimization(places,earthRadius);
        threeOpt.initializeTour();
        threeOpt.calculateDistance();
    }

    @Test
    @DisplayName("Show the original distance")
    public void testDistance(){
        Long originalDistance = threeOpt.getRoundTripDistance();
        Long expectedDistance = 323L;
        assertEquals(expectedDistance,originalDistance);
    }

    @Test
    @DisplayName("Show the original tour")
    public void testTour(){
        int[] expectedTour = {0,1,2,3,4};
        int[] actualTour = threeOpt.getTour();
        for(int i=0; i< expectedTour.length; i++)
            assertEquals(expectedTour[i],actualTour[i]);
    }

    @Test
    @DisplayName("Do the optimization and get the roundTrip")
    public void testRoundTripDistance(){
        threeOpt.threeOptimize();
        Long actialDistance = threeOpt.getRoundTripDistance();
        Long expectDistance = 197L;
        assertEquals(expectDistance,actialDistance);
    }

    @Test
    @DisplayName("Get the final tour order")
    public void testTourOrder(){
        threeOpt.threeOptimize();
        int[] expectedTour = {0,3,1,4,2};
        int[] actualTour = threeOpt.getTour();
        for(int i=0; i< expectedTour.length; i++)
            assertEquals(expectedTour[i],actualTour[i]);
    }
}
