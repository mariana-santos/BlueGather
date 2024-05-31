package br.com.fiap.bluegather.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "TIPO_EVENTO", uniqueConstraints = {
        @UniqueConstraint(name = "UK_NOME_TIPO_EVENTO", columnNames = "NOME")
})
public class TipoEvento {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SQ_TIPO_EVENTO")
    @SequenceGenerator(name = "SQ_TIPO_EVENTO", sequenceName = "SQ_TIPO_EVENTO", allocationSize = 1)
    @Column(name = "ID")
    private Long id;

    @Column(name = "NOME", nullable = false)
    @NotBlank(message = "O campo nome não pode estar vazio.")
    private String nome;
}