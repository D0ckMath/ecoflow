package com.itb.inf3am.ecoflow.service;

import com.itb.inf3am.ecoflow.dto.AvaliacaoDTO;
import com.itb.inf3am.ecoflow.entity.Avaliacao;
import com.itb.inf3am.ecoflow.repository.AvaliacaoRepository;
import com.itb.inf3am.ecoflow.repository.ProdutoRepository;
import com.itb.inf3am.ecoflow.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AvaliacaoService {

    private final AvaliacaoRepository repository;
    private final ProdutoRepository produtoRepository;
    private final UsuarioRepository usuarioRepository;

    public AvaliacaoService(AvaliacaoRepository repository, ProdutoRepository produtoRepository,
                            UsuarioRepository usuarioRepository) {
        this.repository = repository;
        this.produtoRepository = produtoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public List<AvaliacaoDTO> listarPorProduto(Integer produtoId) {
        return repository.findByProduto_Id(produtoId).stream().map(this::toDTO).toList();
    }

    public List<AvaliacaoDTO> listarPorUsuario(Integer usuarioId) {
        return repository.findByUsuario_Id(usuarioId).stream().map(this::toDTO).toList();
    }

    public AvaliacaoDTO criar(AvaliacaoDTO dto) {
        Avaliacao avaliacao = new Avaliacao();
        avaliacao.setComentario(dto.getComentario());
        avaliacao.setDataCadastro(LocalDateTime.now());
        avaliacao.setProduto(produtoRepository.findById(dto.getProdutoId())
                .orElseThrow(() -> new RuntimeException("Produto não encontrado")));
        avaliacao.setUsuario(usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado")));
        return toDTO(repository.save(avaliacao));
    }

    public void deletar(Integer id) {
        repository.findById(id).orElseThrow(() -> new RuntimeException("Avaliação não encontrada: " + id));
        repository.deleteById(id);
    }

    private AvaliacaoDTO toDTO(Avaliacao a) {
        AvaliacaoDTO dto = new AvaliacaoDTO();
        dto.setId(a.getId());
        dto.setComentario(a.getComentario());
        dto.setDataCadastro(a.getDataCadastro());
        dto.setProdutoId(a.getProduto().getId());
        dto.setProdutoNome(a.getProduto().getNome());
        dto.setUsuarioId(a.getUsuario().getId());
        dto.setUsuarioNome(a.getUsuario().getNome());
        return dto;
    }
}
