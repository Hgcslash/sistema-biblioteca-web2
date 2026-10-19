import { useEffect, useState } from 'react';
import api from '../services/api';
import type { Usuario } from '../types/Usuario';
import type { NovoUsuario } from '../types/NovoUsuario';
import { usuarioVazio } from '../types/NovoUsuario';
import UsuarioForm from '../components/UsuarioForm';
import UsuarioLista from '../components/UsuarioLista';

function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [novoUsuario, setNovoUsuario] = useState<NovoUsuario>({
    ...usuarioVazio,
  });
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [editandoId, setEditandoId] = useState<number | null>(null);

  async function carregarUsuarios() {
    try {
      setCarregando(true);
      setErro('');
      const resposta = await api.get<Usuario[]>('/usuarios');
      setUsuarios(resposta.data);
    } catch {
      setErro('Não foi possível carregar os usuários. Verifique o backend.');
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    void carregarUsuarios();
  }, []);

  function atualizarCampo(campo: keyof NovoUsuario, valor: string) {
    setNovoUsuario((atual) => ({ ...atual, [campo]: valor }));
  }

  async function salvarUsuario(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    try {
      setSalvando(true);
      setMensagem('');

      if (editandoId !== null) {
        await api.put(`/usuarios/${editandoId}`, novoUsuario);
        setMensagem('Usuário atualizado com sucesso!');
      } else {
        await api.post('/usuarios', novoUsuario);
        setMensagem('Usuário cadastrado com sucesso!');
      }

      setEditandoId(null);
      setNovoUsuario({ ...usuarioVazio });
      await carregarUsuarios();
    } catch {
      setMensagem(
        editandoId !== null
          ? 'Erro ao atualizar usuário. Verifique os dados e a API.'
          : 'Erro ao cadastrar usuário. Verifique os dados e a API.',
      );
    } finally {
      setSalvando(false);
    }
  }

  function editarUsuario(usuario: Usuario) {
    setEditandoId(usuario.id ?? null);
    setNovoUsuario({
      nome: usuario.nome,
      username: usuario.username,
      senha: '',
      email: usuario.email,
    });
    setMensagem('');
  }

  function cancelarEdicao() {
    setEditandoId(null);
    setNovoUsuario({ ...usuarioVazio });
    setMensagem('');
  }

  async function excluirUsuario(id?: number) {
    if (id === undefined) {
      setMensagem('Não foi possível identificar o usuário.');
      return;
    }

    if (!window.confirm('Tem certeza de que deseja excluir este usuário?')) {
      return;
    }

    try {
      setMensagem('');
      await api.delete(`/usuarios/${id}`);

      if (editandoId === id) {
        cancelarEdicao();
      }

      setMensagem('Usuário excluído com sucesso!');
      await carregarUsuarios();
    } catch {
      setMensagem('Erro ao excluir usuário. Verifique a API e tente novamente.');
    }
  }

  return (
    <main className="container">
      <header className="cabecalho">
        <h1>👥 Gerenciamento de usuários</h1>
        <p>Cadastre, consulte, edite e exclua usuários do sistema.</p>
      </header>

      <UsuarioForm
  usuario={novoUsuario}
  editando={editandoId !== null}
  salvando={salvando}
  mensagem={mensagem}
  onChange={atualizarCampo}
  onSubmit={salvarUsuario}
  onCancelar={cancelarEdicao}
/>

      <section className="painel">
  <h2>Usuários cadastrados</h2>

  <UsuarioLista
    usuarios={usuarios}
    carregando={carregando}
    erro={erro}
    onEditar={editarUsuario}
    onExcluir={(id) => void excluirUsuario(id)}
  />

  <button
    type="button"
    className="secundario"
    onClick={() => void carregarUsuarios()}
  >
    Atualizar lista de usuários
  </button>
</section>
    </main>
  );
}

export default UsuariosPage;