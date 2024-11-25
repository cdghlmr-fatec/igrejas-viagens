package com.fatec.api.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Document(collection = "controle_presenca")
public class ControlePresenca {
    @Id
    private String id;
    private String excursao_id;
    private String coordenador_id;
    private String tipo_chamada;
    private LocalDate data_chamada;
    private List<Passageiro> passageiros;
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getExcursao_id() {
        return excursao_id;
    }
    public void setExcursao_id(String excursao_id) {
        this.excursao_id = excursao_id;
    }
    public String getCoordenador_id() {
        return coordenador_id;
    }
    public void setCoordenador_id(String coordenador_id) {
        this.coordenador_id = coordenador_id;
    }
    public String getTipo_chamada() {
        return tipo_chamada;
    }
    public void setTipo_chamada(String tipo_chamada) {
        this.tipo_chamada = tipo_chamada;
    }
    public LocalDate getData_chamada() {
        return data_chamada;
    }
    public void setData_chamada(LocalDate data_chamada) {
        this.data_chamada = data_chamada;
    }
    public List<Passageiro> getPassageiros() {
        return passageiros;
    }
    public void setPassageiros(List<Passageiro> passageiros) {
        this.passageiros = passageiros;
    }
    

}