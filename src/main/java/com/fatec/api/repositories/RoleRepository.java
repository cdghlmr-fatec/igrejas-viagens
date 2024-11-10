package com.fatec.api.repositories;

import java.util.Optional; 

import com.fatec.api.models.EmployeeRole;
import com.fatec.api.models.Role; 
import org.springframework.data.mongodb.repository.MongoRepository; 

public interface RoleRepository extends MongoRepository<Role, String> {

    Optional<Role> findByName(EmployeeRole name);
}
