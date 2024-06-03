package br.com.fiap.bluegather.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AvaliacaoResumoDTO {
    private Long idEvento;
    private Long qtdAvaliadores;
    private Double mediaNota;
}