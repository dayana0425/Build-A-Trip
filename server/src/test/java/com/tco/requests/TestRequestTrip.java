package com.tco.requests;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import static org.junit.jupiter.api.Assertions.assertEquals;
import java.util.HashMap;
import java.util.ArrayList;
import java.lang.String;

public class TestRequestTrip {

    private RequestTrip trip;
    private HashMap<String,String> options = new HashMap<String, String>();
    private ArrayList places = new ArrayList<HashMap>();

    private void initiaOptionsPlaces(){
        options.put("title","My Trip");
        options.put("earthRadius","3959.0");
        HashMap<String, String> place1 = new HashMap<String, String>();
        place1.put("name","Denver");
        place1.put("latitude","39.7");
        place1.put("longitude","-105.0");
        places.add(place1);
        HashMap<String, String> place2 = new HashMap<String, String>();
        place2.put("name","Boulder");
        place2.put("latitude","40.0");
        place2.put("longitude","-105.4");
        places.add(place2);
        HashMap<String, String> place3 = new HashMap<String, String>();
        place3.put("name","Fort Collins");
        place3.put("longitude","-105.1");
        place3.put("latitude","40.6");
        places.add(place3);
    }

    @BeforeEach
    public void createTripTest(){
        this.initiaOptionsPlaces();
        System.out.println(options);
        trip = new RequestTrip(options,places);
        trip.buildResponse();
    }

    @Test
    @DisplayName("Request type is \"trip\"")
    public void testType() {
        String type = trip.getRequestType();
        assertEquals("trip", type);
    }

    @Test
    @DisplayName("Request version is  \"3\"")
    public void testRequestVersion() {
        int version = trip.getRequestVersion();
        assertEquals(3, version);
    }

    @Test
    @DisplayName("The first place is \"Denver\"")
    public void testPlacesName(){
        ArrayList<HashMap> place = trip.getPlaces();
        assertEquals("Denver", place.get(0).get("name"));
    }

    @Test
    @DisplayName("The earthRadius is \"3959.0\"")
    public void testEarthRadius(){
        HashMap<String,String> option = trip.getOptions();
        assertEquals("3959.0",option.get("earthRadius"));
    }

    @Test
    @DisplayName("The first distance should be 30")
    public void testDistance4FirstPlace(){
        Long[] distance = trip.getDistance();
        assertEquals(30,distance[0]);
    }

    @Test
    @DisplayName("The first distance should be 4")
    public void testDistance4SecondPlace(){
        Long[] distance = trip.getDistance();
        assertEquals(44,distance[1]);
    }

    @Test
    @DisplayName("The first distance should be 62")
    public void testDistance4ThirdPlace(){
        Long[] distance = trip.getDistance();
        assertEquals(62,distance[2]);
    }


}
