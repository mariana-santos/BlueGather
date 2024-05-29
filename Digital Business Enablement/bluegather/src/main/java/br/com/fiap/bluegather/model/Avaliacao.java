package br.com.fiap.bluegather.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "AVALIACAO")
public class Avaliacao {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SQ_AVALIACAO")
    @SequenceGenerator(name = "SQ_AVALIACAO", sequenceName = "SQ_AVALIACAO", allocationSize = 1)
    @Column(name = "ID")
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @NotNull(message = "O campo evento não pode estar vazio.")
    @JoinColumn(
            name = "ID_EVENTO",
            referencedColumnName = "ID",
            foreignKey = @ForeignKey(name = "FK_EVENTO_AVALIACAO_NN"),
            nullable = false
    )
    private Evento evento;

    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @NotNull(message = "O campo avaliador não pode estar vazio.")
    @JoinColumn(
            name = "ID_AVALIADOR",
            referencedColumnName = "ID",
            foreignKey = @ForeignKey(name = "FK_USUARIO_AVALIACAO_NN"),
            nullable = false
    )
    private Usuario avaliador;

    @Positive
    @Min(1) @Max(5)
    @NotNull(message = "O campo nota não pode estar vazio.")
    @Column(name = "NOTA", nullable = false)
    private Long nota;
}