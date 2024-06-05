using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using BlueGather.Models;

namespace BlueGather.Configurations
{
    public class UsuarioConfiguration : IEntityTypeConfiguration<UsuarioModel>
    {
        public void Configure(EntityTypeBuilder<UsuarioModel> builder)
        {
            builder.ToTable("USUARIO");

            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).HasColumnName("ID").UseHiLo("SQ_USUARIO");
            builder.Property(x => x.Cpf).HasColumnName("CPF").HasMaxLength(11).IsRequired();
            builder.Property(x => x.Nome).HasColumnName("NOME").HasMaxLength(100).IsRequired();
            builder.Property(x => x.UrlImagem).HasColumnName("URL_IMAGEM").HasMaxLength(255);
            builder.Property(x => x.Email).HasColumnName("EMAIL").HasMaxLength(100).IsRequired();
            builder.Property(x => x.Senha).HasColumnName("SENHA").HasMaxLength(100).IsRequired();
        }
    }
}
