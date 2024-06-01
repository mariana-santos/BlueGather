import { Status } from "./status";
import { TipoEvento } from "./tipoEvento";
import { User } from "./user";

export interface Event {
  id: number;
  titulo: string;
  latitude: string;
  longitude: string;
  dataInicio: string;
  dataFim: string;
  descricao: string;
  urgencia: number;
  organizador: User;
  tipoEvento: TipoEvento;
  status: Status;
  voluntarios: User[];
}

export interface EventQuery {
  titulo: string;
  latitude: string;
  longitude: string;
  dataInicio: string;
  dataFim: string;
  descricao: string;
  urgencia: number;
  organizador: User;
  tipoEvento: TipoEvento;
  status: Status;
  voluntarios: User[];
}
