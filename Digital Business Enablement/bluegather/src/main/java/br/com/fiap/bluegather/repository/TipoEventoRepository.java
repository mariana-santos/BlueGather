package br.com.fiap.bluegather.repository;

import br.com.fiap.bluegather.model.TipoEvento;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoEventoRepository extends JpaRepository<TipoEvento, Long> {
    @Query("SELECT te FROM TipoEvento te WHERE LOWER(te.nome) LIKE LOWER(concat('%', :nome, '%'))")
    Set<TipoEvento> findByNomeContainingIgnoreCase(@Param("nome") String nome);
}