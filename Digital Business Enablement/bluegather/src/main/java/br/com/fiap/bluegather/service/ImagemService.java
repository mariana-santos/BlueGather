package br.com.fiap.bluegather.service;

import br.com.fiap.bluegather.dto.ImagemDTO;
import br.com.fiap.bluegather.model.Evento;
import br.com.fiap.bluegather.model.Imagem;
import br.com.fiap.bluegather.repository.ImagemRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Objects;
import java.util.Set;

@Service
public class ImagemService {

    @Autowired
    private ImagemRepository imagemRepository;

    @Autowired
    @Lazy
    private EventoService eventoService;

    @Autowired
    private MomentoService momentoService;

    public Page<ImagemDTO> listAll(Pageable pageRequest) {
        Page<Imagem> list = imagemRepository.findAll(pageRequest);
        return list.map(this::convertToDto);
    }

    public ImagemDTO findById(Long id) {
        Imagem entity = findEntityById(id);
        return convertToDto(entity);
    }

    @Transactional
    public ImagemDTO create(ImagemDTO newData) {
        Imagem entity = convertToEntity(newData);
        Imagem savedEntity = imagemRepository.save(entity);
        return convertToDto(savedEntity);
    }

    @Transactional
    public ImagemDTO update(Long id, ImagemDTO updatedData) {
        findEntityById(id);
        updatedData.setId(id);
        Imagem updatedEntity = convertToEntity(updatedData);    
        Imagem savedEntity = imagemRepository.save(updatedEntity);
        return convertToDto(savedEntity);
    }
    
    @Transactional
    public void delete(Long id) {
        Imagem entity = findEntityById(id);
        imagemRepository.delete(entity);
    }

    public Imagem findEntityById(Long id) {
        return imagemRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "(" + getClass().getSimpleName() + ") - Imagem não encontrado(a) por ID: " + id));
    }

    public Set<Imagem> findByEvento(Evento evento) {
        return imagemRepository.findByEvento(evento);
    }
    
    private ImagemDTO convertToDto(Imagem entity) {
        ImagemDTO dto = new ImagemDTO();
        dto.setId(entity.getId());
        dto.setIdEvento(entity.getEvento() != null ? entity.getEvento().getId() : null);
        dto.setIdMomento(entity.getMomento() != null ? entity.getMomento().getId() : null);
        dto.setUrlImagem(entity.getUrlImagem());
        return dto;
    }

    private Imagem convertToEntity(ImagemDTO dto) {
        if (Objects.isNull(dto)) {
            throw new IllegalArgumentException("(" + getClass().getSimpleName() + ") - ImagemDTO não pode ser nulo.");
        }
        Imagem entity;
        if (dto.getId() != null) {
            entity = findEntityById(dto.getId());
        } else {
            entity = new Imagem();
        }
        if (dto.getIdEvento() == null) {
            throw new IllegalArgumentException("(" + getClass().getSimpleName() + ") - ID Evento não pode ser nulo.");
        }
        entity.setEvento(eventoService.findEntityById(dto.getIdEvento()));
        if (dto.getIdMomento() == null) {
            throw new IllegalArgumentException("(" + getClass().getSimpleName() + ") - ID Momento não pode ser nulo.");
        }
        entity.setMomento(momentoService.findEntityById(dto.getIdMomento()));
        entity.setUrlImagem(dto.getUrlImagem());
        return entity;
    }
}