package br.com.fiap.bluegather.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import lombok.*;

import java.util.Set;
import java.util.LinkedHashSet;
import java.util.Objects;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "voluntarios")
@Entity
@Table(name = "EVENTO")
public class Evento {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SQ_EVENTO")
    @SequenceGenerator(name = "SQ_EVENTO", sequenceName = "SQ_EVENTO", allocationSize = 1)
    @Column(name = "ID")
    private Long id;

    @NotBlank(message = "O campo titulo não pode estar vazio.")
    @Column(name = "TITULO", nullable = false)
    private String titulo;

    @NotNull(message = "O campo latitude não pode estar vazio.")
    @Column(name = "LATITUDE", nullable = false)
    private String latitude;

    @NotNull(message = "O campo longitude não pode estar vazio.")
    @Column(name = "LONGITUDE", nullable = false)
    private String longitude;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "UTC")
    @FutureOrPresent
    @Column(name = "DATA_INICIO")
    private Date dataInicio;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "UTC")
    @Future
    @Column(name = "DATA_FIM")
    private Date dataFim;

    @Column(name = "DESCRICAO")
    private String descricao;
 
    @Positive
    @Min(1) @Max(5)
    @NotNull(message = "O campo urgencia não pode estar vazio.")
    @Column(name = "URGENCIA", nullable = false)
    private Long urgencia;

    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(
            name = "ID_ORGANIZADOR",
            referencedColumnName = "ID",
            foreignKey = @ForeignKey(name = "FK_USUARIO_EVENTO_NN")
    )
    private Usuario organizador;

    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @NotNull(message = "O campo tipo não pode estar vazio.")
    @JoinColumn(
            name = "ID_TIPO",
            referencedColumnName = "ID",
            foreignKey = @ForeignKey(name = "FK_TIPO_EVENTO_NN"),
            nullable = false
    )
    private TipoEvento tipoEvento;

    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @NotNull(message = "O campo status não pode estar vazio.")
    @JoinColumn(
            name = "ID_STATUS",
            referencedColumnName = "ID",
            foreignKey = @ForeignKey(name = "FK_STATUS_EVENTO_NN"),
            nullable = false
    )
    private Status status;

    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "USUARIO_EVENTO",
            joinColumns = {
                    @JoinColumn(
                            name = "ID_EVENTO",
                            referencedColumnName = "ID",
                            foreignKey = @ForeignKey(name = "FK_EVENTO_USUARIO_EVENT_NN")
                    )
            },
            inverseJoinColumns = {
                    @JoinColumn(
                            name = "ID_USUARIO",
                            referencedColumnName = "ID",
                            foreignKey = @ForeignKey(name = "FK_USUARIO_EVENTO_EVENT_NN")
                    )
            }
    )
    private Set<Usuario> voluntarios = new LinkedHashSet<>();

    public Evento addVoluntario(Usuario voluntario) {
        if (!this.voluntarios.contains(voluntario)) {
            this.voluntarios.add(voluntario);
            if (!voluntario.getEventos().contains(this)) voluntario.addEvento(this);
        }
        return this;
    }
    
    public Evento removeVoluntario(Usuario voluntario) {
        if (this.voluntarios.contains(voluntario)) {
            this.voluntarios.remove(voluntario);
            if (voluntario.getEventos().contains(this)) voluntario.removeEvento(this);
        }
        return this;
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Evento)) return false;
        Evento evento = (Evento) o;
        return Objects.equals(id, evento.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}