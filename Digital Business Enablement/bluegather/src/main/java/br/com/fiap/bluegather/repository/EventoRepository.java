package br.com.fiap.bluegather.repository;

import br.com.fiap.bluegather.model.Evento;

import java.util.Date;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Long> {
    @Query("SELECT e FROM Evento e WHERE LOWER(e.titulo) LIKE LOWER(concat('%', :titulo, '%'))")
    Set<Evento> findByTituloContainingIgnoreCase(@Param("titulo") String titulo);

    Set<Evento> findByLatitudeAndLongitude(String latitude, String longitude);

    Set<Evento> findByDataInicioAfter(@Param("dataInicio") Date dataInicio);

    Set<Evento> findByUrgencia(@Param("urgencia") Long urgencia);

    Set<Evento> findByOrganizadorId(@Param("organizadorId") Long organizadorId);

    Set<Evento> findByTipoEventoId(@Param("tipoEventoId") Long tipoEventoId);

    Set<Evento> findByStatusId(Long statusId);

    Set<Evento> findByVoluntariosId(Long voluntarioId);
}