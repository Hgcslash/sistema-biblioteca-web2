package br.ueg.trindade.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import br.ueg.trindade.model.Permissao;
import br.ueg.trindade.service.PermissaoService;

@RestController
@RequestMapping("/api/permissoes")
public class PermissaoController {

    private final PermissaoService permissaoService;

    public PermissaoController(PermissaoService permissaoService) {
        this.permissaoService = permissaoService;
    }

    @GetMapping
    public List<Permissao> listar() {
        return permissaoService.listarTodas();
    }

    @GetMapping("/{id}")
    public Permissao buscarPorId(@PathVariable Long id) {
        return permissaoService.buscarPorId(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Permissão não encontrada"));
    }

    @PostMapping
    public Permissao cadastrar(@RequestBody Permissao permissao) {
        return permissaoService.salvar(permissao);
    }

    @PutMapping("/{id}")
    public Permissao atualizar(
            @PathVariable Long id,
            @RequestBody Permissao dados) {

        Permissao permissao = permissaoService.buscarPorId(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Permissão não encontrada"));

        permissao.setNome(dados.getNome());
        permissao.setDescricao(dados.getDescricao());

        return permissaoService.salvar(permissao);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        if (!permissaoService.existePorId(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Permissão não encontrada");
        }

        permissaoService.excluir(id);
    }
}