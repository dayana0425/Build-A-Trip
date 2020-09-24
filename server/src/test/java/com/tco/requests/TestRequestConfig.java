package com.tco.requests;

import com.tco.requests.RequestConfig;

import java.lang.String;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;


import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestRequestConfig {

  private RequestConfig conf;

  @BeforeEach
  public void createConfigurationForTestCases(){
    conf = new RequestConfig();
    conf.buildResponse();
  }

  @Test
  @DisplayName("Request type is \"config\"")
  public void testType() {
    String type = conf.getRequestType();
    assertEquals("config", type);
  }

  @Test
  @DisplayName("Version number is 2")
  public void testVersion() {
    int version = conf.getRequestVersion();
    assertEquals(2, version);
  }

  @Test
  @DisplayName("Team name is T16 Team Hexadecimal")
  public void testServerName() {
    String name = conf.getServerName();
    assertEquals("T16 Team Hexadecimal", name);
  }

  @Test
  @DisplayName("Supported Requests length")
  public void testSupportedRequestsLength() {
    List<String> supportedRequests = conf.getSupportedRequests();
    assertEquals(3, supportedRequests.size());
  }

  @Test
  @DisplayName("Supported Requests config")
  public void testSupportedRequestConfig() {
    List<String> supportedRequests = conf.getSupportedRequests();
    assertEquals("config", (supportedRequests.get(0)));
  }

  @Test
  @DisplayName("Supported Requests Distance")
  public void testSupportedRequestDistance() {
    List<String> supportedRequests = conf.getSupportedRequests();
    assertEquals("distance", (supportedRequests.get(1)));
  }

  @Test
  @DisplayName("Supported Requests Find")
  public void testSupportedRequestFInd() {
    List<String> supportedRequests = conf.getSupportedRequests();
    assertEquals("find", (supportedRequests.get(2)));
  }

}