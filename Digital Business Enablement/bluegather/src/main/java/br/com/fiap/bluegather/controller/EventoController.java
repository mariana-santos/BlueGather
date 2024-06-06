package br.com.fiap.bluegather.controller;

import br.com.fiap.bluegather.dto.EventoDTO;
import br.com.fiap.bluegather.dto.EventoResponse;
import br.com.fiap.bluegather.service.EventoService;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.format.annotation.DateTimeFormat;
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
    @Lazy
    private EventoService eventoService;

    @GetMapping
    public List<EventoResponse> listAll() {
        log.info("(" + getClass().getSimpleName() + ") - Buscando todos(as)");
        Set<EventoResponse> eventos = eventoService.listAllEventoResponses();
        return eventos.stream().collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public EventoResponse findById(@PathVariable Long id) {
        log.info("(" + getClass().getSimpleName() + ") - Exibindo por ID: " + id);
        return eventoService.findEventoResponseById(id);
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

    @GetMapping("/titulo/{titulo}")
    public ResponseEntity<Set<EventoDTO>> findByTituloContainingIgnoreCase(@PathVariable String titulo) {
        log.info("(" + getClass().getSimpleName() + ") - Buscando por titulo do evento contendo: " + titulo);
        Set<EventoDTO> list = eventoService.findByTituloContainingIgnoreCase(titulo);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/localizacao/{raio}")
    public ResponseEntity<List<EventoDTO>> findByLocalizacaoERaio(@PathVariable double raio, @RequestBody Map<String, String> coordenadas) {
        double latitude = Double.parseDouble(coordenadas.get("latitude"));
        double longitude = Double.parseDouble(coordenadas.get("longitude"));
        log.info("(" + getClass().getSimpleName() + ") - Buscando eventos dentro de " + raio + " km de " + latitude + ", " + longitude);
        List<EventoDTO> list = eventoService.findByLocalizacaoERaio(latitude, longitude, raio);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/data/{dataInicio}")
    public ResponseEntity<Set<EventoDTO>> findByDataInicioAfter(@PathVariable("dataInicio") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataInicio) {
        log.info("(" + getClass().getSimpleName() + ") - Buscando eventos a partir da data de início: " + dataInicio);
        Set<EventoDTO> list = eventoService.findByDataInicioAfter(dataInicio);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/urgencia/{urgencia}")
    public ResponseEntity<Set<EventoDTO>> findByUrgencia(@PathVariable Long urgencia) {
        log.info("(" + getClass().getSimpleName() + ") - Buscando eventos por nível de urgência: " + urgencia);
        Set<EventoDTO> list = eventoService.findByUrgencia(urgencia);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/organizador/{organizadorId}")
    public ResponseEntity<Set<EventoDTO>> findByOrganizadorId(@PathVariable Long organizadorId) {
        log.info("(" + getClass().getSimpleName() + ") - Buscando eventos por organizador: " + organizadorId);
        Set<EventoDTO> list = eventoService.findByOrganizadorId(organizadorId);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/tipo/{tipoEventoId}")
    public ResponseEntity<Set<EventoDTO>> findByTipoEventoId(@PathVariable Long tipoEventoId) {
        log.info("(" + getClass().getSimpleName() + ") - Buscando eventos por tipo de evento: " + tipoEventoId);
        Set<EventoDTO> list = eventoService.findByTipoEventoId(tipoEventoId);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/status/{statusId}")
    public ResponseEntity<Set<EventoDTO>> findByStatusId(@PathVariable Long statusId) {
        log.info("(" + getClass().getSimpleName() + ") - Buscando eventos por status: " + statusId);
        Set<EventoDTO> list = eventoService.findByStatusId(statusId);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/voluntario/{voluntarioId}")
    public ResponseEntity<Set<EventoResponse>> findByVoluntarioId(@PathVariable Long voluntarioId) {
        log.info("(" + getClass().getSimpleName() + ") - Buscando eventos por ID do voluntário: " + voluntarioId);
        Set<EventoResponse> list = eventoService.findEventoResponsesByVoluntarioId(voluntarioId);
        return ResponseEntity.ok(list);
    }
}