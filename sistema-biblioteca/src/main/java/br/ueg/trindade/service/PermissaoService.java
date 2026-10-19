package br.ueg.trindade.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import br.ueg.trindade.model.Permissao;
import br.ueg.trindade.repository.PermissaoRepository;

@Service
public class PermissaoService {

    private final PermissaoRepository permissaoRepository;

    public PermissaoService(PermissaoRepository permissaoRepository) {
        this.permissaoRepository = permissaoRepository;
    }

    public List<Permissao> listarTodas() {
        return permissaoRepository.findAll();
    }

    public Optional<Permissao> buscarPorId(Long id) {
        return permissaoRepository.findById(id);
    }

    public Permissao salvar(Permissao permissao) {
        return permissaoRepository.save(permissao);
    }

    public boolean existePorId(Long id) {
        return permissaoRepository.existsById(id);
    }

    public void excluir(Long id) {
        permissaoRepository.deleteById(id);
    }
}