package br.com.fiap.bluegather.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import lombok.*;

import java.util.List;
import java.util.Collection;
import java.util.Set;
import java.util.LinkedHashSet;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "USUARIO", uniqueConstraints = {
        @UniqueConstraint(name = "UK_CPF_USUARIO", columnNames = "CPF"),
        @UniqueConstraint(name = "UK_EMAIL_USUARIO", columnNames = "EMAIL")
})
public class Usuario implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SQ_USUARIO")
    @SequenceGenerator(name = "SQ_USUARIO", sequenceName = "SQ_USUARIO", allocationSize = 1)
    @Column(name = "ID")
    private Long id;

    @NotBlank(message = "O campo cpf não pode estar vazio.")
    @Column(name = "CPF", nullable = false)
    private String cpf;

    @NotBlank(message = "O campo nome não pode estar vazio.")
    @Column(name = "NOME", nullable = false)
    private String nome;

    @Column(name = "URL_IMAGEM")
    private String urlImagem;

    @Email(message = "Endereço de e-mail inválido.")
    @NotBlank(message = "O campo email não pode estar vazio.")
    @Column(name = "EMAIL", nullable = false)
    private String email;

    @NotBlank(message = "O campo senha não pode estar vazio.")
    @Column(name = "SENHA", nullable = false)
    private String senha;

    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "USUARIO_EVENTO",
            joinColumns = {
                    @JoinColumn(
                            name = "ID_USUARIO",
                            referencedColumnName = "ID",
                            foreignKey = @ForeignKey(name = "FK_USUARIO_EVENTO_USER_NN")
                    )
            },
            inverseJoinColumns = {
                    @JoinColumn(
                            name = "ID_EVENTO",
                            referencedColumnName = "ID",
                            foreignKey = @ForeignKey(name = "FK_EVENTO_USUARIO_USER_NN")
                    )
            }
    )
    private Set<Evento> eventos = new LinkedHashSet<>();

    public Usuario addEvento(Evento evento) {
        this.eventos.add(evento);
        if (evento.getVoluntarios().contains(this)) evento.addVoluntario(this);
        return this;
    }
    
    public Usuario removeEvento(Evento evento) {
        this.eventos.remove(evento);
        if (evento.getVoluntarios().contains(this)) evento.removeVoluntario(this);
        return this;
    }

    @Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of(new SimpleGrantedAuthority("ROLE_USER"));
	}

    @Override
	public String getPassword() {
		return senha;
	}

    @Override
	public String getUsername() {
		return email;
	}

    @Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	public Authentication toAuthentication() {
        return new UsernamePasswordAuthenticationToken(email, null, getAuthorities());
    }
}