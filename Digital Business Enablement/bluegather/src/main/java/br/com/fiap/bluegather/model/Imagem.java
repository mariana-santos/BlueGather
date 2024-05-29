package br.com.fiap.bluegather.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "IMAGEM")
public class Imagem {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SQ_IMAGEM")
    @SequenceGenerator(name = "SQ_IMAGEM", sequenceName = "SQ_IMAGEM", allocationSize = 1)
    @Column(name = "ID")
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @NotNull(message = "O campo evento não pode estar vazio.")
    @JoinColumn(
            name = "ID_EVENTO",
            referencedColumnName = "ID",
            foreignKey = @ForeignKey(name = "FK_EVENTO_IMAGEM_NN"),
            nullable = false
    )
    private Evento evento;

    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @NotNull(message = "O campo momento não pode estar vazio.")
    @JoinColumn(
            name = "ID_MOMENTO",
            referencedColumnName = "ID",
            foreignKey = @ForeignKey(name = "FK_MOMENTO_IMAGEM_NN"),
            nullable = false
    )
    private Momento momento;

    @NotBlank(message = "O campo urlImagem não pode estar vazio.")
    @Column(name = "URL_IMAGEM")
    private String urlImagem;
}