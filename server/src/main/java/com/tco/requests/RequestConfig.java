package com.tco.requests;
import java.lang.String;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.tco.misc.BadRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class RequestConfig extends RequestHeader {

  private String serverName;
  private List<String> supportedRequests;
  private Filters filters;
  private final transient Logger log = LoggerFactory.getLogger(RequestConfig.class);

  @Override
  public void buildResponse() throws BadRequestException {
    this.serverName = "T16 Team Hexadecimal";
    this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
    this.requestType = "config";
    this.supportedRequests = new ArrayList();
    this.supportedRequests.add("config");
    this.supportedRequests.add("distance");
    this.supportedRequests.add("find");
    this.supportedRequests.add("trip");
    this.filters = new Filters();
    log.trace("buildResponse -> {}", this);
  }

  public String getServerName() {
    return serverName;
  }

  public List<String> getSupportedRequests() {
    return supportedRequests;
  }

}