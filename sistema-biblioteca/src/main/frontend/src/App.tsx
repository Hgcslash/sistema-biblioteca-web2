import { useState } from 'react';
import UsuariosPage from './pages/UsuariosPage';
import LivrosPage from './pages/LivrosPage';
import PermissoesPage from './pages/PermissoesPage';
import Navegacao, { type Pagina } from './components/Navegacao';
import './App.css';

function App() {
  const [pagina, setPagina] = useState<Pagina>('usuarios');

  return (
    <>
      <Navegacao pagina={pagina} setPagina={setPagina} />

      {pagina === 'usuarios' && <UsuariosPage />}
      {pagina === 'livros' && <LivrosPage />}
      {pagina === 'permissoes' && <PermissoesPage />}
    </>
  );
}

export default App;