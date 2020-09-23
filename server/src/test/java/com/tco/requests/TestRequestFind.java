package com.tco.requests;

import com.tco.requests.RequestConfig;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestRequestFind{

    private RequestFind find;

    @BeforeEach
    public void creatFindForTestCases(){
        find = new RequestFind();

    }

    public void createConfigurationForTestCases(){
        conf = new RequestConfig();
        conf.buildResponse();
    }


}