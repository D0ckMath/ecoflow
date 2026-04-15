package com.itb.inf3am.ecoflow.controller;

import com.itb.inf3am.ecoflow.entity.Categoria;
import com.itb.inf3am.ecoflow.service.CategoriaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {

    private final CategoriaService service;

    public CategoriaController(CategoriaService service) {
        this.service = service;
    }

    @GetMapping
    public List<Categoria> listar() {
        return service.listarTodas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Categoria> buscar(@PathVariable Integer id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Categoria> criar(@RequestBody Categoria categoria) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criar(categoria));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Categoria> atualizar(@PathVariable Integer id, @RequestBody Categoria categoria) {
        return ResponseEntity.ok(service.atualizar(id, categoria));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
