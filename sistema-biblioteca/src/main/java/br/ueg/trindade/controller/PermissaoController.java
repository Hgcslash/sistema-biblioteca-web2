package br.ueg.trindade.controller;

import br.ueg.trindade.model.Permissao;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/permissoes")
public class PermissaoController {

    @GetMapping
    public List<Permissao> listar() {
        return Arrays.asList(
            new Permissao(1L, "ADMIN", "Acesso administrativo"),
            new Permissao(2L, "USUARIO", "Acesso padrão ao sistema")
        );
    }
}
