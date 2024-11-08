package com.fatec.api.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import com.fatec.api.models.EmployeeRole;
import com.fatec.api.models.Role;
import com.fatec.api.models.User;
import com.fatec.api.payload.request.EditUserRequest;
import com.fatec.api.payload.request.LoginRequest;
import com.fatec.api.payload.request.ResetPasswordConfirmRequest;
import com.fatec.api.payload.request.ResetPasswordRequest;
import com.fatec.api.payload.request.SignupRequest;
import com.fatec.api.payload.response.JwtResponse;
import com.fatec.api.payload.response.MessageResponse;
import com.fatec.api.repository.RoleRepository;
import com.fatec.api.repository.UserRepository;
import com.fatec.api.security.jwt.JwtUtils;
import com.fatec.api.security.services.EmailService;
import com.fatec.api.security.services.UserDetailsImpl;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600) // Allow cross-origin requests for all origins
@RestController // Indicate that this class is a REST controller
@RequestMapping("/api/auth") // Base URL for authentication-related endpoints
public class AuthController {

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

    @Autowired
    EmailService emailService; // Service for sending emails

    /**
     * Authenticate user and return a JWT token if successful.
     *
     * @param loginRequest The login request containing username and password.
     * @return A ResponseEntity containing the JWT response or an error message.
     */
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        // Authenticate the user with the provided username and password
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),
                        loginRequest.getPassword()));

        // Set the authentication in the security context
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Generate JWT token based on the authentication
        String jwt = jwtUtils.generateJwtToken(authentication);

        // Get user details from the authentication object
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        // Extract user roles into a list
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        // Return a response containing the JWT and user details
        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    /**
     * Register a new user account.
     *
     * @param signUpRequest The signup request containing user details.
     * @return A ResponseEntity indicating success or error message.
     */
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {

        // Check if the username is already taken
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        // Check if the email is already in use
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create a new user's account, including the new fields (church and phone)
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()), // Encrypt the password
                signUpRequest.getChurch(),  // Pass the church field
                signUpRequest.getPhone());  // Pass the phone field

        // Assign roles to the user based on the request
        Set<String> strRoles = signUpRequest.getRoles();
        Set<Role> roles = new HashSet<>(); // Initialize a set to hold the user roles

        // Assign roles based on the request or default to user role
        if (strRoles == null) {
            Role userRole = roleRepository.findByName(EmployeeRole.ROLE_ADMIN)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "secretaria":
                        Role secretaryRole = roleRepository.findByName(EmployeeRole.ROLE_SECRETARIA)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(secretaryRole);
                        break;
                    case "coordenador":
                        Role coordinatorRole = roleRepository.findByName(EmployeeRole.ROLE_COORDENADOR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(coordinatorRole);
                        break;
                    default:
                        Role defaultRole = roleRepository.findByName(EmployeeRole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(defaultRole);
                }
            });
        }

        // Set roles to the user
        user.setRoles(roles);
        // Save the user to the repository
        userRepository.save(user);

        // Return a success message upon successful registration
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    /**
     * Request password reset.
     *
     * @param resetPasswordRequest The reset password request containing the email.
     * @return A ResponseEntity indicating success or error message.
     */
    @PostMapping("/reset-password")
    public ResponseEntity<?> requestPasswordReset(@Valid @RequestBody ResetPasswordRequest resetPasswordRequest) {
        String email = resetPasswordRequest.getEmail();
        Optional<User> userOptional = userRepository.findByEmail(email);
        
        if (!userOptional.isPresent()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email not found!"));
        }

        User user = userOptional.get();
        String token = jwtUtils.generateResetToken(user.getUsername()); // Método para gerar token
        // Enviar e-mail com o link de reset (implementação do envio de e-mail necessária)
        emailService.sendResetEmail(user.getEmail(), token);
        
        return ResponseEntity.ok(new MessageResponse("Reset password email sent!"));
    }

    @PostMapping("/reset-password/confirm")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody ResetPasswordConfirmRequest resetPasswordConfirmRequest) {
        String token = resetPasswordConfirmRequest.getToken();
        String newPassword = resetPasswordConfirmRequest.getNewPassword();

        // Validar o token e obter o username
        String username = jwtUtils.getUserNameFromJwtToken(token);
        Optional<User> userOptional = userRepository.findByUsername(username);
        
        if (!userOptional.isPresent()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Invalid token!"));
        }

        User user = userOptional.get();
        user.setPassword(encoder.encode(newPassword)); // Codificar a nova senha
        userRepository.save(user);
        
        return ResponseEntity.ok(new MessageResponse("Password has been reset successfully!"));
    }

      /**
     * Edit user data - Only accessible by admin.
     *
     * @param userId The ID of the user to be edited.
     * @param editUserRequest The request body containing the new user data.
     * @return A ResponseEntity indicating success or failure.
     */
    @PutMapping("/users/{userId}")
    public ResponseEntity<?> editUser(@Valid @PathVariable String userId, @RequestBody EditUserRequest editUserRequest) {
        // Verify that the authenticated user is an admin
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!userDetails.getAuthorities().stream().anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"))) {
            return ResponseEntity.status(403).body(new MessageResponse("Error: Access is denied! Admin role is required."));
        }

        // Find the user by ID
        Optional<User> userOptional = userRepository.findById(userId);
        if (!userOptional.isPresent()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: User not found."));
        }

        User user = userOptional.get();

        // Update user details
        if (editUserRequest.getUsername() != null) {
            user.setUsername(editUserRequest.getUsername());
        }
        if (editUserRequest.getEmail() != null) {
            user.setEmail(editUserRequest.getEmail());
        }
        if (editUserRequest.getPhone() != null) {
            user.setPhone(editUserRequest.getPhone());
        }
        if (editUserRequest.getChurch() != null) {
            user.setChurch(editUserRequest.getChurch());
        }

        // Save updated user
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User data updated successfully."));
    }

    /**
     * Delete user - Only accessible by admin.
     *
     * @param userId The ID of the user to be deleted.
     * @return A ResponseEntity indicating success or failure.
     */
    @DeleteMapping("/users/{userId}")
    public ResponseEntity<?> deleteUser(@Valid @PathVariable String userId) {
        // Verify that the authenticated user is an admin
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!userDetails.getAuthorities().stream().anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"))) {
            return ResponseEntity.status(403).body(new MessageResponse("Error: Access is denied! Admin role is required."));
        }

        // Find the user by ID
        Optional<User> userOptional = userRepository.findByEmail(userId);
        if (!userOptional.isPresent()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: User not found."));
        }

        // Delete the user
        userRepository.delete(userOptional.get());

        return ResponseEntity.ok(new MessageResponse("User deleted successfully."));
    }

}
