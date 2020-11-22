//package com.tco.requests;
//
//import com.tco.misc.BadRequestException;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.DisplayName;
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import java.util.HashMap;
//import java.util.ArrayList;
//import java.lang.String;
//
//public class TestRequestTrip {
//
//    private RequestTrip trip;
//    private HashMap<String,String> options = new HashMap<String, String>();
//    private ArrayList places = new ArrayList<HashMap>();
//
//    private void initialOptionsPlaces() {
//        options.put("title", "My Trip");
//        options.put("earthRadius", "3959.0");
//        options.put("response","1.0");
//        HashMap<String, String> place1 = new HashMap<String, String>();
//        place1.put("name", "Place1");
//        place1.put("latitude", "40.573");
//        place1.put("longitude", "-105.09");
//        places.add(place1);
//        HashMap<String, String> place2 = new HashMap<String, String>();
//        place2.put("name", "Place2");
//        place2.put("latitude", "39.7");
//        place2.put("longitude", "-105.5");
//        places.add(place2);
//        HashMap<String, String> place3 = new HashMap<String, String>();
//        place3.put("name", "Place3");
//        place3.put("latitude", "40.4");
//        place3.put("longitude", "-105.96");
//        places.add(place3);
//        HashMap<String, String> place4 = new HashMap<String, String>();
//        place4.put("name", "Place4");
//        place4.put("latitude", "40.24");
//        place4.put("longitude", "-104.73");
//        places.add(place4);
//        HashMap<String, String> place5 = new HashMap<String, String>();
//        place5.put("name", "Place5");
//        place5.put("latitude", "39.97");
//        place5.put("longitude", "-106.06");
//        places.add(place5);
//    }
//
//    @BeforeEach
//    public void createTripTest() throws BadRequestException {
//        this.initialOptionsPlaces();
//        trip = new RequestTrip(options,places);
//        trip.buildResponse();
//    }
//
//    @Test
//    @DisplayName("Request type is \"trip\"")
//    public void testType() {
//        String type = trip.getRequestType();
//        assertEquals("trip", type);
//    }
//
//    @Test
//    @DisplayName("Request version is  \"4\"")
//    public void testRequestVersion() {
//        int version = trip.getRequestVersion();
//        assertEquals(4, version);
//    }
//
//    @Test
//    @DisplayName("The first place is \"Boulder\"")
//    public void testPlacesName(){
//        ArrayList<HashMap> place = trip.getPlaces();
//        assertEquals("Place1", place.get(0).get("name"));
//    }
//
//    @Test
//    @DisplayName("The earthRadius is \"3959.0\"")
//    public void testEarthRadius(){
//        HashMap<String,String> option = trip.getOptions();
//        assertEquals("3959.0",option.get("earthRadius"));
//    }
//
//    @Test
//    @DisplayName("The first distance should be 44")
//    public void testDistance4FirstPlace(){
//        Long[] distance = trip.getDistance();
//        assertEquals(30,distance[0]);
//    }
//
//    @Test
//    @DisplayName("The second distance should be 54")
//    public void testDistance4SecondPlace(){
//        Long[] distance = trip.getDistance();
//        assertEquals(55,distance[1]);
//    }
//
//    @Test
//    @DisplayName("The third distance should be 66")
//    public void testDistance4ThirdPlace(){
//        Long[] distance = trip.getDistance();
//        assertEquals(35,distance[2]);
//    }
//
//}
