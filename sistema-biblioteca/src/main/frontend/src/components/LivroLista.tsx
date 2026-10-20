import type { Livro } from '../types/Livro';
import LivroItem from './LivroItem';

interface LivroListaProps {
  livros: Livro[];
  carregando: boolean;
  erro: string;
  onEditar: (livro: Livro) => void;
  onExcluir: (id?: number) => void;
  onAtualizar: () => void;
}

function LivroLista({
  livros,
  carregando,
  erro,
  onEditar,
  onExcluir,
  onAtualizar,
}: LivroListaProps) {
  return (
    <section className="painel">
      <div className="cabecalho-lista">
        <h2>Livros cadastrados</h2>
        <button
          type="button"
          className="secundario"
          onClick={onAtualizar}
          disabled={carregando}
        >
          {carregando ? 'Atualizando...' : 'Atualizar lista'}
        </button>
      </div>

      {erro && <p className="erro">{erro}</p>}

      {carregando ? (
        <p>Carregando livros...</p>
      ) : livros.length === 0 ? (
        <p>Nenhum livro cadastrado.</p>
      ) : (
        <div className="tabela-responsiva">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Autor</th>
                <th>ISBN</th>
                <th>Ano</th>
                <th>Quantidade</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {livros.map((livro) => (
                <LivroItem
                  key={livro.id}
                  livro={livro}
                  onEditar={onEditar}
                  onExcluir={onExcluir}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default LivroLista;