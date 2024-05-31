package br.com.fiap.bluegather.dto;

import jakarta.validation.constraints.*;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ImagemDTO {
    private Long id;
    
    @NotNull(message = "O campo idEvento não pode estar vazio.")
    private Long idEvento;

    @NotNull(message = "O campo idMomento não pode estar vazio.")
    private Long idMomento;

    @NotNull(message = "O campo urlImagem não pode estar vazio.")
    private String urlImagem;
}