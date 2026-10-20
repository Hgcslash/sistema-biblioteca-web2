import type { FormEvent } from 'react';
import type { Livro } from '../types/Livro';

interface LivroFormProps {
  livro: Livro;
  editando: boolean;
  salvando: boolean;
  mensagem: string;
  onChange: (campo: keyof Livro, valor: string) => void;
  onSubmit: (evento: FormEvent<HTMLFormElement>) => void;
  onCancelar: () => void;
}

function LivroForm({
  livro,
  editando,
  salvando,
  mensagem,
  onChange,
  onSubmit,
  onCancelar,
}: LivroFormProps) {
  return (
    <section className="painel">
      <h2>{editando ? 'Editar livro' : 'Cadastrar livro'}</h2>

      <form onSubmit={onSubmit}>
        <label>
          Título
          <input
            required
            value={livro.titulo}
            onChange={(e) => onChange('titulo', e.target.value)}
            placeholder="Título do livro"
          />
        </label>

        <label>
          Autor
          <input
            required
            value={livro.autor}
            onChange={(e) => onChange('autor', e.target.value)}
            placeholder="Nome do autor"
          />
        </label>

        <label>
          ISBN
          <input
            required
            value={livro.isbn}
            onChange={(e) => onChange('isbn', e.target.value)}
            placeholder="ISBN do livro"
          />
        </label>

        <label>
          Ano de publicação
          <input
            required
            type="number"
            min={1}
            value={livro.anoPublicacao}
            onChange={(e) => onChange('anoPublicacao', e.target.value)}
          />
        </label>

        <label>
          Quantidade
          <input
            required
            type="number"
            min={0}
            value={livro.quantidade}
            onChange={(e) => onChange('quantidade', e.target.value)}
          />
        </label>

        <div className="botoes">
          <button type="submit" disabled={salvando}>
            {salvando
              ? 'Salvando...'
              : editando
                ? 'Atualizar livro'
                : 'Cadastrar livro'}
          </button>

          {editando && (
            <button
              type="button"
              className="secundario"
              onClick={onCancelar}
            >
              Cancelar edição
            </button>
          )}
        </div>
      </form>

      {mensagem && <p className="mensagem">{mensagem}</p>}
    </section>
  );
}

export default LivroForm;