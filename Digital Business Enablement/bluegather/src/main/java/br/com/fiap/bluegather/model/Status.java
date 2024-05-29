package br.com.fiap.bluegather.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "STATUS", uniqueConstraints = {
        @UniqueConstraint(name = "UK_NOME_STATUS", columnNames = "NOME")
})
public class Status {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SQ_STATUS")
    @SequenceGenerator(name = "SQ_STATUS", sequenceName = "SQ_STATUS", allocationSize = 1)
    @Column(name = "ID")
    private Long id;

    @Column(name = "NOME", nullable = false)
    @NotBlank(message = "O campo nome não pode estar vazio.")
    private String nome;
}