export interface Livro {
  id?: number;
  titulo: string;
  autor: string;
  isbn: string;
  anoPublicacao: number;
  quantidade: number;
}

export const livroVazio: Livro = {
  titulo: '',
  autor: '',
  isbn: '',
  anoPublicacao: new Date().getFullYear(),
  quantidade: 1,
};