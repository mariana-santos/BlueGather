package br.com.fiap.bluegather.service;

import br.com.fiap.bluegather.dto.EventoDTO;
import br.com.fiap.bluegather.dto.EventoResponse;
import br.com.fiap.bluegather.model.Evento;
import br.com.fiap.bluegather.model.Imagem;
import br.com.fiap.bluegather.repository.EventoRepository;
import br.com.fiap.bluegather.repository.UsuarioRepository;
import br.com.fiap.bluegather.model.Usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.LinkedHashSet;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class EventoService {

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private StatusService statusService;

    @Autowired
    private TipoEventoService tipoEventoService;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ImagemService imagemService;

    public Page<EventoDTO> listAll(Pageable pageRequest) {
        Page<Evento> list = eventoRepository.findAll(pageRequest);
        return list.map(this::convertToDto);
    }

    public EventoDTO findById(Long id) {
        Evento entity = findEntityById(id);
        return convertToDto(entity);
    }

    @Transactional
    public EventoDTO create(EventoDTO newData) {
        Evento entity = convertToEntity(newData);
        Evento savedEntity = eventoRepository.save(entity);
        return convertToDto(savedEntity);
    }

    @Transactional
    public EventoDTO update(Long id, EventoDTO updatedData) {
        findEntityById(id);
        updatedData.setId(id);
        Evento updatedEntity = convertToEntity(updatedData);    
        Evento savedEntity = eventoRepository.save(updatedEntity);
        return convertToDto(savedEntity);
    }
    
    @Transactional
    public void delete(Long id) {
        Evento entity = findEntityById(id);
        eventoRepository.delete(entity);
    }

    public Evento findEntityById(Long id) {
        return eventoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "(" + getClass().getSimpleName() + ") - Evento não encontrado(a) por ID: " + id));
    }

    public Set<EventoResponse> getAllEventoResponses() {
        Set<Evento> eventos = new LinkedHashSet<>(eventoRepository.findAll());
        return eventos.stream()
                      .map(evento -> convertToEventoResponse(evento, imagemService.findByEvento(evento)))
                      .collect(Collectors.toSet());
    }

    public EventoResponse getEventoResponseById(Long id) {
        Evento evento = findEntityById(id);
        Set<Imagem> imagens = imagemService.findByEvento(evento);
        return convertToEventoResponse(evento, imagens);
    }
    
    private EventoDTO convertToDto(Evento entity) {
        EventoDTO dto = new EventoDTO();
        dto.setId(entity.getId());
        dto.setTitulo(entity.getTitulo());
        dto.setLatitude(entity.getLatitude());
        dto.setLongitude(entity.getLongitude());
        dto.setDataInicio(entity.getDataInicio());
        dto.setDataFim(entity.getDataFim());
        dto.setDescricao(entity.getDescricao());
        dto.setUrgencia(entity.getUrgencia());
        dto.setIdOrganizador(entity.getOrganizador() != null ? entity.getOrganizador().getId() : null);
        dto.setIdTipoEvento(entity.getTipoEvento() != null ? entity.getTipoEvento().getId() : null);
        dto.setIdStatus(entity.getStatus() != null ? entity.getStatus().getId() : null);
        if (entity.getVoluntarios() != null) {
            Set<Long> idsVoluntarios = entity.getVoluntarios().stream()
                    .map(Usuario::getId)
                    .collect(Collectors.toSet());
            dto.setIdsVoluntarios(idsVoluntarios);
        }
        return dto;
    }

    private Evento convertToEntity(EventoDTO dto) {
        if (Objects.isNull(dto)) {
            throw new IllegalArgumentException("(" + getClass().getSimpleName() + ") - EventoDTO não pode ser nulo.");
        }
        Evento entity;
        if (dto.getId() != null) {
            entity = findEntityById(dto.getId());
        } else {
            entity = new Evento();
        }
        entity.setTitulo(dto.getTitulo());
        entity.setLatitude(dto.getLatitude());
        entity.setLongitude(dto.getLongitude());
        entity.setDataInicio(dto.getDataInicio());
        entity.setDataFim(dto.getDataFim());
        entity.setDescricao(dto.getDescricao());
        entity.setUrgencia(dto.getUrgencia());
        if (dto.getIdOrganizador() == null) {
            throw new IllegalArgumentException("(" + getClass().getSimpleName() + ") - ID Organizador não pode ser nulo.");
        }
        entity.setOrganizador(usuarioService.findEntityById(dto.getIdOrganizador()));
        if (dto.getIdTipoEvento() == null) {
            throw new IllegalArgumentException("(" + getClass().getSimpleName() + ") - ID TipoEvento não pode ser nulo.");
        }
        entity.setTipoEvento(tipoEventoService.findEntityById(dto.getIdTipoEvento()));
        if (dto.getIdStatus() == null) {
            throw new IllegalArgumentException("(" + getClass().getSimpleName() + ") - ID Status não pode ser nulo.");
        }
        entity.setStatus(statusService.findEntityById(dto.getIdStatus()));

        Set<Usuario> newUsuarios = new LinkedHashSet<>();
        if (dto.getIdsVoluntarios() != null) {
            dto.getIdsVoluntarios().forEach(id -> {
                Usuario usuario = usuarioRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado com ID: " + id));
                newUsuarios.add(usuario);
            });
        }
        entity.setVoluntarios(newUsuarios);
        return entity;
    }

    private EventoResponse convertToEventoResponse(Evento entity, Set<Imagem> imagens) {
        return new EventoResponse(
                entity.getId(),
                entity.getTitulo(),
                entity.getLatitude(),
                entity.getLongitude(),
                entity.getDataInicio(),
                entity.getDataFim(),
                entity.getDescricao(),
                entity.getUrgencia(),
                entity.getOrganizador(),
                entity.getTipoEvento(),
                entity.getStatus(),
                entity.getVoluntarios(),
                imagens
        );
    }
}