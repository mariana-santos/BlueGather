package br.com.fiap.bluegather.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "MOMENTO", uniqueConstraints = {
        @UniqueConstraint(name = "UK_NOME_MOMENTO", columnNames = "NOME")
})
public class Momento {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SQ_MOMENTO")
    @SequenceGenerator(name = "SQ_MOMENTO", sequenceName = "SQ_MOMENTO", allocationSize = 1)
    @Column(name = "ID")
    private Long id;

    @Column(name = "NOME", nullable = false)
    @NotBlank(message = "O campo nome não pode estar vazio.")
    private String nome;
}