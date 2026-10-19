package br.ueg.trindade.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ueg.trindade.model.Permissao;

public interface PermissaoRepository extends JpaRepository<Permissao, Long> {
}