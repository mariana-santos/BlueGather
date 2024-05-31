export interface User {
  id: string;
  nome: string;
  email: string;
  senha: string;
  urlImagem?: string;
}

export interface UserQuery {
  nome: string;
  email: string;
  senha: string;
  urlImagem?: string;
}
