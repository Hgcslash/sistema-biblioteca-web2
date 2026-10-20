import { useEffect, useState } from 'react';
import api from '../services/api';
import type { Permissao } from '../types/Permissao';
import { permissaoVazia } from '../types/Permissao';
import PermissaoForm from '../components/PermissaoForm';
import PermissaoLista from '../components/PermissaoLista';

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

      <PermissaoForm
        permissao={permissao}
        salvando={salvando}
        mensagem={mensagem}
        onChange={atualizarCampo}
        onSubmit={salvarPermissao}
        onCancelar={cancelarEdicao}
      />
      <PermissaoLista
        permissoes={permissoes}
        carregando={carregando}
        erro={erro}
        onEditar={editarPermissao}
        onExcluir={(id) => void excluirPermissao(id)}
        onAtualizar={() => void carregarPermissoes()}
      />
    </main>
  );
}

export default PermissoesPage;