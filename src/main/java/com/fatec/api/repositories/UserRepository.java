package com.fatec.api.repositories;

import java.util.Optional; 
import com.fatec.api.models.User;
import org.springframework.data.mongodb.repository.MongoRepository; 


public interface UserRepository extends MongoRepository<User, String> {

  Optional<User> findByUsername(String username);

  User findByEmail(String email);

  Boolean existsByUsername(String username);

  Boolean existsByEmail(String email);

}
