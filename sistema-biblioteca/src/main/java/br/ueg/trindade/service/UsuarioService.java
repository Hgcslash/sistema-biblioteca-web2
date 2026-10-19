package br.ueg.trindade.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import br.ueg.trindade.model.Usuario;
import br.ueg.trindade.repository.UsuarioRepository;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> buscarPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    public Usuario salvar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public boolean existePorId(Long id) {
        return usuarioRepository.existsById(id);
    }

    public void excluir(Long id) {
        usuarioRepository.deleteById(id);
    }
}