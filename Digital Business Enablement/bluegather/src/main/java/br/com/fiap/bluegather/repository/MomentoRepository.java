package br.com.fiap.bluegather.repository;

import br.com.fiap.bluegather.model.Momento;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MomentoRepository extends JpaRepository<Momento, Long> {
    @Query("SELECT m FROM Momento m WHERE LOWER(m.nome) LIKE LOWER(concat('%', :nome, '%'))")
    Set<Momento> findByNomeContainingIgnoreCase(@Param("nome") String nome);
}