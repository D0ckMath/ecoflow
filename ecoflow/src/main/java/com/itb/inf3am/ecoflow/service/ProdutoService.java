package com.itb.inf3am.ecoflow.service;

import com.itb.inf3am.ecoflow.dto.ProdutoDTO;
import com.itb.inf3am.ecoflow.entity.Produto;
import com.itb.inf3am.ecoflow.repository.CategoriaRepository;
import com.itb.inf3am.ecoflow.repository.ProdutoRepository;
import com.itb.inf3am.ecoflow.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProdutoService {

    private final ProdutoRepository repository;
    private final UsuarioRepository usuarioRepository;
    private final CategoriaRepository categoriaRepository;

    public ProdutoService(ProdutoRepository repository, UsuarioRepository usuarioRepository,
                          CategoriaRepository categoriaRepository) {
        this.repository = repository;
        this.usuarioRepository = usuarioRepository;
        this.categoriaRepository = categoriaRepository;
    }

    public List<ProdutoDTO> listarTodos() {
        return repository.findAll().stream().map(this::toDTO).toList();
    }

    public List<ProdutoDTO> listarPorCategoria(Integer categoriaId) {
        return repository.findByCategoria_Id(categoriaId).stream().map(this::toDTO).toList();
    }

    public List<ProdutoDTO> listarPorUsuario(Integer usuarioId) {
        return repository.findByUsuario_Id(usuarioId).stream().map(this::toDTO).toList();
    }

    public ProdutoDTO buscarPorId(Integer id) {
        return toDTO(findById(id));
    }

    public ProdutoDTO criar(ProdutoDTO dto) {
        Produto produto = new Produto();
        produto.setNome(dto.getNome());
        produto.setDescricao(dto.getDescricao());
        produto.setTelefone(dto.getTelefone());
        produto.setEmail(dto.getEmail());
        produto.setStatusProduto("ATIVO");
        produto.setDataCadastro(LocalDateTime.now());
        produto.setUsuario(usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado")));
        produto.setCategoria(categoriaRepository.findById(dto.getCategoriaId())
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada")));
        return toDTO(repository.save(produto));
    }

    public ProdutoDTO atualizar(Integer id, ProdutoDTO dto) {
        Produto produto = findById(id);
        produto.setNome(dto.getNome());
        produto.setDescricao(dto.getDescricao());
        produto.setTelefone(dto.getTelefone());
        produto.setEmail(dto.getEmail());
        produto.setStatusProduto(dto.getStatusProduto());
        if (dto.getCategoriaId() != null)
            produto.setCategoria(categoriaRepository.findById(dto.getCategoriaId())
                    .orElseThrow(() -> new RuntimeException("Categoria não encontrada")));
        return toDTO(repository.save(produto));
    }

    public void deletar(Integer id) {
        findById(id);
        repository.deleteById(id);
    }

    private Produto findById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado: " + id));
    }

    private ProdutoDTO toDTO(Produto p) {
        ProdutoDTO dto = new ProdutoDTO();
        dto.setId(p.getId());
        dto.setNome(p.getNome());
        dto.setDescricao(p.getDescricao());
        dto.setDataCadastro(p.getDataCadastro());
        dto.setTelefone(p.getTelefone());
        dto.setEmail(p.getEmail());
        dto.setStatusProduto(p.getStatusProduto());
        dto.setUsuarioId(p.getUsuario().getId());
        dto.setUsuarioNome(p.getUsuario().getNome());
        dto.setCategoriaId(p.getCategoria().getId());
        dto.setCategoriaNome(p.getCategoria().getNome());
        return dto;
    }
}
