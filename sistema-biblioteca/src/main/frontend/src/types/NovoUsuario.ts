export interface NovoUsuario {
  nome: string;
  username: string;
  senha: string;
  email: string;
}

export const usuarioVazio: NovoUsuario = {
  nome: '',
  username: '',
  senha: '',
  email: '',
};
