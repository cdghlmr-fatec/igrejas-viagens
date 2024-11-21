package com.fatec.api.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Document(collection = "controle_presenca")
public class ControlePresenca {
    @Id
    private String id;
    
    /*
     * excursao_id
672279ac90460a532721ac85
coordenador_id
60d5f6f8f1f1a85c4c4d6f19
tipo_chamada
"ida"
data_chamada
2023-10-11T08:00:00.000+00:00

passageiros
Array (2)

0
Object
passageiro_id
60d5f6f8f1f1a85c4c4d6f20
presente
true

1
Object
passageiro_id
60d5f6f8f1f1a85c4c4d6f21
presente
false
     */

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