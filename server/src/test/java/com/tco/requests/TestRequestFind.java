package com.tco.requests;

import com.tco.requests.RequestFind;

import java.lang.String;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestRequestFind {

    private RequestFind find;

    @BeforeEach
    public void creatFindForTestCases(){
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
    @DisplayName("Version number is 2")
    public void testVersion() {
        int version = find.getRequestVersion();
        assertEquals(2, version);
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
//    @DisplayName("Found is 10")
//    public void testFound(){
//        assertEquals(10,find.getFound());
//    }

}
