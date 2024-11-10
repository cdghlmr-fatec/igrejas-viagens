package com.fatec.api.repositories;

import com.fatec.api.models.Bus;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BusRepository extends MongoRepository<Bus, String> {
    
    Bus findByPlate(String plate);

    Bus findByModel(String model);

    Boolean existsByPlate(String plate);


}
