import { useEffect, useState } from 'react';
import api from '../services/api';
import type { Livro } from '../types/Livro';
import { livroVazio } from '../types/Livro';
import LivroForm from '../components/LivroForm';
import LivroLista from '../components/LivroLista';

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

      <LivroForm
  livro={livro}
  editando={livro.id !== undefined}
  salvando={salvando}
  mensagem={mensagem}
  onChange={atualizarCampo}
  onSubmit={salvarLivro}
  onCancelar={cancelarEdicao}
/>

      <LivroLista
        livros={livros}
        carregando={carregando}
        erro={erro}
        onEditar={editarLivro}
        onExcluir={(id) => void excluirLivro(id)}
        onAtualizar={() => void carregarLivros()}
      />
    </main>
  );
}

export default LivrosPage;