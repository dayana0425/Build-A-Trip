package com.tco.requests;
import com.tco.misc.BadRequestException;

import java.util.ArrayList;
import java.util.List;

public class Filters {
    private List<String> type;
    private List<String> where;

    public Filters() throws BadRequestException {
        this.type = new ArrayList(3);
        type.add("airport");
        type.add("heliport");
        type.add("balloonport");
        this.where = new ArrayList<>();

        FiltersDBRequests db = new FiltersDBRequests("country");
        db.environment();
        db.getQuery();
        db.connect2DB();
        this.where = db.getCountries();
    }
}
