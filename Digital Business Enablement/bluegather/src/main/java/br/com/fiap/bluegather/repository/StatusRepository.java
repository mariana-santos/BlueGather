package br.com.fiap.bluegather.repository;

import br.com.fiap.bluegather.model.Status;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusRepository extends JpaRepository<Status, Long> {
    @Query("SELECT s FROM Status s WHERE LOWER(s.nome) LIKE LOWER(concat('%', :nome, '%'))")
    Set<Status> findByNomeContainingIgnoreCase(@Param("nome") String nome);
}