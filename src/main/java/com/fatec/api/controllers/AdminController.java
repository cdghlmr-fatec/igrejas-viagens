package com.fatec.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.fatec.api.models.EmployeeRole;
import com.fatec.api.models.Message;
import com.fatec.api.models.Role;
import com.fatec.api.models.Signup;
import com.fatec.api.models.User;
import com.fatec.api.repositories.RoleRepository;
import com.fatec.api.repositories.UserRepository;
import com.fatec.api.security.jwt.JwtUtils;
import com.fatec.api.services.AdminService;

import jakarta.validation.Valid;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@CrossOrigin(origins = "*", maxAge = 3600) 
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
	AuthenticationManager authenticationManager; // Handles user authentication

	@Autowired
	UserRepository userRepository; // Repository for user-related database operations

	@Autowired
	RoleRepository roleRepository; // Repository for role-related database operations

	@Autowired
	PasswordEncoder encoder; // Encoder for password hashing

	@Autowired
	JwtUtils jwtUtils; // Utility for generating JWT tokens

    @GetMapping
	@PreAuthorize("hasRole('ADMIN')")
    public List<User> getAllUsers() {
        return adminService.getAllUsers();
    }

    @GetMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
        User user = adminService.getUserById(id);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> registerUser(@Valid @RequestBody Signup signUpRequest) {

		// Check if the username is already taken
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity
					.badRequest()
					.body(new Message("Error: Username is already taken!"));
		}

		// Check if the email is already in use
		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new Message("Error: Email is already in use!"));
		}

		// Create a new user's account
		User user = new User(signUpRequest.getUsername(),
				signUpRequest.getEmail(),
				encoder.encode(signUpRequest.getPassword()), signUpRequest.getChurch(), signUpRequest.getPhone()); // Encode the password

		Set<String> strRoles = signUpRequest.getRoles(); // Get the roles from the request
		Set<Role> roles = new HashSet<>(); // Initialize a set to hold the user roles

		// Assign roles based on the request or default to user role
		if (strRoles == null) {
			Role userRole = roleRepository.findByName(EmployeeRole.ROLE_SECRETARIA)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
					case "ADMIN":
						Role adminRole = roleRepository.findByName(EmployeeRole.ROLE_ADMIN)
								.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
						roles.add(adminRole);
						break;
					case "COORDENADOR":
						Role modRole = roleRepository.findByName(EmployeeRole.ROLE_COORDENADOR)
								.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
						roles.add(modRole);
						break;
					default:
						Role userRole = roleRepository.findByName(EmployeeRole.ROLE_SECRETARIA)
								.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
						roles.add(userRole);
				}
			});
		}

		// Assign roles to the user and save it to the database
		user.setRoles(roles);
		userRepository.save(user);

		// Return a success message upon successful registration
		return ResponseEntity.ok(new Message("User registered successfully!"));
	}

    @PutMapping("update/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateUser(@PathVariable String id, @Valid @RequestBody Signup userDetails) {
        // Verificar se o usuário existe
        User existingUser = userRepository.findById(id).orElse(null);
        if (existingUser == null) {
            return ResponseEntity.notFound().build(); // Retorna 404 se o usuário não for encontrado
        }

        // Atualizar os detalhes do usuário
        existingUser.setUsername(userDetails.getUsername());
        existingUser.setEmail(userDetails.getEmail());
        existingUser.setPhone(userDetails.getPhone());
        existingUser.setChurch(userDetails.getChurch());

        // Atualizar a senha se fornecida
        if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
            existingUser.setPassword(encoder.encode(userDetails.getPassword())); // Codificar a nova senha
        }

        // Atualizar as roles
        Set<String> strRoles = userDetails.getRoles();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(EmployeeRole.ROLE_SECRETARIA)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "ADMIN":
                        Role adminRole = roleRepository.findByName(EmployeeRole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);
                        break;
                    case "COORDENADOR":
                        Role modRole = roleRepository.findByName(EmployeeRole.ROLE_COORDENADOR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(modRole);
                        break;
                    default:
                        Role userRole = roleRepository.findByName(EmployeeRole.ROLE_SECRETARIA)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }

        existingUser.setRoles(roles); // Atualizar as roles do usuário
        userRepository.save(existingUser); // Salvar as alterações no banco de dados

        return ResponseEntity.ok(new Message("User updated successfully!")); // Retornar mensagem de sucesso
    }

    @DeleteMapping("delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable String id) {
        // Verificar se o usuário existe
        if (!userRepository.existsById(id)) {
            return ResponseEntity.notFound().build(); // Retorna 404 se o usuário não for encontrado
        }

        adminService.deleteUser(id); // Chamar o serviço para deletar o usuário
        return ResponseEntity.ok(new Message("User deleted successfully!")); // Retornar mensagem de sucesso
    }
}