package br.com.fiap.bluegather.service;

import br.com.fiap.bluegather.dto.EventoDTO;
import br.com.fiap.bluegather.dto.EventoResponse;
import br.com.fiap.bluegather.dto.ImagemDTO;
import br.com.fiap.bluegather.dto.StatusDTO;
import br.com.fiap.bluegather.dto.TipoEventoDTO;
import br.com.fiap.bluegather.dto.UsuarioDTO;
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

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Collections;
import java.util.Date;
import java.util.LinkedHashSet;
import java.util.List;
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

    public Set<EventoResponse> listAllEventoResponses() {
        Set<Evento> eventos = new LinkedHashSet<>(eventoRepository.findAll());
        return eventos.stream()
                      .map(evento -> convertToEventoResponse(evento, imagemService.findByEvento(evento)))
                      .collect(Collectors.toSet());
    }

    public EventoResponse findEventoResponseById(Long id) {
        Evento evento = findEntityById(id);
        Set<Imagem> imagens = imagemService.findByEvento(evento);
        return convertToEventoResponse(evento, imagens);
    }

    public Set<EventoDTO> findByTituloContainingIgnoreCase(String titulo) {
        Set<Evento> list = eventoRepository.findByTituloContainingIgnoreCase(titulo);
        return list.stream().map(this::convertToDto).collect(Collectors.toSet());
    }

    public List<EventoDTO> findByLocalizacaoERaio(double latitude, double longitude, double raioKm) {
        List<Evento> eventos = eventoRepository.findAll();
        List<Evento> eventosFiltrados = eventos.stream()
                .filter(evento -> calcularDistancia(latitude, longitude, Double.parseDouble(evento.getLatitude()), Double.parseDouble(evento.getLongitude())) <= raioKm)
                .collect(Collectors.toList());
        return eventosFiltrados.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    private double calcularDistancia(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371;
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    public Set<EventoDTO> findByDataInicioAfter(LocalDate dataInicio) {
        Date date = Date.from(dataInicio.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Set<Evento> eventos = eventoRepository.findByDataInicioAfter(date);
        return eventos.stream().map(this::convertToDto).collect(Collectors.toSet());
    }

    public Set<EventoDTO> findByUrgencia(Long urgencia) {
        Set<Evento> eventos = eventoRepository.findByUrgencia(urgencia);
        return eventos.stream().map(this::convertToDto).collect(Collectors.toSet());
    }

    public Set<EventoDTO> findByOrganizadorId(Long organizadorId) {
        Set<Evento> eventos = eventoRepository.findByOrganizadorId(organizadorId);
        return eventos.stream().map(this::convertToDto).collect(Collectors.toSet());
    }

    public Set<EventoDTO> findByTipoEventoId(Long tipoEventoId) {
        Set<Evento> eventos = eventoRepository.findByTipoEventoId(tipoEventoId);
        return eventos.stream().map(this::convertToDto).collect(Collectors.toSet());
    }

    public Set<EventoDTO> findByStatusId(Long statusId) {
        Set<Evento> eventos = eventoRepository.findByStatusId(statusId);
        return eventos.stream().map(this::convertToDto).collect(Collectors.toSet());
    }

    public Set<EventoResponse> findEventoResponsesByVoluntarioId(Long voluntarioId) {
        Set<Evento> eventos = eventoRepository.findByVoluntariosId(voluntarioId);
        return eventos.stream().map(evento -> convertToEventoResponse(evento, imagemService.findByEvento(evento))).collect(Collectors.toSet());
    }
    
    public EventoDTO convertToDto(Evento entity) {
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

    public Evento convertToEntity(EventoDTO dto) {
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
    
        if (dto.getIdOrganizador() != null) {
            entity.setOrganizador(usuarioService.findEntityById(dto.getIdOrganizador()));
        } else {
            entity.setOrganizador(null);
        }
    
        if (dto.getIdTipoEvento() == null) {
            throw new IllegalArgumentException("(" + getClass().getSimpleName() + ") - ID TipoEvento não pode ser nulo.");
        }
        entity.setTipoEvento(tipoEventoService.findEntityById(dto.getIdTipoEvento()));
    
        if (dto.getIdStatus() == null) {
            throw new IllegalArgumentException("(" + getClass().getSimpleName() + ") - ID Status não pode ser nulo.");
        }
        entity.setStatus(statusService.findEntityById(dto.getIdStatus()));
    
        Set<Usuario> newUsuarios = new LinkedHashSet<>();
        if (dto.getIdOrganizador() != null) {
            newUsuarios.add(usuarioService.findEntityById(dto.getIdOrganizador()));
        }
        if (dto.getIdsVoluntarios() != null) {
            dto.getIdsVoluntarios().forEach(id -> {
                Usuario usuario = usuarioRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado com ID: " + id));
                newUsuarios.add(usuario);
            });
        }
        entity.setVoluntarios(newUsuarios);
    
        return entity;
    }    

    public EventoResponse convertToEventoResponse(Evento entity, Set<Imagem> imagens) {
        if (entity == null) {
            throw new IllegalArgumentException("Evento não pode ser nulo.");
        }

        Set<ImagemDTO> imagemDTOs = imagens != null ? imagens.stream()
                                                        .map(imagemService::convertToDto)
                                                        .collect(Collectors.toSet()) : Collections.emptySet();
        
        Set<UsuarioDTO> voluntariosDTOs = entity.getVoluntarios() != null ? entity.getVoluntarios().stream()
                                                                        .map(usuarioService::convertToDto)
                                                                        .collect(Collectors.toSet()) : Collections.emptySet();

        UsuarioDTO organizadorDTO = entity.getOrganizador() != null ? usuarioService.convertToDto(entity.getOrganizador()) : null;
        TipoEventoDTO tipoEventoDTO = entity.getTipoEvento() != null ? tipoEventoService.convertToDto(entity.getTipoEvento()) : null;
        StatusDTO statusDTO = entity.getStatus() != null ? statusService.convertToDto(entity.getStatus()) : null;

        return new EventoResponse(
                entity.getId(),
                entity.getTitulo(),
                entity.getLatitude(),
                entity.getLongitude(),
                entity.getDataInicio(),
                entity.getDataFim(),
                entity.getDescricao(),
                entity.getUrgencia(),
                organizadorDTO,
                tipoEventoDTO,
                statusDTO,
                voluntariosDTOs,
                imagemDTOs
        );
    }
}