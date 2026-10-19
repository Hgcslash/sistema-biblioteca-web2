export interface Permissao {
  id?: number;
  nome: string;
  descricao: string;
}

export const permissaoVazia: Permissao = {
  nome: '',
  descricao: '',
};