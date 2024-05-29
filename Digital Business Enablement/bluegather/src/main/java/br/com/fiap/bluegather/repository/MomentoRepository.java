package br.com.fiap.bluegather.repository;

import br.com.fiap.bluegather.model.Momento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MomentoRepository extends JpaRepository<Momento, Long> {}