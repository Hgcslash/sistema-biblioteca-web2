import type { Permissao } from '../types/Permissao';

interface PermissaoItemProps {
  permissao: Permissao;
  onEditar: (permissao: Permissao) => void;
  onExcluir: (id?: number) => void;
}

function PermissaoItem({
  permissao,
  onEditar,
  onExcluir,
}: PermissaoItemProps) {
  return (
    <tr>
      <td>{permissao.id}</td>
      <td>{permissao.nome}</td>
      <td>{permissao.descricao}</td>
      <td>
        <div className="botoes">
          <button
            type="button"
            className="secundario"
            onClick={() => onEditar(permissao)}
          >
            Editar
          </button>

          <button
            type="button"
            className="perigo"
            onClick={() => onExcluir(permissao.id)}
          >
            Excluir
          </button>
        </div>
      </td>
    </tr>
  );
}

export default PermissaoItem;