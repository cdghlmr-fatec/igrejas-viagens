package com.fatec.api.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import com.fatec.api.models.EmployeeRole;
import com.fatec.api.models.Jwt;
import com.fatec.api.models.Login;
import com.fatec.api.models.Message;
import com.fatec.api.models.Role;
import com.fatec.api.models.SendPassword;
import com.fatec.api.models.Signup;
import com.fatec.api.models.User;
import com.fatec.api.repository.RoleRepository;
import com.fatec.api.repository.UserRepository;
import com.fatec.api.security.jwt.JwtUtils;
import com.fatec.api.security.services.UserDetailsImpl;
import com.fatec.api.services.AdminService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.MailSendException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private AdminService adminService;

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody Login loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),
                        loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new Jwt(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody Signup signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new Message("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new Message("Error: Email is already in use!"));
        }

        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()), signUpRequest.getChurch(), signUpRequest.getPhone());

        Set<String> strRoles = signUpRequest.getRoles();
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

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new Message("User registered successfully!"));
    }

    @PostMapping("/send-password")
    public ResponseEntity<?> sendPassword(@Valid @RequestBody SendPassword request) {
        // Usar AdminService para buscar o usuário por e-mail
        User user = adminService.getUserByEmail(request.getEmail());
        if (user == null) {
            return ResponseEntity.badRequest().body(new Message("Error: Email not found!"));
        }

        // Gerar nova senha temporária
        String newPassword = generateRandomPassword();
        user.setPassword(encoder.encode(newPassword));
        adminService.updateUser(user.getId(), user);

        // Enviar e-mail com a nova senha
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Nova Senha");
        message.setText("Sua nova senha é: " + newPassword);
        try {
            mailSender.send(message);
        } catch (MailSendException e) {
            // Log the error and provide feedback
            logger.error("Failed to send email: {}", e.getMessage());
            return ResponseEntity.badRequest().body(new Message("Error: Unable to send email!"));
        }

        return ResponseEntity.ok(new Message("Nova senha enviada para o e-mail!"));
    }

    // Método para gerar uma senha aleatória
    private String generateRandomPassword() {
        return UUID.randomUUID().toString().substring(0, 8);
    }
}
