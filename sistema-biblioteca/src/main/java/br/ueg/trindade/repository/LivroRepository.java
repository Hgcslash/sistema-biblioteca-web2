package br.ueg.trindade.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ueg.trindade.model.Livro;

public interface LivroRepository extends JpaRepository<Livro, Long> {
}