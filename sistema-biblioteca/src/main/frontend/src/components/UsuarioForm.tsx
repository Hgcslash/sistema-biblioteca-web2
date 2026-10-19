import type { FormEvent } from 'react';
import type { NovoUsuario } from '../types/NovoUsuario';

interface UsuarioFormProps {
  usuario: NovoUsuario;
  editando: boolean;
  salvando: boolean;
  mensagem: string;
  onChange: (campo: keyof NovoUsuario, valor: string) => void;
  onSubmit: (evento: FormEvent<HTMLFormElement>) => void;
  onCancelar: () => void;
}

function UsuarioForm({
  usuario,
  editando,
  salvando,
  mensagem,
  onChange,
  onSubmit,
  onCancelar,
}: UsuarioFormProps) {
  return (
    <section className="painel">
      <h2>{editando ? 'Editar usuário' : 'Cadastrar usuário'}</h2>

      <form onSubmit={onSubmit}>
        <label>
          Nome completo
          <input
            required
            value={usuario.nome}
            onChange={(e) => onChange('nome', e.target.value)}
            placeholder="Digite o nome completo"
          />
        </label>

        <label>
          Nome de usuário
          <input
            required
            value={usuario.username}
            onChange={(e) => onChange('username', e.target.value)}
            placeholder="Digite o nome de usuário"
          />
        </label>

        <label>
          Senha
          <input
            required={!editando}
            type="password"
            minLength={6}
            value={usuario.senha}
            onChange={(e) => onChange('senha', e.target.value)}
            placeholder={
              editando
                ? 'Deixe vazio para manter a senha atual'
                : 'Mínimo de 6 caracteres'
            }
          />
        </label>

        <label>
          E-mail
          <input
            required
            type="email"
            value={usuario.email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="Digite o e-mail"
          />
        </label>

        <div className="botoes">
          <button type="submit" disabled={salvando}>
            {salvando
              ? 'Salvando...'
              : editando
                ? 'Atualizar usuário'
                : 'Cadastrar usuário'}
          </button>

          {editando && (
            <button
              type="button"
              className="secundario"
              onClick={onCancelar}
            >
              Cancelar edição
            </button>
          )}
        </div>
      </form>

      {mensagem && <p className="mensagem">{mensagem}</p>}
    </section>
  );
}

export default UsuarioForm;