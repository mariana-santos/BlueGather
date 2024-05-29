package br.com.fiap.bluegather.controller;

import br.com.fiap.bluegather.dto.MomentoDTO;
import br.com.fiap.bluegather.service.MomentoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.extern.slf4j.Slf4j;

import jakarta.validation.Valid;

@RestController
@RequestMapping("momento")
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MomentoController {

    @Autowired
    private MomentoService momentoService;

    @GetMapping
    public ResponseEntity<Page<MomentoDTO>> listAll(@PageableDefault(size = 100, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        log.info("(" + getClass().getSimpleName() + ") - Buscando todos(as)");
        return ResponseEntity.ok(momentoService.listAll(pageable));
    }

    @GetMapping("{id}")
    public ResponseEntity<MomentoDTO> findById(@PathVariable Long id) {
        log.info("(" + getClass().getSimpleName() + ") - Exibindo por ID: " + id);
        return ResponseEntity.ok(momentoService.findById(id));
    }

    @PostMapping
    public ResponseEntity<MomentoDTO> create(@RequestBody @Valid MomentoDTO newData) {
        log.info("(" + getClass().getSimpleName() + ") - Cadastrando: " + newData);
        return ResponseEntity.status(HttpStatus.CREATED).body(momentoService.create(newData));
    }

    @PutMapping("{id}")
    public ResponseEntity<MomentoDTO> update(@PathVariable Long id, @RequestBody @Valid MomentoDTO updatedData) {
        log.info("(" + getClass().getSimpleName() + ") - Atualizando por ID: " + id);
        return ResponseEntity.ok(momentoService.update(id, updatedData));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        log.info("(" + getClass().getSimpleName() + ") - Deletando por ID: " + id);
        momentoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}