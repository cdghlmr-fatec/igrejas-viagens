package com.fatec.api.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Document(collection = "excursoes")
public class Excursion {
    @Id
    private String id;

    private String destination;

    private LocalDate date;

    private List<Bus> onibus;

    private List<ListaEspera> lista_espera;

    private List<ControlePresenca> controles_presenca;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public LocalDate getData() {
        return date;
    }

    public void setData(LocalDate date) {
        this.date = date;
    }

    public List<Bus> getOnibus() {
        return onibus;
    }

    public void setOnibus(List<Bus> onibus) {
        this.onibus = onibus;
    }

    public List<?> getLista_espera() {
        return lista_espera;
    }

    public void setLista_espera(List<ListaEspera> lista_espera) {
        this.lista_espera = lista_espera;
    }

    public List<?> getControles_presenca() {
        return controles_presenca;
    }

    public void setControles_presenca(List<ControlePresenca> controles_presenca) {
        this.controles_presenca = controles_presenca;
    }

}