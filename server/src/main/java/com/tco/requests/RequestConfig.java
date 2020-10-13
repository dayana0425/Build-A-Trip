package com.tco.requests;
import com.tco.misc.BadRequestException;
import java.lang.String;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class RequestConfig extends RequestHeader {

  private String serverName;
  private List<String> supportedRequests;
  private final transient Logger log = LoggerFactory.getLogger(RequestConfig.class);

  @Override
  public void buildResponse() {
    this.serverName = "T16 Team Hexadecimal";
    this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
    this.requestType = "config";
    this.supportedRequests = new ArrayList();
    this.supportedRequests.add("config");
    this.supportedRequests.add("distance");
    this.supportedRequests.add("find");
    log.trace("buildResponse -> {}", this);
  }

  public String getServerName() {
    return serverName;
  }

  public List<String> getSupportedRequests() {
    return supportedRequests;
  }

}