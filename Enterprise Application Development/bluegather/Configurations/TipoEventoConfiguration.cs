using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using BlueGather.Models;

namespace BlueGather.Configurations
{
    public class TipoEventoConfiguration : IEntityTypeConfiguration<TipoEventoModel>
    {
        public void Configure(EntityTypeBuilder<TipoEventoModel> builder)
        {
            builder.ToTable("TIPO_EVENTO");

            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).HasColumnName("ID").UseHiLo("SEQ_TIPO");
            builder.Property(x => x.Nome).HasColumnName("NOME").IsRequired();
        }
    }
}