import type { Dispatch, SetStateAction } from 'react';

export type Pagina = 'usuarios' | 'livros' | 'permissoes';

interface NavegacaoProps {
  pagina: Pagina;
  setPagina: Dispatch<SetStateAction<Pagina>>;
}

function Navegacao({ pagina, setPagina }: NavegacaoProps) {
  return (
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
  );
}

export default Navegacao;