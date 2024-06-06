import { Status } from "./status";
import { TipoEvento } from "./tipoEvento";
import { User } from "./user";
import { Image } from "./image";

export interface Event {
  id: number;
  titulo: string;
  latitude: string;
  longitude: string;
  dataInicio: string | null;
  dataFim: string | null;
  descricao: string | null;
  urgencia: number | null;
  organizador: User | null;
  tipoEvento: TipoEvento;
  status: Status;
  voluntarios: User[];
  imagens: Image[];
}

export interface EventQuery {
  id: number;
  titulo: string;
  latitude: string;
  longitude: string;
  dataInicio: string | null;
  dataFim: string | null;
  descricao: string | null;
  urgencia: number | null;
  idOrganizador: number | null;
  idTipoEvento: number;
  idStatus: number;
  idsVoluntarios: number[];
}
