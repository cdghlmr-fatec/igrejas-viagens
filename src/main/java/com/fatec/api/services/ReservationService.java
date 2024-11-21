package com.fatec.api.services;

import com.fatec.api.models.Reservation;
import com.fatec.api.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;

    public Iterable<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Reservation getReservationById(String id) {
        return reservationRepository.findById(id).orElse(null);
    }

    public Reservation createReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    // public Reservation updateReservation(String id, Reservation reservation) {
    //     Reservation reservationToUpdate = reservationRepository.findById(id).orElse(null);
    //     if (reservationToUpdate == null) {
    //         return null;
    //     }
    //     /*
    //      private String id;
    //     private String userId;
    //     private String excursionId;
    //     private String busId;
    // private LocalDateTime reservationDate;
    //         */

    //     reservationToUpdate.setUserId(reservation.getUserId());
    //     reservationToUpdate.setExcursionId(reservation.getExcursionId());
    //     reservationToUpdate.setBusId(reservation.getBusId());
    //     reservationToUpdate.setReservationDate(reservation.getReservationDate());
    //     return reservationRepository.save(reservationToUpdate);
    // }

    public void deleteReservation(String id) {
        reservationRepository.deleteById(id);
    }
} 