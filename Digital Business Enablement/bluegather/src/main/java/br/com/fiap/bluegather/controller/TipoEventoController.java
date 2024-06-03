package br.com.fiap.bluegather.controller;

import br.com.fiap.bluegather.dto.TipoEventoDTO;
import br.com.fiap.bluegather.service.TipoEventoService;

import java.util.Set;

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
@RequestMapping("tipoevento")
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TipoEventoController {

    @Autowired
    private TipoEventoService tipoEventoService;

    @GetMapping
    public ResponseEntity<Page<TipoEventoDTO>> listAll(@PageableDefault(size = 100, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        log.info("(" + getClass().getSimpleName() + ") - Buscando todos(as)");
        return ResponseEntity.ok(tipoEventoService.listAll(pageable));
    }

    @GetMapping("{id}")
    public ResponseEntity<TipoEventoDTO> findById(@PathVariable Long id) {
        log.info("(" + getClass().getSimpleName() + ") - Exibindo por ID: " + id);
        return ResponseEntity.ok(tipoEventoService.findById(id));
    }

    @PostMapping
    public ResponseEntity<TipoEventoDTO> create(@RequestBody @Valid TipoEventoDTO newData) {
        log.info("(" + getClass().getSimpleName() + ") - Cadastrando: " + newData);
        return ResponseEntity.status(HttpStatus.CREATED).body(tipoEventoService.create(newData));
    }

    @PutMapping("{id}")
    public ResponseEntity<TipoEventoDTO> update(@PathVariable Long id, @RequestBody @Valid TipoEventoDTO updatedData) {
        log.info("(" + getClass().getSimpleName() + ") - Atualizando por ID: " + id);
        return ResponseEntity.ok(tipoEventoService.update(id, updatedData));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        log.info("(" + getClass().getSimpleName() + ") - Deletando por ID: " + id);
        tipoEventoService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/nome/{nome}")
    public ResponseEntity<Set<TipoEventoDTO>> findByNomeContainingIgnoreCase(@PathVariable String nome) {
        log.info("(" + getClass().getSimpleName() + ") - Buscando por nome do tipo evento contendo: " + nome);
        Set<TipoEventoDTO> list = tipoEventoService.findByNomeContainingIgnoreCase(nome);
        return ResponseEntity.ok(list);
    }
}