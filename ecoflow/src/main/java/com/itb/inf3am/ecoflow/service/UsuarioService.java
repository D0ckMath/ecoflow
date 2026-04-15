package com.itb.inf3am.ecoflow.service;

import com.itb.inf3am.ecoflow.entity.Usuario;
import com.itb.inf3am.ecoflow.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository repository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<Usuario> listarTodos() {
        return repository.findAll();
    }

    public Usuario buscarPorId(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado: " + id));
    }

    public Usuario criar(Usuario usuario) {
        if (repository.existsByUsername(usuario.getUsername()))
            throw new RuntimeException("Username já cadastrado: " + usuario.getUsername());
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        usuario.setDataCadastro(LocalDateTime.now());
        usuario.setStatusUsuario("ATIVO");
        return repository.save(usuario);
    }

    public Usuario atualizar(Integer id, Usuario dados) {
        Usuario usuario = buscarPorId(id);
        usuario.setNome(dados.getNome());
        usuario.setNivelAcesso(dados.getNivelAcesso());
        usuario.setStatusUsuario(dados.getStatusUsuario());
        usuario.setDataAtualizacao(LocalDateTime.now());
        if (dados.getFoto() != null) usuario.setFoto(dados.getFoto());
        return repository.save(usuario);
    }

    public void deletar(Integer id) {
        buscarPorId(id);
        repository.deleteById(id);
    }
}
