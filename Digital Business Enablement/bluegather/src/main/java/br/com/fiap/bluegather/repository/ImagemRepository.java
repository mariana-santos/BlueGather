package br.com.fiap.bluegather.repository;

import br.com.fiap.bluegather.model.Evento;
import br.com.fiap.bluegather.model.Imagem;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImagemRepository extends JpaRepository<Imagem, Long> {
    Set<Imagem> findByEvento(Evento evento);

    Set<Imagem> findByEventoId(Long eventoId);

    Set<Imagem> findByMomentoId(Long momentoId);
}