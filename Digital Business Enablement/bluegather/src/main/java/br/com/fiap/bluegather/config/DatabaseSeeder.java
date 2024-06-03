package br.com.fiap.bluegather.config;

import br.com.fiap.bluegather.model.*;
import br.com.fiap.bluegather.repository.*;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.text.SimpleDateFormat;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Configuration
@Profile("dev")
public class DatabaseSeeder implements CommandLineRunner {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private ImagemRepository imagemRepository;

    @Autowired
    private MomentoRepository momentoRepository;

    @Autowired
    private StatusRepository statusRepository;

    @Autowired
    private TipoEventoRepository tipoEventoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception { 

        // Instanciando Objetos - Usuario
        Usuario gustavo = new Usuario();
        gustavo.setCpf("11111111111");
        gustavo.setNome("Gustavo Sanches");
        gustavo.setUrlImagem("https://avatars.githubusercontent.com/u/111543305?v=4");
        gustavo.setEmail("gustavosanches@fiap.com.br");
        gustavo.setSenha(passwordEncoder.encode("111111"));

        Usuario kaue = new Usuario();
        kaue.setCpf("22222222222");
        kaue.setNome("Kaue Caponero");
        kaue.setUrlImagem("https://avatars.githubusercontent.com/u/111543330?v=4");
        kaue.setEmail("kauecaponero@fiap.com.br");
        kaue.setSenha(passwordEncoder.encode("222222"));

        Usuario mariana = new Usuario();
        mariana.setCpf("33333333333");
        mariana.setNome("Mariana Santos");
        mariana.setUrlImagem("https://avatars.githubusercontent.com/u/56116824?v=4");
        mariana.setEmail("marianasantos@fiap.com.br");
        mariana.setSenha(passwordEncoder.encode("333333"));

        Usuario natan = new Usuario();
        natan.setCpf("44444444444");
        natan.setNome("Natan Cruz");
        natan.setUrlImagem("https://avatars.githubusercontent.com/u/111809342?v=4");
        natan.setEmail("natancruz@fiap.com.br");
        natan.setSenha(passwordEncoder.encode("444444"));

        Usuario vitor = new Usuario();
        vitor.setCpf("55555555555");
        vitor.setNome("Vitor Rubim");
        vitor.setUrlImagem("https://avatars.githubusercontent.com/u/48107882?v=4");
        vitor.setEmail("vitorrubim@fiap.com.br");
        vitor.setSenha(passwordEncoder.encode("555555"));

        // Instanciando Objetos - Tipo Evento
        TipoEvento limpeza = new TipoEvento();
        limpeza.setNome("Limpeza de Praias");

        TipoEvento passeata = new TipoEvento();
        passeata.setNome("Passeata de Conscientização Ambiental");

        TipoEvento resgate = new TipoEvento();
        resgate.setNome("Resgate de Animais Marinhos");

        TipoEvento coleta = new TipoEvento();
        coleta.setNome("Coleta de Lixo Reciclável");

        TipoEvento protesto = new TipoEvento();
        protesto.setNome("Protesto");

        // Instanciando Objetos - Status
        Status aberto = new Status();
        aberto.setNome("Aberto");

        Status finalizado = new Status();
        finalizado.setNome("Finalizado");

        Status cancelado = new Status();
        cancelado.setNome("Cancelado");

        // Instanciando Objetos - Evento
        Evento evento1 = new Evento();
        evento1.setTitulo("Limpeza da Praia da Enseada - Ubatuba");
        evento1.setLatitude("-23.4898");
        evento1.setLongitude("-45.0952");
        evento1.setDataInicio(new SimpleDateFormat("yyyy-MM-dd HH:mm").parse("2024-08-10 06:00"));
        evento1.setDataFim(new SimpleDateFormat("yyyy-MM-dd HH:mm").parse("2024-08-10 10:00"));
        evento1.setDescricao("Vamos ajudar a praia da enseada!");
        evento1.setUrgencia(2L);
        evento1.setOrganizador(gustavo);
        evento1.setTipoEvento(limpeza);
        evento1.setStatus(finalizado);
        Set<Usuario> voluntarios1 = new LinkedHashSet<>();
        voluntarios1.add(gustavo);
        evento1.setVoluntarios(voluntarios1);

        Evento evento2 = new Evento();
        evento2.setTitulo("Passeata Contra a Sacola de Plásticos em Mercados");
        evento2.setLatitude("-23.5420");
        evento2.setLongitude("-46.6294");
        evento2.setDataInicio(new SimpleDateFormat("yyyy-MM-dd HH:mm").parse("2024-08-11 11:00"));
        evento2.setDataFim(new SimpleDateFormat("yyyy-MM-dd HH:mm").parse("2024-08-11 14:00"));
        evento2.setDescricao(null);
        evento2.setUrgencia(1L);
        evento2.setOrganizador(natan);
        evento2.setTipoEvento(passeata);
        evento2.setStatus(finalizado);
        Set<Usuario> voluntarios2 = new LinkedHashSet<>();
        voluntarios2.add(natan);
        evento2.setVoluntarios(voluntarios2);

        Evento evento3 = new Evento();
        evento3.setTitulo("Limpeza da Praia da Enseada - Guarujá");
        evento3.setLatitude("-23.9868");
        evento3.setLongitude("-46.2275");
        evento3.setDataInicio(null);
        evento3.setDataFim(null);
        evento3.setDescricao("Precisamos de voluntários para limpar!");
        evento3.setUrgencia(5L);
        evento3.setOrganizador(null);
        evento3.setTipoEvento(limpeza);
        evento3.setStatus(cancelado);

        Evento evento4 = new Evento();
        evento4.setTitulo("Resgate de Tartarugas");
        evento4.setLatitude("-3.84036");
        evento4.setLongitude("-32.4113");
        evento4.setDataInicio(new SimpleDateFormat("yyyy-MM-dd HH:mm").parse("2024-08-13 08:00"));
        evento4.setDataFim(new SimpleDateFormat("yyyy-MM-dd HH:mm").parse("2024-08-13 16:00"));
        evento4.setDescricao("Ajudem-nos a salvar as tartarugas");
        evento4.setUrgencia(3L);
        evento4.setOrganizador(gustavo);
        evento4.setTipoEvento(resgate);
        evento4.setStatus(finalizado);
        Set<Usuario> voluntarios4 = new LinkedHashSet<>();
        voluntarios4.add(gustavo);
        evento4.setVoluntarios(voluntarios4);

        Evento evento5 = new Evento();
        evento5.setTitulo("Coleta de Lixo Reciclável da Favela da Rocinha");
        evento5.setLatitude("-22.9879");
        evento5.setLongitude("-43.2480");
        evento5.setDataInicio(new SimpleDateFormat("yyyy-MM-dd HH:mm").parse("2024-08-14 16:00"));
        evento5.setDataFim(new SimpleDateFormat("yyyy-MM-dd HH:mm").parse("2024-08-14 18:00"));
        evento5.setDescricao("Retirada de lixo reciclável de comércios e moradias para reciclagem e limpeza da comunidade");
        evento5.setUrgencia(4L);
        evento5.setOrganizador(mariana);
        evento5.setTipoEvento(coleta);
        evento5.setStatus(aberto);
        Set<Usuario> voluntarios5 = new LinkedHashSet<>();
        voluntarios5.add(mariana);
        evento5.setVoluntarios(voluntarios5);

        // Instanciando Objetos - Momento
        Momento antes = new Momento();
        antes.setNome("Antes");

        Momento durante = new Momento();
        durante.setNome("Durante");

        Momento depois = new Momento();
        depois.setNome("Depois");

        // Instanciando Objetos - Imagem
        Imagem imagem1 = new Imagem();
        imagem1.setEvento(evento1);
        imagem1.setMomento(antes);
        imagem1.setUrlImagem("https://hardcore.com.br/wp-content/uploads/sites/21/2021/01/poluicao-plastica-em-bali.jpg");

        Imagem imagem2 = new Imagem();
        imagem2.setEvento(evento1);
        imagem2.setMomento(durante);
        imagem2.setUrlImagem("https://voiceoftheoceans.com/wp-content/uploads/2022/09/27e8fd00-c478-4522-88ad-f356ab1c740d.jpg");

        Imagem imagem3 = new Imagem();
        imagem3.setEvento(evento1);
        imagem3.setMomento(depois);
        imagem3.setUrlImagem("https://turismo.ubatuba.sp.gov.br/wp-content/uploads/sites/29/2014/10/DSC01621.jpg");

        Imagem imagem4 = new Imagem();
        imagem4.setEvento(evento2);
        imagem4.setMomento(durante);
        imagem4.setUrlImagem("https://f.i.uol.com.br/fotografia/2013/06/20/291240-970x600-1.jpeg");

        Imagem imagem5 = new Imagem();
        imagem5.setEvento(evento4);
        imagem5.setMomento(durante);
        imagem5.setUrlImagem("https://camboriu.news/wp-content/uploads/2020/11/salvar-tartaruga.jpg");

        // Instanciando Objetos - Avaliacao
        Avaliacao avaliacao1 = new Avaliacao();
        avaliacao1.setEvento(evento1);
        avaliacao1.setAvaliador(kaue);
        avaliacao1.setNota(5L);

        Avaliacao avaliacao2 = new Avaliacao();
        avaliacao2.setEvento(evento1);
        avaliacao2.setAvaliador(mariana);
        avaliacao2.setNota(3L);

        Avaliacao avaliacao3 = new Avaliacao();
        avaliacao3.setEvento(evento1);
        avaliacao3.setAvaliador(natan);
        avaliacao3.setNota(3L);

        Avaliacao avaliacao4 = new Avaliacao();
        avaliacao4.setEvento(evento4);
        avaliacao4.setAvaliador(vitor);
        avaliacao4.setNota(1L);

        Avaliacao avaliacao5 = new Avaliacao();
        avaliacao5.setEvento(evento4);
        avaliacao5.setAvaliador(natan);
        avaliacao5.setNota(1L);

        // Populando Listas com Objetos Criados
        List<Usuario> usuarios = List.of(gustavo, kaue, mariana, natan, vitor);
        List<TipoEvento> tipoEventos = List.of(limpeza, passeata, resgate, coleta, protesto);
        List<Status> status = List.of(aberto, finalizado, cancelado);
        List<Evento> eventos = List.of(evento1, evento2, evento3, evento4, evento5);
        List<Momento> momentos = List.of(antes, durante, depois);
        List<Imagem> imagens = List.of(imagem1, imagem2, imagem3, imagem4, imagem5);
        List<Avaliacao> avaliacoes = List.of(avaliacao1, avaliacao2, avaliacao3, avaliacao4, avaliacao5);

        // Salvando no Banco H2
        usuarioRepository.saveAllAndFlush(usuarios);
        tipoEventoRepository.saveAllAndFlush(tipoEventos);
        statusRepository.saveAllAndFlush(status);
        eventoRepository.saveAllAndFlush(eventos);
        momentoRepository.saveAllAndFlush(momentos);
        imagemRepository.saveAllAndFlush(imagens);
        avaliacaoRepository.saveAllAndFlush(avaliacoes);
    }
}