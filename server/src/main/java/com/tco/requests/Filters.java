package com.tco.requests;
import com.tco.misc.BadRequestException;

import java.util.ArrayList;
import java.util.List;

public class Filters {
    private List<String> type;
    private List<String> where;

    public Filters(List<String> type, List<String> where){
        this.type = type;
        this.where = where;
    }

    public List<String> getType(){
        return type;
    }

    public List<String> getWhere(){
        return where;
    }

}
