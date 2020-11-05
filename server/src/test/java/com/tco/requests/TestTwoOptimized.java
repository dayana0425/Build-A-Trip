package com.tco.requests;

import java.util.HashMap;
import java.util.ArrayList;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

public class TestTwoOptimized {

    private TwoOptimized twoOpt;
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
        place4.put("longitude","-104.78");
        places.add(place4);
        HashMap<String, String> place5 = new HashMap<String, String>();
        place5.put("name","Place5");
        place5.put("latitude","39.97");
        place5.put("longitude","-106.6");
        places.add(place5);
    }

    @Test
    @DisplayName("Show the distance metrics")
    public void getDistance() {
        this.initialPlaces();
        twoOpt = new TwoOptimized(places.size(), places, earthRadius);
        Long oldD = twoOpt.getRoundTripDistance();
        Long newD = twoOpt.getRoundTripDistance();
        System.out.print("the distance is: "+ oldD + " " + newD);
    }
}