import { useEffect, useState } from 'react';
import api from '../services/api';
import type { Permissao } from '../types/Permissao';
import { permissaoVazia } from '../types/Permissao';

function PermissoesPage() {
  const [permissoes, setPermissoes] = useState<Permissao[]>([]);
  const [permissao, setPermissao] = useState<Permissao>({
    ...permissaoVazia,
  });
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [salvando, setSalvando] = useState(false);

  async function carregarPermissoes() {
    try {
      setCarregando(true);
      setErro('');
      const resposta = await api.get<Permissao[]>('/permissoes');
      setPermissoes(resposta.data);
    } catch {
      setErro('Não foi possível carregar as permissões. Verifique o backend.');
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    void carregarPermissoes();
  }, []);

  function atualizarCampo(campo: 'nome' | 'descricao', valor: string) {
    setPermissao((atual) => ({ ...atual, [campo]: valor }));
  }

  async function salvarPermissao(
    evento: React.FormEvent<HTMLFormElement>,
  ) {
    evento.preventDefault();

    try {
      setSalvando(true);
      setMensagem('');

      if (permissao.id !== undefined) {
        await api.put(`/permissoes/${permissao.id}`, permissao);
        setMensagem('Permissão atualizada com sucesso!');
      } else {
        await api.post('/permissoes', permissao);
        setMensagem('Permissão cadastrada com sucesso!');
      }

      setPermissao({ ...permissaoVazia });
      await carregarPermissoes();
    } catch {
      setMensagem('Erro ao salvar a permissão. Verifique os dados e a API.');
    } finally {
      setSalvando(false);
    }
  }

  function editarPermissao(item: Permissao) {
    setPermissao({ ...item });
    setMensagem('');
  }

  function cancelarEdicao() {
    setPermissao({ ...permissaoVazia });
    setMensagem('');
  }

  async function excluirPermissao(id?: number) {
    if (id === undefined) {
      setMensagem('Não foi possível identificar a permissão.');
      return;
    }

    if (!window.confirm('Deseja realmente excluir esta permissão?')) {
      return;
    }

    try {
      setMensagem('');
      await api.delete(`/permissoes/${id}`);

      if (permissao.id === id) {
        cancelarEdicao();
      }

      setMensagem('Permissão excluída com sucesso!');
      await carregarPermissoes();
    } catch {
      setMensagem('Não foi possível excluir a permissão.');
    }
  }

  return (
    <main className="container">
      <header className="cabecalho">
        <h1>🔐 Gerenciamento de permissões</h1>
        <p>Cadastre, consulte, edite e exclua permissões do sistema.</p>
      </header>

      <section className="painel">
        <h2>
          {permissao.id !== undefined
            ? 'Editar permissão'
            : 'Cadastrar permissão'}
        </h2>

        <form onSubmit={salvarPermissao}>
          <label>
            Nome
            <input
              required
              value={permissao.nome}
              onChange={(e) => atualizarCampo('nome', e.target.value)}
              placeholder="Ex.: ADMINISTRADOR"
            />
          </label>

          <label>
            Descrição
            <textarea
              required
              rows={3}
              value={permissao.descricao}
              onChange={(e) => atualizarCampo('descricao', e.target.value)}
              placeholder="Descreva a finalidade da permissão"
            />
          </label>

          <div className="botoes">
            <button type="submit" disabled={salvando}>
              {salvando
                ? 'Salvando...'
                : permissao.id !== undefined
                  ? 'Atualizar permissão'
                  : 'Cadastrar permissão'}
            </button>

            {permissao.id !== undefined && (
              <button
                type="button"
                className="secundario"
                onClick={cancelarEdicao}
              >
                Cancelar edição
              </button>
            )}
          </div>
        </form>

        {mensagem && <p className="mensagem">{mensagem}</p>}
      </section>

      <section className="painel">
        <h2>Permissões cadastradas</h2>

        {carregando ? (
          <p>Carregando permissões...</p>
        ) : erro ? (
          <p className="mensagem">{erro}</p>
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
                {permissoes.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.nome}</td>
                    <td>{item.descricao}</td>
                    <td>
                      <div className="botoes">
                        <button
                          type="button"
                          className="secundario"
                          onClick={() => editarPermissao(item)}
                        >
                          Editar
                        </button>

                        <button
                          type="button"
                          className="perigo"
                          onClick={() => void excluirPermissao(item.id)}
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <button
          type="button"
          className="secundario"
          onClick={() => void carregarPermissoes()}
        >
          Atualizar lista de permissões
        </button>
      </section>
    </main>
  );
}

export default PermissoesPage;