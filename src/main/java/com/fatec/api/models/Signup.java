package com.fatec.api.models;

import java.util.Set;

import jakarta.validation.constraints.*;

public class Signup {
  
    @NotBlank
    @Size(min = 3, max = 20)
    private String username;
 
    @NotBlank
    @Size(max = 50)
    @Email
    private String email;
    
    private Set<String> roles;
    
    @NotBlank
    @Size(min = 6, max = 40)
    private String password;

    @NotBlank
    @Size(max = 100)
    private String church; // Novo campo: Igreja

    @NotBlank
    @Size(max = 15) // Ajuste o tamanho conforme o formato de telefone
    private String phone; // Novo campo: Telefone
  
    // Getters e Setters
    public String getUsername() {
        return username;
    }
 
    public void setUsername(String username) {
        this.username = username;
    }
 
    public String getEmail() {
        return email;
    }
 
    public void setEmail(String email) {
        this.email = email;
    }
 
    public String getPassword() {
        return password;
    }
 
    public void setPassword(String password) {
        this.password = password;
    }

    public Set<String> getRoles() {
        return this.roles;
    }
    
    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }

    public String getChurch() {
        return church;
    }

    public void setChurch(String church) {
        this.church = church;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
