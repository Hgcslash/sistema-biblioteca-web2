import type { Livro } from '../types/Livro';

interface LivroItemProps {
  livro: Livro;
  onEditar: (livro: Livro) => void;
  onExcluir: (id?: number) => void;
}

function LivroItem({ livro, onEditar, onExcluir }: LivroItemProps) {
  return (
    <tr>
      <td>{livro.id}</td>
      <td>{livro.titulo}</td>
      <td>{livro.autor}</td>
      <td>{livro.isbn}</td>
      <td>{livro.anoPublicacao}</td>
      <td>{livro.quantidade}</td>
      <td>
        <div className="botoes">
          <button
            type="button"
            className="secundario"
            onClick={() => onEditar(livro)}
          >
            Editar
          </button>

          <button
            type="button"
            className="perigo"
            onClick={() => onExcluir(livro.id)}
          >
            Excluir
          </button>
        </div>
      </td>
    </tr>
  );
}

export default LivroItem;