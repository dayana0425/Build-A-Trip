package com.tco.requests;

import java.lang.String;

import com.tco.misc.BadRequestException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestRequestFind {

    private RequestFind find;

    @BeforeEach
    public void createFindForTestCases() throws BadRequestException {
        find = new RequestFind("Dave",10);
        find.buildResponse();
    }

    @Test
    @DisplayName("Request type is \"find\"")
    public void testType() {
        String type = find.getRequestType();
        assertEquals("find", type);
    }

    @Test
    @DisplayName("Version number is 4")
    public void testVersion() {
        int version = find.getRequestVersion();
        assertEquals(4, version);
    }

    @Test
    @DisplayName("Match is 'Dave'")
    public void testCount(){
        assertEquals("Dave",find.getMatch());
    }

    @Test
    @DisplayName("Limit is 10")
    public void testLimit(){
        assertEquals(10,find.getLimit());
    }


//    @Test
//    @DisplayName("Found is 28")
//    public void testFound(){
//        assertEquals(28,find.getFound());
//    }

    @Test
    @DisplayName("Places list should be 10 because the limit is 10")
    public void testPlacesReturned(){
        assertEquals(10,find.getPlaces().size());
    }

}
