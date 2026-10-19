import type { Usuario } from '../types/Usuario';
import UsuarioItem from './UsuarioItem';

interface UsuarioListaProps {
  usuarios: Usuario[];
  carregando: boolean;
  erro: string;
  onEditar: (usuario: Usuario) => void;
  onExcluir: (id: number) => void;
}

function UsuarioLista({
  usuarios,
  carregando,
  erro,
  onEditar,
  onExcluir,
}: UsuarioListaProps) {
  if (carregando) {
    return <p>Carregando usuários...</p>;
  }

  if (erro) {
    return <p className="mensagem">{erro}</p>;
  }

  if (usuarios.length === 0) {
    return <p>Nenhum usuário cadastrado.</p>;
  }

  return (
    <div className="lista-usuarios">
      {usuarios.map((usuario) => (
        <UsuarioItem
          key={usuario.id}
          usuario={usuario}
          onEditar={onEditar}
          onExcluir={onExcluir}
        />
      ))}
    </div>
  );
}

export default UsuarioLista;