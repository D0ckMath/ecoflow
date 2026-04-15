package com.itb.inf3am.ecoflow.dto;

import java.time.LocalDateTime;

public class AvaliacaoDTO {
    private Integer id;
    private Integer produtoId;
    private String produtoNome;
    private Integer usuarioId;
    private String usuarioNome;
    private LocalDateTime dataCadastro;
    private String comentario;

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public Integer getProdutoId() { return produtoId; }
    public void setProdutoId(Integer produtoId) { this.produtoId = produtoId; }
    public String getProdutoNome() { return produtoNome; }
    public void setProdutoNome(String produtoNome) { this.produtoNome = produtoNome; }
    public Integer getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Integer usuarioId) { this.usuarioId = usuarioId; }
    public String getUsuarioNome() { return usuarioNome; }
    public void setUsuarioNome(String usuarioNome) { this.usuarioNome = usuarioNome; }
    public LocalDateTime getDataCadastro() { return dataCadastro; }
    public void setDataCadastro(LocalDateTime dataCadastro) { this.dataCadastro = dataCadastro; }
    public String getComentario() { return comentario; }
    public void setComentario(String comentario) { this.comentario = comentario; }
}
