package br.com.fiap.bluegather.dto;

import jakarta.validation.constraints.*;

import lombok.*;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioDTO {
    private Long id;

    @NotNull(message = "O campo cpf não pode estar vazio.")
    private String cpf;

    @NotNull(message = "O campo nome não pode estar vazio.")
    private String nome;

    private String urlImagem;

    @Email(message = "Endereço de e-mail inválido.")
    @NotBlank(message = "O campo email não pode estar vazio.")
    private String email;

    @NotBlank(message = "O campo senha não pode estar vazio.")
    private String senha;

    private Set<Long> idsEventos;        
}