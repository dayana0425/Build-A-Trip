package com.tco.requests;

import com.tco.misc.BadRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Map;
import java.util.HashMap;
import java.util.List;


public class RequestDistance extends RequestHeader {

    private Long distance;
    private Double earthRadius;
    private Map<String,String> place1, place2;
    private final transient Logger log = LoggerFactory.getLogger(RequestDistance.class);

    public RequestDistance(){
        this.requestType = "distance";
        this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
    }

    public RequestDistance(Double radius, String lat1, String lon1, String lat2, String lon2) {
        this();
        this.distance = null;
        this.earthRadius = radius;
        this.place1 = new HashMap();
        this.place1.put("latitude", lat1);
        this.place1.put("longitude", lon1);
        this.place2 = new HashMap();
        this.place2.put("latitude", lat2);
        this.place2.put("longitude", lon2);
    }

    @Override
    public void buildResponse() {
        this.distance = calculate(this.place1, this.place2, this.earthRadius);
        log.trace("buildResponse -> {}", this);
    }

    static boolean validateCoords(double lat, double lon){
        if(lat < -90 || lat > 90){
            return false;
        }
        else if(lon < -180 || lon > 180){
            //throw new IllegalArgumentException("Longitude must be between -90 and 90 degrees");
            return false;
        }else{
            return true;
        }
    }

    protected static Long calculate(Map<String, String> place1, Map<String, String> place2, Double earthRad){
        Double dist1Lat = Double.parseDouble(place1.get("latitude")); //PARSE PLACE 1 and 2
        Double dist1Lng = Double.parseDouble(place1.get("longitude"));
//        if(validateCoords(dist1Lat, dist1Lng)){
//            throw new IllegalArgumentException("Latitude must be between -90 and 90 degrees");
//        }
        Double dist2Lat = Double.parseDouble(place2.get("latitude"));
        Double dist2Lng = Double.parseDouble(place2.get("longitude"));
        validateCoords(dist2Lat, dist2Lng);
        Double latDist = Math.toRadians(dist2Lat - dist1Lat);
        Double lngDist = Math.toRadians(dist2Lng - dist1Lng);

        Double calc = Math.sin(latDist/2.0)
                * Math.sin(latDist/2.0)
                + Math.cos(Math.toRadians(dist1Lat))
                * Math.cos(Math.toRadians(dist2Lat))
                * Math.sin(lngDist/2.0)
                * Math.sin(lngDist/2.0);

        Double dist = 2.0 * Math.atan2(Math.sqrt(calc), Math.sqrt(1.0-calc));

        return Math.round(dist * earthRad);
    }

    public Map<String,String> getPlace1(){return this.place1;}
    public Map<String,String> getPlace2(){return this.place2;}
    public double getEarthRadius(){return earthRadius;}
    public Long getDistance() { return distance; }


}