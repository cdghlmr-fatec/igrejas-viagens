package com.fatec.api.controllers;

import com.fatec.api.models.Reservation;
import com.fatec.api.services.ReservationService;
import org.springframework.security.access.prepost.PreAuthorize;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;


@CrossOrigin(origins = "*", maxAge = 3600) 
@RestController
@RequestMapping("/api/coordenador")
public class CoordenadorController {
    @Autowired
    private ReservationService reservationService;

    @GetMapping("/reservas")
    @PreAuthorize("hasRole('SECRETARIA') or " +
            "hasRole('COORDENADOR') or " +
            "hasRole('ADMIN')")
    public ResponseEntity<Iterable<Reservation>> getAllReservations() {
        Iterable<Reservation> reservations = reservationService.getAllReservations();
        return ResponseEntity.ok(reservations);
    }

    @GetMapping("/reservas/{id}")
    @PreAuthorize("hasRole('SECRETARIA') or " +
            "hasRole('COORDENADOR') or " +
            "hasRole('ADMIN')")
    public ResponseEntity<Reservation> getReservationById(@PathVariable String id) {
        Reservation reservation = reservationService.getReservationById(id);
        return reservation != null ? ResponseEntity.ok(reservation) : ResponseEntity.notFound().build();
    }

    @PostMapping("/reservas")
    @PreAuthorize("hasRole('SECRETARIA') or " +
            "hasRole('COORDENADOR') or " +
            "hasRole('ADMIN')")
    public ResponseEntity<Reservation> createReservation(@Valid @RequestBody Reservation reservation) {
        Reservation createdReservation = reservationService.createReservation(reservation);
        return ResponseEntity.ok(createdReservation);
    }

    @PutMapping("/reservas/{id}")
    @PreAuthorize("hasRole('SECRETARIA') or " +
            "hasRole('COORDENADOR') or " +
            "hasRole('ADMIN')")
    public ResponseEntity<Reservation> updateReservation(@PathVariable String id, @Valid @RequestBody Reservation reservation) {
        Reservation updatedReservation = reservationService.updateReservation(id, reservation);
        return ResponseEntity.ok(updatedReservation);
    }

    @DeleteMapping("/reservas/{id}")
    @PreAuthorize("hasRole('SECRETARIA') or " +
            "hasRole('COORDENADOR') or " +
            "hasRole('ADMIN')")
    public ResponseEntity<Void> deleteReservation(@PathVariable String id) {
        reservationService.deleteReservation(id);
        return ResponseEntity.ok().build();
    }
} 