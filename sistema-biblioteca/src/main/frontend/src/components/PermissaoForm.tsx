import type { FormEvent } from 'react';
import type { Permissao } from '../types/Permissao';

interface PermissaoFormProps {
  permissao: Permissao;
  salvando: boolean;
  mensagem: string;
  onChange: (campo: 'nome' | 'descricao', valor: string) => void;
  onSubmit: (evento: FormEvent<HTMLFormElement>) => void;
  onCancelar: () => void;
}

function PermissaoForm({
  permissao,
  salvando,
  mensagem,
  onChange,
  onSubmit,
  onCancelar,
}: PermissaoFormProps) {
  const editando = permissao.id !== undefined;

  return (
    <section className="painel">
      <h2>{editando ? 'Editar permissão' : 'Cadastrar permissão'}</h2>

      <form onSubmit={onSubmit}>
        <label>
          Nome
          <input
            required
            value={permissao.nome}
            onChange={(e) => onChange('nome', e.target.value)}
            placeholder="Ex.: ADMINISTRADOR"
          />
        </label>

        <label>
          Descrição
          <textarea
            required
            rows={3}
            value={permissao.descricao}
            onChange={(e) => onChange('descricao', e.target.value)}
            placeholder="Descreva a finalidade da permissão"
          />
        </label>

        <div className="botoes">
          <button type="submit" disabled={salvando}>
            {salvando
              ? 'Salvando...'
              : editando
                ? 'Atualizar permissão'
                : 'Cadastrar permissão'}
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

export default PermissaoForm;