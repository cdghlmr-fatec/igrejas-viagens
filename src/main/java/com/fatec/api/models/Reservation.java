package com.fatec.api.models;

import java.util.HashSet;
import java.util.Set;
import org.springframework.data.mongodb.core.mapping.DBRef;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "reservas")
public class Reservation {
    @Id
    private String id;
    private LocalDate data;

    @DBRef
    private Set<Bus> bus = new HashSet<>();

    @DBRef
    private Set<Reservation> reservation = new HashSet<>();

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public Set<Bus> getBus() {
        return bus;
    }

    public void setBus(Set<Bus> bus) {
        this.bus = bus;
    }

    public Set<Reservation> getReservation() {
        return reservation;
    }

    public void setReservation(Set<Reservation> reservation) {
        this.reservation = reservation;
    }

} 