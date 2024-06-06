export interface ReviewQuery {
    idEvento: number;
    idAvaliador: number;
    nota: number;
}

export interface Review {
    id: number;
    idEvento: number;
    idAvaliador: number;
    nota: number;
}
