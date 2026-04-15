package com.itb.inf3am.ecoflow.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(nullable = false, length = 100, unique = true)
    private String username;

    @Column(nullable = false, length = 100)
    private String password;

    @Column(length = 10)
    private String nivelAcesso;

    @Lob
    private byte[] foto;

    @Column(nullable = false)
    private LocalDateTime dataCadastro;

    private LocalDateTime dataAtualizacao;

    @Column(nullable = false, length = 20)
    private String statusUsuario;

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getNivelAcesso() { return nivelAcesso; }
    public void setNivelAcesso(String nivelAcesso) { this.nivelAcesso = nivelAcesso; }
    public byte[] getFoto() { return foto; }
    public void setFoto(byte[] foto) { this.foto = foto; }
    public LocalDateTime getDataCadastro() { return dataCadastro; }
    public void setDataCadastro(LocalDateTime dataCadastro) { this.dataCadastro = dataCadastro; }
    public LocalDateTime getDataAtualizacao() { return dataAtualizacao; }
    public void setDataAtualizacao(LocalDateTime dataAtualizacao) { this.dataAtualizacao = dataAtualizacao; }
    public String getStatusUsuario() { return statusUsuario; }
    public void setStatusUsuario(String statusUsuario) { this.statusUsuario = statusUsuario; }
}
