package com.tco.requests;

public class Place {
    String name = "";
    String latitude = "";
    String longitude = "";
    String id = "";
    String altitude = "";
    String municipality = "";
    String type = "";
    String region = "";
    String country = "";
    String url = "";
    String note = "";
    public Place(){
        this.name = "";
        this.latitude = "";
        this.longitude = "";
        this.id = "";
        this.altitude = "";
        this.municipality = "";
        this.type = "";
        this.region = "";
        this.country = "";
        this.url = "";
    }

    public Place (
            String name,
            String latitude,
            String longitude,
            String id,
            String altitude,
            String municipality,
            String type,
            String region,
            String country,
            String url
            )
    {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.id = id;
        this.altitude = altitude;
        this.municipality = municipality;
        this.type = type;
        this.region = region;
        this.country = country;
        this.url = url;
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

    public Place(
            String name,
            String latitude,
            String longitude,
    ){
        this.name = name;
        this,latitude = latitude;
        this.longitude = longitude;
    }

    public Place(
            String name,
            String latitude,
            String longitude,
            String note,
            ){
        this.name = name;
        this,latitude = latitude;
        this.longitude = longitude;
        this.note = note;
    }
}