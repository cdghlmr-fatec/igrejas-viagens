package com.fatec.api.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Document(collection = "excursao")
public class Excursion {
    @Id
    private String id;
    private LocalDate date;
    private String destination;
    private List<String> busIds;
    private List<Reservation> reservations;

    public Excursion() {
    }

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public LocalDate getDate() {
        return date;
    }
    public void setDate(LocalDate date) {
        this.date = date;
    }
    public String getDestination() {
        return destination;
    }
    public void setDestination(String destination) {
        this.destination = destination;
    }
    public List<String> getBusIds() {
        return busIds;
    }
    public void setBusIds(List<String> busIds) {
        this.busIds = busIds;
    }
    public List<Reservation> getReservations() {
        return reservations;
    }
    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }
} 