package com.tco.requests;
import com.tco.misc.BadRequestException;

public abstract class RequestHeader {

  protected final static int CURRENT_SUPPORTED_VERSION = 3;

  protected String requestType;
  protected int requestVersion;

  public String getRequestType() {
    return requestType;
  }

  public int getRequestVersion() {
    return requestVersion;
  }
  // Overrideable Methods
  public abstract void buildResponse() throws BadRequestException;
}