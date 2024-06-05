package br.com.fiap.bluegather.service;

import br.com.fiap.bluegather.dto.UsuarioDTO;
import br.com.fiap.bluegather.model.Usuario;
import br.com.fiap.bluegather.repository.UsuarioRepository;
import br.com.fiap.bluegather.model.Evento;
import br.com.fiap.bluegather.repository.EventoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.LinkedHashSet;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    public Page<UsuarioDTO> listAll(Pageable pageRequest) {
        Page<Usuario> list = usuarioRepository.findAll(pageRequest);
        return list.map(this::convertToDto);
    }

    public UsuarioDTO findById(Long id) {
        Usuario entity = findEntityById(id);
        return convertToDto(entity);
    }

    @Transactional
    public UsuarioDTO create(UsuarioDTO newData) {
        Usuario entity = convertToEntity(newData);
        Usuario savedEntity = usuarioRepository.save(entity);
        return convertToDto(savedEntity);
    }

    @Transactional
    public UsuarioDTO update(Long id, UsuarioDTO updatedData) {
        findEntityById(id);
        updatedData.setId(id);
        Usuario updatedEntity = convertToEntity(updatedData);    
        Usuario savedEntity = usuarioRepository.save(updatedEntity);
        return convertToDto(savedEntity);
    }
    
    @Transactional
    public void delete(Long id) {
        Usuario entity = findEntityById(id);
        usuarioRepository.delete(entity);
    }

    public Usuario findEntityById(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "(" + getClass().getSimpleName() + ") - Usuario não encontrado(a) por ID: " + id));
    }

    public UsuarioDTO findByEmail(String email) {
        Usuario entity = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "(" + getClass().getSimpleName() + ") - Usuario não encontrado(a) por email: " + email));
        return convertToDto(entity);
    }

    public Set<UsuarioDTO> findByEventoId(Long eventoId) {
        Set<Usuario> usuarios = usuarioRepository.findByEventosId(eventoId);
        return usuarios.stream().map(this::convertToDto).collect(Collectors.toSet());
    }
    
    public UsuarioDTO convertToDto(Usuario entity) {
        UsuarioDTO dto = new UsuarioDTO();
        dto.setId(entity.getId());
        dto.setCpf(entity.getCpf());
        dto.setNome(entity.getNome());
        dto.setUrlImagem(entity.getUrlImagem());
        dto.setEmail(entity.getEmail());
        dto.setSenha(null);
        if (entity.getEventos() != null) {
            Set<Long> idsEventos = entity.getEventos().stream()
                    .map(Evento::getId)
                    .collect(Collectors.toSet());
            dto.setIdsEventos(idsEventos);
        }
        return dto;
    }

    public Usuario convertToEntity(UsuarioDTO dto) {
        if (Objects.isNull(dto)) {
            throw new IllegalArgumentException("(" + getClass().getSimpleName() + ") - UsuarioDTO não pode ser nulo.");
        }
        Usuario entity;
        if (dto.getId() != null) {
            entity = findEntityById(dto.getId());
        } else {
            entity = new Usuario();
        }
        entity.setCpf(dto.getCpf());
        entity.setNome(dto.getNome());
        entity.setUrlImagem((dto.getUrlImagem()));
        entity.setEmail(dto.getEmail());
        entity.setSenha(passwordEncoder.encode(dto.getSenha()));
    
        Set<Evento> newEventos = new LinkedHashSet<>();
        if (dto.getIdsEventos() != null) {
            dto.getIdsEventos().forEach(id -> {
                Evento evento = eventoRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Evento não encontrado com ID: " + id));
                newEventos.add(evento);
            });
        }
        entity.setEventos(newEventos);
        return entity;
    }    
}