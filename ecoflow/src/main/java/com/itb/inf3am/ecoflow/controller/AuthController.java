package com.itb.inf3am.ecoflow.controller;

import com.itb.inf3am.ecoflow.dto.LoginRequest;
import com.itb.inf3am.ecoflow.dto.LoginResponse;
import com.itb.inf3am.ecoflow.entity.Usuario;
import com.itb.inf3am.ecoflow.repository.UsuarioRepository;
import com.itb.inf3am.ecoflow.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;
    private final UsuarioRepository usuarioRepository;

    public AuthController(AuthenticationManager authManager, JwtUtil jwtUtil,
                          UsuarioRepository usuarioRepository) {
        this.authManager = authManager;
        this.jwtUtil = jwtUtil;
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        Usuario usuario = usuarioRepository.findByUsername(request.getUsername()).orElseThrow();
        String token = jwtUtil.generateToken(usuario.getUsername());
        return ResponseEntity.ok(new LoginResponse(token, usuario.getUsername(), usuario.getNivelAcesso()));
    }
}
