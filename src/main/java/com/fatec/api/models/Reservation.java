package com.fatec.api.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "reservas")
public class Reservation {
    @Id
    private String id;
    private String userId;
    private String excursionId;
    private String busId;
    private LocalDate reservationDate;

    
    
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    public String getExcursionId() {
        return excursionId;
    }
    public void setExcursionId(String excursionId) {
        this.excursionId = excursionId;
    }
    public String getBusId() {
        return busId;
    }
    public void setBusId(String busId) {
        this.busId = busId;
    }
    public LocalDate getReservationDate() {
        return reservationDate;
    }
    public void setReservationDate(LocalDate reservationDate) {
        this.reservationDate = reservationDate;
    }

    // Getters and Setters
} 