export interface Image {
  id: number;
  idEvento: number;
  idMomento: number;
  urlImagem: string;
}

export interface ImageQuery {
  idEvento: number;
  idMomento: number;
  urlImagem: string;
}