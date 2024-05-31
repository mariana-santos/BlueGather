package br.com.fiap.bluegather.dto;

import jakarta.validation.constraints.*;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MomentoDTO {
    private Long id;
    
    @NotBlank(message = "O campo nome não pode estar vazio.")
    private String nome;
}