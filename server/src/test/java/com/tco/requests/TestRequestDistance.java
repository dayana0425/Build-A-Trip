package com.tco.requests;

import com.tco.misc.BadRequestException;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import java.util.*;
import java.lang.*;

import static org.junit.jupiter.api.Assertions.*;

public class TestRequestDistance {

    private RequestDistance dist;

    @BeforeEach
    public void createConfigurationForTestCases(){
        dist = new RequestDistance(3959.0, null, null, null, null);
    }

    @Test
    @DisplayName("Request type is \"distance\"")
    public void testType() {
        String type = "distance";
        assertEquals("distance", type);
    }

    @Test
    @DisplayName("Version number is 4")
    public void testVersion() {
        int version = dist.getRequestVersion();
        assertEquals(4, version);
    }


    //Make sure that the initial lat and long are set to null
    @Test
    @DisplayName("Place1 lat/long default to null")
    public void testPlace1Lat(){
        Map<String,String> place1 = dist.getPlace1();
        assertNull(place1.get("latitude"));
        assertNull(place1.get("longitude"));
    }


    //Make sure that the initial lat and long are set to null
    @Test
    @DisplayName("Place2 lat/long default to null")
    public void testPlace2Lat(){
        Map<String,String> place2 = dist.getPlace2();
        assertNull(place2.get("latitude"));
        assertNull(place2.get("longitude"));
    }

    @Test
    @DisplayName("EarthRadius is")
    public void testEarthRad(){
        assertTrue(dist.getEarthRadius()-3959 < 1);
    }

    @Test
    @DisplayName("Distance Test")
    public void testColorado() throws BadRequestException {
        RequestDistance distance = new RequestDistance(3959.0, "41", "-109", "37", "-102");
        distance.buildResponse();
        assertEquals(466, distance.getDistance());
    }

}
