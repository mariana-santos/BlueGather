package br.com.fiap.bluegather.service;

import br.com.fiap.bluegather.dto.AvaliacaoDTO;
import br.com.fiap.bluegather.model.Avaliacao;
import br.com.fiap.bluegather.repository.AvaliacaoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Objects;

@Service
public class AvaliacaoService {

    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    @Autowired
    private EventoService eventoService;

    @Autowired
    private UsuarioService usuarioService;

    public Page<AvaliacaoDTO> listAll(Pageable pageRequest) {
        Page<Avaliacao> list = avaliacaoRepository.findAll(pageRequest);
        return list.map(this::convertToDto);
    }

    public AvaliacaoDTO findById(Long id) {
        Avaliacao entity = findEntityById(id);
        return convertToDto(entity);
    }

    @Transactional
    public AvaliacaoDTO create(AvaliacaoDTO newData) {
        Avaliacao entity = convertToEntity(newData);
        Avaliacao savedEntity = avaliacaoRepository.save(entity);
        return convertToDto(savedEntity);
    }

    @Transactional
    public AvaliacaoDTO update(Long id, AvaliacaoDTO updatedData) {
        findEntityById(id);
        updatedData.setId(id);
        Avaliacao updatedEntity = convertToEntity(updatedData);    
        Avaliacao savedEntity = avaliacaoRepository.save(updatedEntity);
        return convertToDto(savedEntity);
    }
    
    @Transactional
    public void delete(Long id) {
        Avaliacao entity = findEntityById(id);
        avaliacaoRepository.delete(entity);
    }

    public Avaliacao findEntityById(Long id) {
        return avaliacaoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "(" + getClass().getSimpleName() + ") - Avaliacao não encontrado(a) por ID: " + id));
    }
    
    public AvaliacaoDTO convertToDto(Avaliacao entity) {
        AvaliacaoDTO dto = new AvaliacaoDTO();
        dto.setId(entity.getId());
        dto.setIdEvento(entity.getEvento() != null ? entity.getEvento().getId() : null);
        dto.setIdAvaliador(entity.getAvaliador() != null ? entity.getAvaliador().getId() : null);
        dto.setNota(entity.getNota());        
        return dto;
    }

    public Avaliacao convertToEntity(AvaliacaoDTO dto) {
        if (Objects.isNull(dto)) {
            throw new IllegalArgumentException("(" + getClass().getSimpleName() + ") - AvaliacaoDTO não pode ser nulo.");
        }
        Avaliacao entity;
        if (dto.getId() != null) {
            entity = findEntityById(dto.getId());
        } else {
            entity = new Avaliacao();
        }
        if (dto.getIdEvento() == null) {
            throw new IllegalArgumentException("(" + getClass().getSimpleName() + ") - idEvento não pode ser nulo.");
        }
        entity.setEvento(eventoService.findEntityById(dto.getIdEvento()));
        if (dto.getIdAvaliador() == null) {
            throw new IllegalArgumentException("(" + getClass().getSimpleName() + ") - idAvaliador não pode ser nulo.");
        }
        entity.setAvaliador(usuarioService.findEntityById(dto.getIdAvaliador()));
        entity.setNota(dto.getNota());       
        return entity;
    }
}