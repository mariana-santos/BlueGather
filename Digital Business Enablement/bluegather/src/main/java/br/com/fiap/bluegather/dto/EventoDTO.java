package br.com.fiap.bluegather.dto;

import jakarta.validation.constraints.*;

import lombok.*;

import java.util.Date;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventoDTO {
    private Long id;

    @NotBlank(message = "O campo titulo não pode estar vazio.")
    private String titulo;

    @NotNull(message = "O campo latitude não pode estar vazio.")
    private String latitude;

    @NotNull(message = "O campo longitude não pode estar vazio.")
    private String longitude;

    @FutureOrPresent(message = "A dataInicio deve ser no presente ou no futuro.")
    private Date dataInicio;

    @Future(message = "A dataFim deve ser no futuro.")
    private Date dataFim;

    private String descricao;

    @Positive
    @Min(1) @Max(5)
    @NotNull(message = "O campo urgencia não pode estar vazio.")
    private Long urgencia;

    private Long idOrganizador;

    @NotNull(message = "O campo idTipoEvento não pode estar vazio.")
    private Long idTipoEvento;

    @NotNull(message = "O campo idStatus não pode estar vazio.")
    private Long idStatus;

    private Set<Long> idsVoluntarios;
}
