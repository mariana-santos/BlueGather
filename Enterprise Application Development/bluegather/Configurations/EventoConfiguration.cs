using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using BlueGather.Models;

namespace BlueGather.Configurations
{
    public class EventoConfiguration : IEntityTypeConfiguration<EventoModel>
    {
        public void Configure(EntityTypeBuilder<EventoModel> builder)
        {
            builder.ToTable("EVENTO");

            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).HasColumnName("ID").UseHiLo("SEQ_EVENTO");
            builder.Property(x => x.Titulo).HasColumnName("TITULO").HasColumnType("VARCHAR(255)").IsRequired();
            builder.Property(x => x.Latitude).HasColumnName("LATITUDE").HasColumnType("VARCHAR(12)").IsRequired();
            builder.Property(x => x.Longitude).HasColumnName("LONGITUDE").HasColumnType("VARCHAR(12)").IsRequired();
            builder.Property(x => x.DataInicio).HasColumnName("DATA_INICIO");
            builder.Property(x => x.DataFim).HasColumnName("DATA_FIM");
            builder.Property(x => x.Descricao).HasColumnName("DESCRICAO").HasColumnType("VARCHAR(255)");
            builder.Property(x => x.Urgencia).HasColumnName("URGENCIA").IsRequired(); ;
        }
    }
}