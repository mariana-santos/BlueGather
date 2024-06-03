package br.com.fiap.bluegather.service;

import br.com.fiap.bluegather.dto.TipoEventoDTO;
import br.com.fiap.bluegather.model.TipoEvento;
import br.com.fiap.bluegather.repository.TipoEventoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class TipoEventoService {

    @Autowired
    private TipoEventoRepository tipoEventoRepository;

    public Page<TipoEventoDTO> listAll(Pageable pageRequest) {
        Page<TipoEvento> list = tipoEventoRepository.findAll(pageRequest);
        return list.map(this::convertToDto);
    }

    public TipoEventoDTO findById(Long id) {
        TipoEvento entity = findEntityById(id);
        return convertToDto(entity);
    }

    @Transactional
    public TipoEventoDTO create(TipoEventoDTO newData) {
        TipoEvento entity = convertToEntity(newData);
        TipoEvento savedEntity = tipoEventoRepository.save(entity);
        return convertToDto(savedEntity);
    }

    @Transactional
    public TipoEventoDTO update(Long id, TipoEventoDTO updatedData) {
        findEntityById(id);
        updatedData.setId(id);
        TipoEvento updatedEntity = convertToEntity(updatedData);    
        TipoEvento savedEntity = tipoEventoRepository.save(updatedEntity);
        return convertToDto(savedEntity);
    }
    
    @Transactional
    public void delete(Long id) {
        TipoEvento entity = findEntityById(id);
        tipoEventoRepository.delete(entity);
    }

    public TipoEvento findEntityById(Long id) {
        return tipoEventoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "(" + getClass().getSimpleName() + ") - TipoEvento não encontrado(a) por ID: " + id));
    }
    
    public Set<TipoEventoDTO> findByNomeContainingIgnoreCase(String nome) {
        Set<TipoEvento> list = tipoEventoRepository.findByNomeContainingIgnoreCase(nome);
        return list.stream().map(this::convertToDto).collect(Collectors.toSet());
    }
    
    public TipoEventoDTO convertToDto(TipoEvento entity) {
        TipoEventoDTO dto = new TipoEventoDTO();
        dto.setId(entity.getId());
        dto.setNome(entity.getNome());
        return dto;
    }

    public TipoEvento convertToEntity(TipoEventoDTO dto) {
        if (Objects.isNull(dto)) {
            throw new IllegalArgumentException("(" + getClass().getSimpleName() + ") - TipoEventoDTO não pode ser nulo.");
        }
        TipoEvento entity;
        if (dto.getId() != null) {
            entity = findEntityById(dto.getId());
        } else {
            entity = new TipoEvento();
        }
        entity.setNome(dto.getNome());
        return entity;
    }
}