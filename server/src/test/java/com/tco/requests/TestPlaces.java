package com.tco.requests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestPlaces {

    private Place place;

    @Test
    @DisplayName("Default constructor for Place")
    public void defaultPlace(){
        place = new Place();
        assertEquals("",place.getName());
    }


    @Test
    @DisplayName("Constructor for main place")
    public void mainPlace(){
        place = new Place("xinyi","36.8234318","118.05015565","1","100","Shandong","small city","Asian","China","zibo.com");
        assertEquals("xinyi",place.getName());
    }
}
