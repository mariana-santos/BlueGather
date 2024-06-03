package br.com.fiap.bluegather.controller;

import br.com.fiap.bluegather.dto.Credenciais;
import br.com.fiap.bluegather.dto.Token;
import br.com.fiap.bluegather.service.TokenService;
import br.com.fiap.bluegather.dto.LoginResponse;
import br.com.fiap.bluegather.dto.UsuarioDTO;
import br.com.fiap.bluegather.service.UsuarioService;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import lombok.extern.slf4j.Slf4j;

import jakarta.validation.Valid;

@RestController
@RequestMapping("usuario")
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    TokenService tokenService;

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    PasswordEncoder passwordEncoder;

    @GetMapping
    public ResponseEntity<Page<UsuarioDTO>> listAll(@PageableDefault(size = 100, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        log.info("(" + getClass().getSimpleName() + ") - Buscando todos(as)");
        return ResponseEntity.ok(usuarioService.listAll(pageable));
    }

    @GetMapping("{id}")
    public ResponseEntity<UsuarioDTO> findById(@PathVariable Long id) {
        log.info("(" + getClass().getSimpleName() + ") - Exibindo por ID: " + id);
        return ResponseEntity.ok(usuarioService.findById(id));
    }

    @PostMapping
    public ResponseEntity<UsuarioDTO> create(@RequestBody @Valid UsuarioDTO newData) {
        log.info("(" + getClass().getSimpleName() + ") - Cadastrando: " + newData);
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioService.create(newData));
    }

    @PutMapping("{id}")
    public ResponseEntity<UsuarioDTO> update(@PathVariable Long id, @RequestBody @Valid UsuarioDTO updatedData) {
        log.info("(" + getClass().getSimpleName() + ") - Atualizando por ID: " + id);
        return ResponseEntity.ok(usuarioService.update(id, updatedData));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        log.info("(" + getClass().getSimpleName() + ") - Deletando por ID: " + id);
        usuarioService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/evento/{eventoId}")
    public ResponseEntity<Set<UsuarioDTO>> findByEventoId(@PathVariable Long eventoId) {
        log.info("(" + getClass().getSimpleName() + ") - Buscando usuarios por ID do evento: " + eventoId);
        Set<UsuarioDTO> list = usuarioService.findByEventoId(eventoId);
        return ResponseEntity.ok(list);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody Credenciais credenciais) {
        log.info("(" + getClass().getSimpleName() + ") - Validando Credenciais: " + credenciais);
        authManager.authenticate(credenciais.toAuthentication());
        
        UsuarioDTO usuario = usuarioService.findByEmail(credenciais.email());        
        Token tokenEntity = tokenService.generateToken(credenciais.email());
        String tokenString = tokenEntity.token();

        LoginResponse response = new LoginResponse(usuario, tokenString);
        
        return ResponseEntity.ok(response);
    }
}