package com.fatec.api.controllers;

import org.springframework.security.access.prepost.PreAuthorize; // Import PreAuthorize for role-based access control
import org.springframework.web.bind.annotation.CrossOrigin; // Import CrossOrigin for handling CORS
import org.springframework.web.bind.annotation.GetMapping; // Import GetMapping for handling GET requests
import org.springframework.web.bind.annotation.RequestMapping; // Import RequestMapping for defining request paths
import org.springframework.web.bind.annotation.RestController; // Import RestController for creating RESTful controllers

@CrossOrigin(origins = "*", maxAge = 3600) // Allow cross-origin requests from any origin for 1 hour
@RestController // Indicate that this class is a REST controller
@RequestMapping("/api/test") // Base URL for test-related endpoints
public class TestController {

    /**
     * Public endpoint that can be accessed without any authentication.
     *
     * @return A string message indicating public content.
     */
    @GetMapping("/all") // Map GET requests to "/api/test/all"
    public String allAccess() {
        return "Public Content."; // Return a message accessible by anyone
    }

    /**
     * Endpoint accessible to users with roles SECRETARIA, COORDENADOR, or ADMIN.
     *
     * @return A string message indicating user content.
     */
    @GetMapping("/user") // Map GET requests to "/api/test/user"
    @PreAuthorize("hasRole('SECRETARIA') or hasRole('COORDENADOR') or hasRole('ADMIN')") // Restrict to certain roles
    public String userAccess() {
        return "User Content."; // Return a message accessible by users with the required roles
    }

    /**
     * Endpoint accessible only to users with the ADMIN role.
     *
     * @return A string message indicating admin board content.
     */
    @GetMapping("/admin") // Map GET requests to "/api/test/admin"
	@PreAuthorize("hasRole('SECRETARIA') or hasRole('COORDENADOR') or hasRole('ADMIN')") // Restrict to certai
    public String adminAccess() {
        return "Admin Board."; // Return a message accessible by admins
    }

    /**
     * Endpoint accessible only to users with the SECRETARIA role.
     *
     * @return A string message indicating secretaria board content.
     */
    @GetMapping("/secretaria") // Map GET requests to "/api/test/secretaria"
    @PreAuthorize("hasRole('SECRETARIA') or hasRole('COORDENADOR') or hasRole('ADMIN')") // Restrict to certain 
    public String secretariaAccess() {
        return "Secretaria Board."; // Return a message accessible by users with the SECRETARIA role
    }

    /**
     * Endpoint accessible only to users with the COORDENADOR role.
     *
     * @return A string message indicating coordenador board content.
     */
    @GetMapping("/coordenador") // Map GET requests to "/api/test/coordenador"
    @PreAuthorize("hasRole('SECRETARIA') or hasRole('COORDENADOR') or hasRole('ADMIN')") // Restrict to certain 
    public String coordenadorAccess() {
        return "Coordenador Board."; // Return a message accessible by users with the COORDENADOR role
    }
}
