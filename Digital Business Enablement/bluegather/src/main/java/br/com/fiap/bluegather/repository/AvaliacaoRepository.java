package br.com.fiap.bluegather.repository;

import br.com.fiap.bluegather.dto.AvaliacaoResumoDTO;
import br.com.fiap.bluegather.model.Avaliacao;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {
    Set<Avaliacao> findByEventoId(Long eventoId);

    @Query("SELECT new br.com.fiap.bluegather.dto.AvaliacaoResumoDTO(a.evento.id, COUNT(a), AVG(a.nota)) FROM Avaliacao a WHERE a.evento.id = :eventoId GROUP BY a.evento.id")
    AvaliacaoResumoDTO findAvaliacaoResumoByEventoId(@Param("eventoId") Long eventoId);

    Set<Avaliacao> findByAvaliadorId(Long avaliadorId);
}