import { useState } from 'react';
import UsuariosPage from './pages/UsuariosPage';
import LivrosPage from './pages/LivrosPage';
import PermissoesPage from './pages/PermissoesPage';
import './App.css';

type Pagina = 'usuarios' | 'livros' | 'permissoes';

function App() {
  const [pagina, setPagina] = useState<Pagina>('usuarios');

  return (
    <>
      <nav className="navegacao">
        <button
          type="button"
          className={pagina === 'usuarios' ? 'ativo' : 'secundario'}
          onClick={() => setPagina('usuarios')}
        >
          Usuários
        </button>

        <button
          type="button"
          className={pagina === 'livros' ? 'ativo' : 'secundario'}
          onClick={() => setPagina('livros')}
        >
          Livros
        </button>

        <button
          type="button"
          className={pagina === 'permissoes' ? 'ativo' : 'secundario'}
          onClick={() => setPagina('permissoes')}
        >
          Permissões
        </button>
      </nav>

      {pagina === 'usuarios' && <UsuariosPage />}
      {pagina === 'livros' && <LivrosPage />}
      {pagina === 'permissoes' && <PermissoesPage />}
    </>
  );
}

export default App;