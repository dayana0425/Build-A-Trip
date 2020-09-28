package com.tco.requests;

public class Place {
    String name = "";
    String latitude = "";
    String longitude = "";
    String id = "";
    String altitude = "";
    String municipality = "";
    String type = "";

    public Place(){
        this.name = "";
        this.latitude = "";
        this.longitude = "";
        this.id = "";
        this.altitude = "";
        this.municipality = "";
        this.type = "";
    }

    public Place (
            String name,
            String latitude,
            String longitude,
            String id,
            String altitude,
            String municipality,
            String type)
    {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.id = id;
        this.altitude = altitude;
        this.municipality = municipality;
        this.type = type;
    }
}