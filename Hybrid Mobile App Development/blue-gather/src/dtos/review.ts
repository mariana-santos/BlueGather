export interface ReviewQuery {
    idCotacao: number;
    data: string;
    notaEntrega: number;
    notaQualidade: number;
    notaPreco: number;
    descricao: string;
}

export interface Review {
    id: number;
    data: string;
    notaEntrega: number;
    notaQualidade: number;
    notaPreco: number;
    descricao: string;
}
