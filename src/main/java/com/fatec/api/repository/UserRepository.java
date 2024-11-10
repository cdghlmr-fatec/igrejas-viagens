package com.fatec.api.repository;

import java.util.Optional; // Import Optional for handling optional values
import com.fatec.api.models.User; // Import User model
import org.springframework.data.mongodb.repository.MongoRepository; // Import MongoRepository for MongoDB operations


public interface UserRepository extends MongoRepository<User, String> {

  Optional<User> findByUsername(String username);

  User findByEmail(String email);

  Boolean existsByUsername(String username);

  Boolean existsByEmail(String email);

}
