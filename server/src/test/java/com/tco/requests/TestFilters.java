package com.tco.requests;

import com.tco.misc.BadRequestException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestFilters {

    private Filters filters;

    @Test
    @DisplayName("Get Filter Type")
    public void defaultPlace() throws BadRequestException {
        filters = new Filters(new ArrayList<>(), new ArrayList<>());
        assertEquals(0, filters.getType().size());
    }


    @Test
    @DisplayName("Get Filter Where - Countries Only")
    public void mainPlace() throws BadRequestException {
        filters = new Filters(new ArrayList<>(), new ArrayList<>());
        assertEquals(0,filters.getWhere().size());
    }
}