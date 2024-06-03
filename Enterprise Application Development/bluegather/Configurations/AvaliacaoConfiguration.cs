using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using BlueGather.Models;

namespace BlueGather.Configurations
{
    public class AvaliacaoConfiguration : IEntityTypeConfiguration<AvaliacaoModel>
    {
        public void Configure(EntityTypeBuilder<AvaliacaoModel> builder)
        {
            builder.ToTable("AVALIACAO");

            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).HasColumnName("ID").UseHiLo("SEQ_AVALIACAO");
            builder.Property(x => x.Nota).HasColumnName("NOTA").IsRequired();
        }
    }
}