package com.tco.requests;

import com.tco.misc.BadRequestException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestFilters {

    private Filters filters;

    @Test
    @DisplayName("Get Filter Type")
    public void defaultPlace() throws BadRequestException {
        filters = new Filters();
        assertEquals(3, filters.getType().size());
    }


    @Test
    @DisplayName("Get Filter Where - Countries Only")
    public void mainPlace() throws BadRequestException {
        filters = new Filters();
        assertEquals(246,filters.getWhere().size());
    }
}