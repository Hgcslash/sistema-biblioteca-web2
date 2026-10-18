import { useEffect, useState } from 'react';
import api from './services/api';
import type { Usuario } from './types/Usuario';
import './App.css';

interface Livro {
  id?: number;
  titulo: string;
  autor: string;
  isbn: string;
  anoPublicacao: number;
  quantidade: number;
}

const livroVazio: Livro = {
  titulo: '',
  autor: '',
  isbn: '',
  anoPublicacao: new Date().getFullYear(),
  quantidade: 1,
};

function App() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [livro, setLivro] = useState<Livro>(livroVazio);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [carregandoUsuarios, setCarregandoUsuarios] = useState(false);
  const [erroUsuarios, setErroUsuarios] = useState('');

  async function carregarLivros() {
    try {
      setCarregando(true);
      const resposta = await api.get<Livro[]>('/livros');
      setLivros(resposta.data);
    } catch {
      setMensagem('Não foi possível carregar os livros. Verifique o backend.');
    } finally {
      setCarregando(false);
    }
  }

  async function carregarUsuarios() {
    try {
      setCarregandoUsuarios(true);
      setErroUsuarios('');
      const resposta = await api.get<Usuario[]>('/usuarios');
      setUsuarios(resposta.data);
    } catch {
      setErroUsuarios('Não foi possível carregar os usuários. Verifique o backend.');
    } finally {
      setCarregandoUsuarios(false);
    }
  }

  useEffect(() => {
    carregarLivros();
    carregarUsuarios();
  }, []);

  function atualizarCampo(campo: keyof Livro, valor: string) {
    setLivro((atual) => ({
      ...atual,
      [campo]:
        campo === 'anoPublicacao' || campo === 'quantidade'
          ? Number(valor)
          : valor,
    }));
  }

  async function salvarLivro(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    try {
      if (livro.id) {
        await api.put(`/livros/${livro.id}`, livro);
        setMensagem('Livro atualizado com sucesso!');
      } else {
        await api.post('/livros', livro);
        setMensagem('Livro cadastrado com sucesso!');
      }

      setLivro({ ...livroVazio });
      await carregarLivros();
    } catch {
      setMensagem('Erro ao salvar o livro. Verifique os dados e a API.');
    }
  }

  function editarLivro(item: Livro) {
    setLivro({ ...item });
    setMensagem('');
  }

  async function excluirLivro(id?: number) {
    if (id === undefined) return;
    if (!window.confirm('Deseja realmente excluir este livro?')) return;

    try {
      await api.delete(`/livros/${id}`);
      setMensagem('Livro excluído com sucesso!');
      await carregarLivros();
    } catch {
      setMensagem('Não foi possível excluir o livro.');
    }
  }

  function cancelarEdicao() {
    setLivro({ ...livroVazio });
    setMensagem('');
  }

  return (
    <main className="container">
      <header className="cabecalho">
        <h1>📚 Sistema de Biblioteca</h1>
        <p>Cadastro e gerenciamento do acervo</p>
      </header>

      <section className="painel">
        <h2>{livro.id ? 'Editar livro' : 'Cadastrar livro'}</h2>

        <form onSubmit={salvarLivro}>
          <label>
            Título
            <input
              required
              value={livro.titulo}
              onChange={(e) => atualizarCampo('titulo', e.target.value)}
              placeholder="Título do livro"
            />
          </label>

          <label>
            Autor
            <input
              required
              value={livro.autor}
              onChange={(e) => atualizarCampo('autor', e.target.value)}
              placeholder="Nome do autor"
            />
          </label>

          <label>
            ISBN
            <input
              required
              value={livro.isbn}
              onChange={(e) => atualizarCampo('isbn', e.target.value)}
              placeholder="Código ISBN"
            />
          </label>

          <div className="linha">
            <label>
              Ano de publicação
              <input
                required
                type="number"
                min="1"
                value={livro.anoPublicacao}
                onChange={(e) => atualizarCampo('anoPublicacao', e.target.value)}
              />
            </label>

            <label>
              Quantidade
              <input
                required
                type="number"
                min="0"
                value={livro.quantidade}
                onChange={(e) => atualizarCampo('quantidade', e.target.value)}
              />
            </label>
          </div>

          <div className="botoes">
            <button type="submit">
              {livro.id ? 'Atualizar livro' : 'Cadastrar livro'}
            </button>

            {livro.id && (
              <button type="button" className="secundario" onClick={cancelarEdicao}>
                Cancelar
              </button>
            )}
          </div>
        </form>

        {mensagem && <p className="mensagem">{mensagem}</p>}
      </section>

      <section className="painel">
        <h2>Acervo de livros</h2>

        {carregando ? (
          <p>Carregando livros...</p>
        ) : livros.length === 0 ? (
          <p>Nenhum livro cadastrado.</p>
        ) : (
          <div className="tabela-container">
            <table>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Autor</th>
                  <th>ISBN</th>
                  <th>Ano</th>
                  <th>Qtd.</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {livros.map((item) => (
                  <tr key={item.id}>
                    <td>{item.titulo}</td>
                    <td>{item.autor}</td>
                    <td>{item.isbn}</td>
                    <td>{item.anoPublicacao}</td>
                    <td>{item.quantidade}</td>
                    <td>
                      <div className="acoes">
                        <button onClick={() => editarLivro(item)}>Editar</button>
                        <button
                          className="perigo"
                          onClick={() => excluirLivro(item.id)}
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
      </section>

      <section className="painel">
        <h2>Usuários cadastrados</h2>

        {carregandoUsuarios ? (
          <p>Carregando usuários...</p>
        ) : erroUsuarios ? (
          <p className="mensagem">{erroUsuarios}</p>
        ) : usuarios.length === 0 ? (
          <p>Nenhum usuário cadastrado.</p>
        ) : (
          <div className="tabela-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Nome de usuário</th>
                  <th>E-mail</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.nome}</td>
                    <td>{usuario.username}</td>
                    <td>{usuario.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <button type="button" className="secundario" onClick={carregarUsuarios}>
          Atualizar lista de usuários
        </button>
      </section>
    </main>
  );
}

export default App;
