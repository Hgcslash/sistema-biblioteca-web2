import { useEffect, useState } from 'react';
import api from '../services/api';
import type { Livro } from '../types/Livro';
import { livroVazio } from '../types/Livro';

function LivrosPage() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [livro, setLivro] = useState<Livro>({ ...livroVazio });
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [salvando, setSalvando] = useState(false);

  async function carregarLivros() {
    try {
      setCarregando(true);
      setErro('');
      const resposta = await api.get<Livro[]>('/livros');
      setLivros(resposta.data);
    } catch {
      setErro('Não foi possível carregar os livros. Verifique o backend.');
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    void carregarLivros();
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
      setSalvando(true);
      setMensagem('');

      if (livro.id !== undefined) {
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
    } finally {
      setSalvando(false);
    }
  }

  function editarLivro(item: Livro) {
    setLivro({ ...item });
    setMensagem('');
  }

  function cancelarEdicao() {
    setLivro({ ...livroVazio });
    setMensagem('');
  }

  async function excluirLivro(id?: number) {
    if (id === undefined) {
      setMensagem('Não foi possível identificar o livro.');
      return;
    }

    if (!window.confirm('Deseja realmente excluir este livro?')) {
      return;
    }

    try {
      setMensagem('');
      await api.delete(`/livros/${id}`);
      setMensagem('Livro excluído com sucesso!');
      if (livro.id === id) {
        cancelarEdicao();
      }
      await carregarLivros();
    } catch {
      setMensagem('Não foi possível excluir o livro.');
    }
  }

  return (
    <main className="container">
      <header className="cabecalho">
        <h1>📚 Gerenciamento de livros</h1>
        <p>Cadastre, consulte, edite e exclua livros do acervo.</p>
      </header>

      <section className="painel">
        <h2>
          {livro.id !== undefined ? 'Editar livro' : 'Cadastrar livro'}
        </h2>

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
              onChange={(e) =>
                atualizarCampo('anoPublicacao', e.target.value)
              }
            />
          </label>

          <label>
            Quantidade
            <input
              required
              type="number"
              min={0}
              value={livro.quantidade}
              onChange={(e) => atualizarCampo('quantidade', e.target.value)}
            />
          </label>

          <div className="botoes">
            <button type="submit" disabled={salvando}>
              {salvando
                ? 'Salvando...'
                : livro.id !== undefined
                  ? 'Atualizar livro'
                  : 'Cadastrar livro'}
            </button>

            {livro.id !== undefined && (
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
        <h2>Acervo de livros</h2>

        {carregando ? (
          <p>Carregando livros...</p>
        ) : erro ? (
          <p className="mensagem">{erro}</p>
        ) : livros.length === 0 ? (
          <p>Nenhum livro cadastrado.</p>
        ) : (
          <div className="tabela-container">
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
                {livros.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.titulo}</td>
                    <td>{item.autor}</td>
                    <td>{item.isbn}</td>
                    <td>{item.anoPublicacao}</td>
                    <td>{item.quantidade}</td>
                    <td>
                      <div className="botoes">
                        <button
                          type="button"
                          className="secundario"
                          onClick={() => editarLivro(item)}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="perigo"
                          onClick={() => void excluirLivro(item.id)}
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
          onClick={() => void carregarLivros()}
        >
          Atualizar lista de livros
        </button>
      </section>
    </main>
  );
}

export default LivrosPage;