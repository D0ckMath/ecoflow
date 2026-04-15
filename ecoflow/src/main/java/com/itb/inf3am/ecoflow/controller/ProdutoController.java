package com.itb.inf3am.ecoflow.controller;

import com.itb.inf3am.ecoflow.dto.ProdutoDTO;
import com.itb.inf3am.ecoflow.service.ProdutoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {

    private final ProdutoService service;

    public ProdutoController(ProdutoService service) {
        this.service = service;
    }

    @GetMapping
    public List<ProdutoDTO> listar(
            @RequestParam(required = false) Integer categoriaId,
            @RequestParam(required = false) Integer usuarioId) {
        if (categoriaId != null) return service.listarPorCategoria(categoriaId);
        if (usuarioId != null) return service.listarPorUsuario(usuarioId);
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProdutoDTO> buscar(@PathVariable Integer id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<ProdutoDTO> criar(@RequestBody ProdutoDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criar(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProdutoDTO> atualizar(@PathVariable Integer id, @RequestBody ProdutoDTO dto) {
        return ResponseEntity.ok(service.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
