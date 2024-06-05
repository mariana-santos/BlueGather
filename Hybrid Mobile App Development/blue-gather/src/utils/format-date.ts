import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatDate = (date: string | undefined | null, extense?: boolean) => {
  if (!date) return;

  const formatType = extense ? "dd/MM 'às' HH'h'mm" : "dd/MM/yy"

  const parsedDate = parseISO(date);
  
  return format(parsedDate, formatType, {
    locale: ptBR,
  });
}