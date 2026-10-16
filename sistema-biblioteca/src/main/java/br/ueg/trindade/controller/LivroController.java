package br.ueg.trindade.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ueg.trindade.model.Livro;
import br.ueg.trindade.service.LivroService;

@RestController
@RequestMapping("/api/livros")
@CrossOrigin(origins = "http://localhost:5173")
public class LivroController {

    private final LivroService livroService;

    public LivroController(LivroService livroService) {
        this.livroService = livroService;
    }

    @GetMapping
    public List<Livro> listarTodos() {
        return livroService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Livro> buscarPorId(@PathVariable Long id) {
        return livroService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Livro> cadastrar(@RequestBody Livro livro) {
        Livro salvo = livroService.salvar(livro);
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Livro> atualizar(
            @PathVariable Long id,
            @RequestBody Livro livro) {

        return livroService.buscarPorId(id)
                .map(existente -> {
                    existente.setTitulo(livro.getTitulo());
                    existente.setAutor(livro.getAutor());
                    existente.setIsbn(livro.getIsbn());
                    existente.setAnoPublicacao(livro.getAnoPublicacao());
                    existente.setQuantidade(livro.getQuantidade());

                    Livro atualizado = livroService.salvar(existente);
                    return ResponseEntity.ok(atualizado);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        if (livroService.buscarPorId(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        livroService.excluir(id);
        return ResponseEntity.noContent().build();
    }
}