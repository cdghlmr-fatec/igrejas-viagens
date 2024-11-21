package com.fatec.api.controllers;

import com.fatec.api.models.Bus;
import com.fatec.api.services.BusService;
import com.fatec.api.models.Message;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.fatec.api.models.Excursion;
import com.fatec.api.services.ExcursionService;
import org.springframework.web.bind.annotation.CrossOrigin;



@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/secretaria")
public class SecretariaController {

    @Autowired
    private BusService busService;

    @Autowired
    private ExcursionService excursionService;


    @GetMapping
    @PreAuthorize("hasRole('SECRETARIA') or " +
            "hasRole('ADMIN')")
    public String secretaria() {
        return "Secretaria";
    }

    @GetMapping("/onibus")
	@PreAuthorize("hasRole('SECRETARIA') or " +
            "hasRole('ADMIN')")
    public List<Bus> getAllUsers() {
        return busService.getAllBuses();
    }

    @GetMapping("/onibus/{id}")
    @PreAuthorize("hasRole('SECRETARIA') or " +
            "hasRole('ADMIN')")
    public ResponseEntity<Bus> getBusById(@PathVariable String id) {
        Bus bus = busService.getBusById(id);
        return bus != null ? ResponseEntity.ok(bus) : ResponseEntity.notFound().build();
    }

    @PostMapping("/onibus")
    @PreAuthorize("hasRole('SECRETARIA') or " +
            "hasRole('ADMIN')")
    public ResponseEntity<?> createBus(@Valid @RequestBody Bus bus) {
        if (busService.existsByPlate(bus.getPlate())) {
            return ResponseEntity.badRequest().body(new Message("Error: Bus with this plate already exists."));
        }

        try {
            Bus createdBus = busService.createBus(bus);
            return ResponseEntity.ok(createdBus);
        } catch (Exception e) {
            
            return ResponseEntity.badRequest().body(new Message("Error: " + e.getMessage()));
        }
    }

    @PutMapping("/onibus/{id}")
    @PreAuthorize("hasRole('SECRETARIA') or " +
            "hasRole('ADMIN')")
    public ResponseEntity<?> updateBus(@PathVariable String id, @Valid @RequestBody Bus bus) {
        Bus updatedBus = busService.updateBus(id, bus);
        return updatedBus != null ? ResponseEntity.ok(updatedBus) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/onibus/{id}")
    @PreAuthorize("hasRole('SECRETARIA') or " +
            "hasRole('ADMIN')")
    public ResponseEntity<?> deleteBus(@PathVariable String id) {
        busService.deleteBus(id);
        return ResponseEntity.ok(new Message("Bus deleted successfully."));
    }

    /* Excursão */

    @GetMapping("/excursao")
    @PreAuthorize("hasRole('SECRETARIA') or " +
            "hasRole('ADMIN')")
    public List<Excursion> getAllExcursions() {
        return excursionService.getAllExcursions();
    }

    @GetMapping("/excursao/{id}")
    @PreAuthorize("hasRole('SECRETARIA') or " +
            "hasRole('ADMIN')")
    public ResponseEntity<Excursion> getExcursionById(@PathVariable String id) {
        Excursion excursion = excursionService.getExcursionById(id);
        return excursion != null ? ResponseEntity.ok(excursion) : ResponseEntity.notFound().build();
    }

    @PostMapping("/excursao")
    @PreAuthorize("hasRole('SECRETARIA') or " +
            "hasRole('ADMIN')")
    public ResponseEntity<?> createExcursion(@Valid @RequestBody Excursion excursion) {
        
        try {
            Excursion createdExcursion = excursionService.createExcursion(excursion);
            return ResponseEntity.ok(createdExcursion);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new Message("Error: " + e.getMessage()));
        }
    }

    // @PutMapping("/excursao/{id}")
    // @PreAuthorize("hasRole('SECRETARIA') or " +
    //         "hasRole('ADMIN')")
    // public ResponseEntity<?> updateExcursion(@PathVariable String id, @Valid @RequestBody Excursion excursion) {
    //     Excursion updatedExcursion = excursionService.updateExcursion(id, excursion);
    //     return updatedExcursion != null ? ResponseEntity.ok(updatedExcursion) : ResponseEntity.notFound().build();
    // }

    @DeleteMapping("/excursao/{id}")
    @PreAuthorize("hasRole('SECRETARIA') or " +
            "hasRole('ADMIN')")
    public ResponseEntity<?> deleteExcursion(@PathVariable String id) {
        excursionService.deleteExcursion(id);
        return ResponseEntity.ok(new Message("Excursion deleted successfully."));
    }

}