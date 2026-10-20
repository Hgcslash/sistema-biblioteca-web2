import type { Permissao } from '../types/Permissao';
import PermissaoItem from './PermissaoItem';

interface PermissaoListaProps {
  permissoes: Permissao[];
  carregando: boolean;
  erro: string;
  onEditar: (permissao: Permissao) => void;
  onExcluir: (id?: number) => void;
  onAtualizar: () => void;
}

function PermissaoLista({
  permissoes,
  carregando,
  erro,
  onEditar,
  onExcluir,
  onAtualizar,
}: PermissaoListaProps) {
  return (
    <section className="painel">
      <div className="cabecalho-lista">
        <h2>Permissões cadastradas</h2>

        <button
          type="button"
          className="secundario"
          onClick={onAtualizar}
          disabled={carregando}
        >
          {carregando ? 'Atualizando...' : 'Atualizar lista'}
        </button>
      </div>

      {erro ? (
        <p className="mensagem">{erro}</p>
      ) : carregando ? (
        <p>Carregando permissões...</p>
      ) : permissoes.length === 0 ? (
        <p>Nenhuma permissão cadastrada.</p>
      ) : (
        <div className="tabela-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {permissoes.map((permissao) => (
                <PermissaoItem
                  key={permissao.id}
                  permissao={permissao}
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

export default PermissaoLista;