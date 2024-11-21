package com.fatec.api.repository;

import com.fatec.api.models.Excursion;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ExcursionRepository extends MongoRepository<Excursion, String> {
    
    Excursion findByDestination(String destination);

    Excursion findByDate(String date);

    Boolean existsByDestination(String destination);


    
}