package com.itb.inf3am.ecoflow.dto;

public class LoginResponse {
    private String token;
    private String username;
    private String nivelAcesso;

    public LoginResponse(String token, String username, String nivelAcesso) {
        this.token = token;
        this.username = username;
        this.nivelAcesso = nivelAcesso;
    }

    public String getToken() { return token; }
    public String getUsername() { return username; }
    public String getNivelAcesso() { return nivelAcesso; }
}
