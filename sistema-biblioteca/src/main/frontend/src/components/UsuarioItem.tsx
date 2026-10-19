import type { Usuario } from '../types/Usuario';

interface UsuarioItemProps {
  usuario: Usuario;
  onEditar: (usuario: Usuario) => void;
  onExcluir: (id: number) => void;
}

function UsuarioItem({
  usuario,
  onEditar,
  onExcluir,
}: UsuarioItemProps) {
  return (
    <article className="item-lista">
      <div>
        <h3>{usuario.nome}</h3>
        <p>
          <strong>Usuário:</strong> {usuario.username}
        </p>
        <p>
          <strong>E-mail:</strong> {usuario.email}
        </p>
      </div>

      <div className="botoes">
        <button
          type="button"
          onClick={() => onEditar(usuario)}
        >
          Editar
        </button>

        <button
          type="button"
          className="secundario"
          disabled={usuario.id === undefined}
          onClick={() => {
            if (usuario.id !== undefined) {
              onExcluir(usuario.id);
            }
          }}
        >
          Excluir
        </button>
      </div>
    </article>
  );
}

export default UsuarioItem;