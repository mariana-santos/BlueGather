package br.com.fiap.bluegather.controller;

import br.com.fiap.bluegather.dto.EventoDTO;
import br.com.fiap.bluegather.service.EventoService;

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
@RequestMapping("evento")
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EventoController {

    @Autowired
    private EventoService eventoService;

    @GetMapping
    public ResponseEntity<Page<EventoDTO>> listAll(@PageableDefault(size = 100, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        log.info("(" + getClass().getSimpleName() + ") - Buscando todos(as)");
        return ResponseEntity.ok(eventoService.listAll(pageable));
    }

    @GetMapping("{id}")
    public ResponseEntity<EventoDTO> findById(@PathVariable Long id) {
        log.info("(" + getClass().getSimpleName() + ") - Exibindo por ID: " + id);
        return ResponseEntity.ok(eventoService.findById(id));
    }

    @PostMapping
    public ResponseEntity<EventoDTO> create(@RequestBody @Valid EventoDTO newData) {
        log.info("(" + getClass().getSimpleName() + ") - Cadastrando: " + newData);
        return ResponseEntity.status(HttpStatus.CREATED).body(eventoService.create(newData));
    }

    @PutMapping("{id}")
    public ResponseEntity<EventoDTO> update(@PathVariable Long id, @RequestBody @Valid EventoDTO updatedData) {
        log.info("(" + getClass().getSimpleName() + ") - Atualizando por ID: " + id);
        return ResponseEntity.ok(eventoService.update(id, updatedData));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        log.info("(" + getClass().getSimpleName() + ") - Deletando por ID: " + id);
        eventoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}