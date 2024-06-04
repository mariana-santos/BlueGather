using Microsoft.EntityFrameworkCore;
using BlueGather.Models;
using BlueGather.Configurations;

namespace BlueGather.Context
{
    public class BlueGatherContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public BlueGatherContext(DbContextOptions<BlueGatherContext> options, IConfiguration configuration) : base(options)
        {
            _configuration = configuration;
        }

        public DbSet<AvaliacaoModel> Avaliacao { get; set; }
        public DbSet<EventoModel> Evento { get; set; }
        public DbSet<ImagemModel> Imagem { get; set; }
        public DbSet<MomentoModel> Momento { get; set; }
        public DbSet<StatusModel> Status { get; set; }
        public DbSet<TipoEventoModel> TipoEvento { get; set; }
        public DbSet<UsuarioModel> Usuario { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseOracle(_configuration.GetConnectionString("OracleConnection"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<AvaliacaoModel>()
                .HasOne(x => x.Evento)
                .WithMany()
                .HasForeignKey("ID_EVENTO")
                .IsRequired();

            modelBuilder.Entity<AvaliacaoModel>()
                .HasOne(x => x.Avaliador)
                .WithMany()
                .HasForeignKey("ID_AVALIADOR")
                .IsRequired();

            modelBuilder.Entity<EventoModel>()
                .HasOne(x => x.Organizador)
                .WithMany()
                .HasForeignKey("ID_ORGANIZADOR");

            modelBuilder.Entity<EventoModel>()
                .HasOne(x => x.TipoEvento)
                .WithMany()
                .HasForeignKey("ID_TIPO")
                .IsRequired();

            modelBuilder.Entity<EventoModel>()
                .HasOne(x => x.Status)
                .WithMany()
                .HasForeignKey("ID_STATUS")
                .IsRequired();

            modelBuilder.Entity<EventoModel>()
                .HasMany(x => x.Voluntarios)
                .WithMany(y => y.Eventos)
                .UsingEntity<Dictionary<string, object>>(
                    "UsuarioEvento",
                    z => z.HasOne<UsuarioModel>().WithMany().HasForeignKey("ID_USUARIO"),
                    z => z.HasOne<EventoModel>().WithMany().HasForeignKey("ID_EVENTO"),
                    z =>
                    {
                        z.ToTable("USUARIO_EVENTO");
                    }
                );

            modelBuilder.Entity<ImagemModel>()
                .HasOne(x => x.Evento)
                .WithMany()
                .HasForeignKey("ID_EVENTO")
                .IsRequired();

            modelBuilder.Entity<ImagemModel>()
                .HasOne(x => x.Momento)
                .WithMany()
                .HasForeignKey("ID_MOMENTO")
                .IsRequired();

            modelBuilder.Entity<UsuarioModel>()
                .HasMany(x => x.Eventos)
                .WithMany(y => y.Voluntarios)
                .UsingEntity<Dictionary<string, object>>(
                    "UsuarioEvento",
                    z => z.HasOne<EventoModel>().WithMany().HasForeignKey("ID_EVENTO"),
                    z => z.HasOne<UsuarioModel>().WithMany().HasForeignKey("ID_USUARIO"),
                    z =>
                    {
                        z.ToTable("USUARIO_EVENTO");
                    }
                );

            modelBuilder.ApplyConfiguration(new AvaliacaoConfiguration());
            modelBuilder.ApplyConfiguration(new EventoConfiguration());
            modelBuilder.ApplyConfiguration(new ImagemConfiguration());
            modelBuilder.ApplyConfiguration(new MomentoConfiguration());
            modelBuilder.ApplyConfiguration(new StatusConfiguration());
            modelBuilder.ApplyConfiguration(new TipoEventoConfiguration());
            modelBuilder.ApplyConfiguration(new UsuarioConfiguration());
        }
    }
}