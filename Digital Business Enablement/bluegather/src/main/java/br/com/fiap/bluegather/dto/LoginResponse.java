package br.com.fiap.bluegather.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private UsuarioDTO usuario;
    private String token;
}