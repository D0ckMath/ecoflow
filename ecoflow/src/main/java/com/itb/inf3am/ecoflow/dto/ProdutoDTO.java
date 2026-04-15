package com.itb.inf3am.ecoflow.dto;

import java.time.LocalDateTime;

public class ProdutoDTO {
    private Integer id;
    private String nome;
    private String descricao;
    private LocalDateTime dataCadastro;
    private String telefone;
    private String email;
    private Integer usuarioId;
    private String usuarioNome;
    private Integer categoriaId;
    private String categoriaNome;
    private String statusProduto;

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    public LocalDateTime getDataCadastro() { return dataCadastro; }
    public void setDataCadastro(LocalDateTime dataCadastro) { this.dataCadastro = dataCadastro; }
    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public Integer getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Integer usuarioId) { this.usuarioId = usuarioId; }
    public String getUsuarioNome() { return usuarioNome; }
    public void setUsuarioNome(String usuarioNome) { this.usuarioNome = usuarioNome; }
    public Integer getCategoriaId() { return categoriaId; }
    public void setCategoriaId(Integer categoriaId) { this.categoriaId = categoriaId; }
    public String getCategoriaNome() { return categoriaNome; }
    public void setCategoriaNome(String categoriaNome) { this.categoriaNome = categoriaNome; }
    public String getStatusProduto() { return statusProduto; }
    public void setStatusProduto(String statusProduto) { this.statusProduto = statusProduto; }
}
