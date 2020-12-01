package com.tco.requests;
import java.util.List;
import java.util.ArrayList;
import java.lang.String;
import com.tco.misc.BadRequestException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;


import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestFindDatabase {

    private FindDatabase fd;

    @Test
    @DisplayName("If match = \"null\", limit = \"0\"")
    public void noMatchLimit() throws BadRequestException {
        fd = new FindDatabase(null,0);
        assertEquals(1,fd.getLimitFound());
    }

    @Test
    @DisplayName("If no match")
    public void noMatch() throws BadRequestException {
        fd = new FindDatabase(null,3);
        assertEquals(1,fd.getMatch().length());
    }

    @Test
    @DisplayName("Test URL for home_link")
    public void testURL_HOME(){
        fd = new FindDatabase(null,null);
        String URL = fd.getURL("home",null,null,null);
        assertEquals("home",URL);
    }

    @Test
    @DisplayName("Test URL for region_link")
    public void testURL_REGION(){
        fd = new FindDatabase(null,null);
        String URL = fd.getURL(null,"region",null,null);
        assertEquals("region",URL);
    }

    @Test
    @DisplayName("Test URL for country_link")
    public void testURL_COUNTRY() throws BadRequestException {
        fd = new FindDatabase(null,null);
        String URL = fd.getURL(null,null,"country",null);
        assertEquals("country",URL);
    }

    @Test
    @DisplayName("Test URL for continent_link")
    public void testURL_CONTINENT() throws BadRequestException {
        fd = new FindDatabase(null,null);
        String URL = fd.getURL(null,null,null,"continent");
        assertEquals("continent",URL);
    }


    @Test
    @DisplayName("Test constructor with filters")
    public void testFindDatabase(){
        List<String> type = new ArrayList<String>();
        List<String> where = new ArrayList<String>();
        type.add("airport");
        where.add("the United States");
        Filters filter = new Filters(type, where);
        fd = new FindDatabase("Dave's", 3, filter);
    }

    @Test
    @DisplayName("Test getQuery methods with filters and queryWithFilters")
    public void testGetQuery(){
        List<String> type = new ArrayList<String>();
        List<String> where = new ArrayList<String>();
        type.add("airport");
        type.add("balloonport");
        where.add("the United States");
        where.add("China");
        Filters filter = new Filters(type,where);
        fd = new FindDatabase("Dave's", 3, filter);
        fd.getQuery();
    }


}
