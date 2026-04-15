package com.itb.inf3am.ecoflow.service;

import com.itb.inf3am.ecoflow.entity.Categoria;
import com.itb.inf3am.ecoflow.repository.CategoriaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService {

    private final CategoriaRepository repository;

    public CategoriaService(CategoriaRepository repository) {
        this.repository = repository;
    }

    public List<Categoria> listarTodas() {
        return repository.findAll();
    }

    public Categoria buscarPorId(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada: " + id));
    }

    public Categoria criar(Categoria categoria) {
        return repository.save(categoria);
    }

    public Categoria atualizar(Integer id, Categoria dados) {
        Categoria categoria = buscarPorId(id);
        categoria.setNome(dados.getNome());
        return repository.save(categoria);
    }

    public void deletar(Integer id) {
        buscarPorId(id);
        repository.deleteById(id);
    }
}
