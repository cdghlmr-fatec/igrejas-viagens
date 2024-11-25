package com.fatec.api.models;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.springframework.data.mongodb.core.mapping.DBRef;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "reservas")
public class Reservation {
    @Id
    private String id;

    private LocalDate data;

    private String onibus;

    private String origem;

    private String destino;

    private String status;

    private String valor;

    private List<Passageiro> passageiros;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public String getOnibus() {
        return onibus;
    }

    public void setOnibus(String onibus) {
        this.onibus = onibus;
    }

    public String getOrigem() {
        return origem;
    }

    public void setOrigem(String origem) {
        this.origem = origem;
    }

    public String getDestino() {
        return destino;
    }

    public void setDestino(String destino) {
        this.destino = destino;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getValor() {
        return valor;
    }

    public void setValor(String valor) {
        this.valor = valor;
    }

    public List<Passageiro> getPassengers() {
        return passageiros;
    }

    public void setPassengers(List<Passageiro> passageiros) {
        this.passageiros = passageiros;
    }
} 