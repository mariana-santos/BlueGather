package br.com.fiap.bluegather.repository;

import br.com.fiap.bluegather.model.Usuario;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);

    Set<Usuario> findByEventosId(Long eventoId);
}