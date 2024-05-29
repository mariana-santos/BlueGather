package br.com.fiap.bluegather.service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;

import br.com.fiap.bluegather.dto.Token;
import br.com.fiap.bluegather.model.Usuario;
import br.com.fiap.bluegather.repository.UsuarioRepository;

@Service
public class TokenService {
    
    @Autowired
    UsuarioRepository usuarioRepository;

    public Token generateToken(String email){
        Algorithm alg = Algorithm.HMAC512("secretbluegather");
        var jwt = JWT.create()
            .withIssuer("BlueGather")
            .withSubject(email)
            .withExpiresAt(Instant.now().plus(7, ChronoUnit.DAYS))
            .sign(alg);
    
        return new Token(jwt, "JWT", "Bearer");
    }

    public Usuario validateToken(String token){
        Algorithm alg = Algorithm.HMAC512("secretbluegather");
        String email = JWT.require(alg)
            .withIssuer("BlueGather")
            .build()
            .verify(token)
            .getSubject();

        return usuarioRepository
            .findByEmail(email)
            .orElseThrow(() -> new JWTVerificationException("Erro na validação do Token."));
    }
}