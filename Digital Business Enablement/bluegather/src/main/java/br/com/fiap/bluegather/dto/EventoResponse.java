package br.com.fiap.bluegather.dto;

import lombok.*;

import java.util.Date;
import java.util.Set;

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

    private UsuarioDTO organizador;

    private TipoEventoDTO tipoEvento;

    private StatusDTO status;

    private Set<UsuarioDTO> voluntarios;

    private Set<ImagemDTO> imagens;
}