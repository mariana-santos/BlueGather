package br.com.fiap.bluegather.dto;

import lombok.*;

import java.util.Date;
import java.util.Set;

import br.com.fiap.bluegather.model.Imagem;
import br.com.fiap.bluegather.model.Status;
import br.com.fiap.bluegather.model.TipoEvento;
import br.com.fiap.bluegather.model.Usuario;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventoResponse {
    private Long id;

    private String titulo;

    private String latitude;

    private String longitude;

    private Date dataInicio;

    private Date dataFim;

    private String descricao;

    private Long urgencia;

    private Usuario organizador;

    private TipoEvento tipoEvento;

    private Status status;

    private Set<Usuario> voluntarios;

    private Set<Imagem> imagens;
}
