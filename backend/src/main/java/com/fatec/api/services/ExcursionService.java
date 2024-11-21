package com.fatec.api.services;

import com.fatec.api.models.Excursion;
import com.fatec.api.repository.ExcursionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExcursionService {
    @Autowired
    private ExcursionRepository excursionRepository;

    public ExcursionService(ExcursionRepository excursionRepository) {
        this.excursionRepository = excursionRepository;
    }

    public List<Excursion> getAllExcursions() {
        return excursionRepository.findAll();
    }

    public Excursion getExcursionById(String id) {
        return excursionRepository.findById(id).orElse(null);
    }

    public Excursion createExcursion(Excursion excursion) {
        
        return excursionRepository.save(excursion);
    }

    // public Excursion updateExcursion(String id, Excursion excursion) {
    //     Excursion excursionToUpdate = excursionRepository.findById(id).orElse(null);
    //     if (excursionToUpdate == null) {
    //         return null;
    //     }
    //     /*
    //      private String id;
    //     private LocalDate date;
    //     private String destination;
    //     private List<String> busIds;
    //     private List<Reservation> reservations;
    //         */

    //     excursionToUpdate.setDate(excursion.getDate());
    //     excursionToUpdate.setDestination(excursion.getDestination());
    //     excursionToUpdate.setBusIds(excursion.getBusIds());
    //     excursionToUpdate.setReservations(excursion.getReservations());
    //     return excursionRepository.save(excursionToUpdate);
    // }

    public void deleteExcursion(String id) {
        excursionRepository.deleteById(id);
    }

    public boolean existsByDestination(String destination) {
        return excursionRepository.existsByDestination(destination);
    }
}