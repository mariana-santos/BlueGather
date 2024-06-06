import { Button } from "@components/Button";
import { Fragment } from "react";
import { STATUS_OPTIONS } from "@utils/options";
import { EventQuery, Event } from "@dtos/event";

interface UpdateStatusProps {
  modalTitle: string;
  event: Event;
  handleUpdateEvent: (body: EventQuery, id: number) => Promise<void>;
}

export default function UpdateStatus({ modalTitle, event, handleUpdateEvent }: UpdateStatusProps) {
  const handleUpdateStatus = () => {
    const idStatus = modalTitle === "Concluir" 
    ? STATUS_OPTIONS.concluded : STATUS_OPTIONS.cancelled;

    const idsVoluntarios = event.voluntarios.map(user => Number(user.id));

    const finalBodyData: EventQuery = {
      ...event,
      idStatus,
      idOrganizador: Number(event.organizador?.id) ?? null, 
      idTipoEvento: event.tipoEvento.id, 
      idsVoluntarios,
    };

    handleUpdateEvent(finalBodyData, event.id);
  };

  return(
    <Fragment>
      <Button 
        label={modalTitle} 
        size="MD" 
        onPress={handleUpdateStatus}
      />
    </Fragment>
  )
}