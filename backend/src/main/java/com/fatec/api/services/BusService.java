package com.fatec.api.services;

import com.fatec.api.models.Bus;
import com.fatec.api.repository.BusRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Service
public class BusService {
    @Autowired
    private BusRepository busRepository;

    public BusService(BusRepository busRepository) {
        this.busRepository = busRepository;
    }

    public List<Bus> getAllBuses() {
        return busRepository.findAll();
    }

    public Bus getBusById(String id) {
        return busRepository.findById(id).orElse(null);
    }

    public Bus createBus(Bus bus) {
        if (existsByPlate(bus.getPlate())) {
            throw new RuntimeException("Error: Bus with this plate already exists.");
        }
        return busRepository.save(bus);
    }

    public Bus updateBus(String id, Bus bus) {
        Bus busToUpdate = busRepository.findById(id).orElse(null);
        if (busToUpdate == null) {
            return null;
        }
        /*
         private String id;
        private String plate;
        private int capacity;
        private String model;
        private String driverName;
        private String status;
            */

        busToUpdate.setPlate(bus.getPlate());
        busToUpdate.setCapacity(bus.getCapacity());
        busToUpdate.setModel(bus.getModel());
        busToUpdate.setDriverName(bus.getDriverName());
        busToUpdate.setStatus(bus.getStatus());
        return busRepository.save(busToUpdate);
    }

    public void deleteBus(String id) {
        busRepository.deleteById(id);
    }


    public boolean existsByPlate(String plate) {
        return busRepository.findByPlate(plate) != null;
    }

    
}