package br.com.fiap.bluegather.dto;

import jakarta.validation.constraints.*;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AvaliacaoDTO {
    private Long id;

    @NotNull(message = "O campo idEvento não pode estar vazio.")
    private Long idEvento;

    @NotNull(message = "O campo idAvaliador não pode estar vazio.")
    private Long idAvaliador;

    @Positive
    @Min(1) @Max(5)
    @NotNull(message = "O campo nota não pode estar vazio.")
    private Long nota;
}