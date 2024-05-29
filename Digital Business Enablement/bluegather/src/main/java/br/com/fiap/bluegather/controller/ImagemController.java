package br.com.fiap.bluegather.controller;

import br.com.fiap.bluegather.dto.ImagemDTO;
import br.com.fiap.bluegather.service.ImagemService;

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
@RequestMapping("imagem")
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ImagemController {

    @Autowired
    private ImagemService imagemService;

    @GetMapping
    public ResponseEntity<Page<ImagemDTO>> listAll(@PageableDefault(size = 100, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        log.info("(" + getClass().getSimpleName() + ") - Buscando todos(as)");
        return ResponseEntity.ok(imagemService.listAll(pageable));
    }

    @GetMapping("{id}")
    public ResponseEntity<ImagemDTO> findById(@PathVariable Long id) {
        log.info("(" + getClass().getSimpleName() + ") - Exibindo por ID: " + id);
        return ResponseEntity.ok(imagemService.findById(id));
    }

    @PostMapping
    public ResponseEntity<ImagemDTO> create(@RequestBody @Valid ImagemDTO newData) {
        log.info("(" + getClass().getSimpleName() + ") - Cadastrando: " + newData);
        return ResponseEntity.status(HttpStatus.CREATED).body(imagemService.create(newData));
    }

    @PutMapping("{id}")
    public ResponseEntity<ImagemDTO> update(@PathVariable Long id, @RequestBody @Valid ImagemDTO updatedData) {
        log.info("(" + getClass().getSimpleName() + ") - Atualizando por ID: " + id);
        return ResponseEntity.ok(imagemService.update(id, updatedData));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        log.info("(" + getClass().getSimpleName() + ") - Deletando por ID: " + id);
        imagemService.delete(id);
        return ResponseEntity.noContent().build();
    }
}