using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using BlueGather.Models;

namespace BlueGather.Configurations
{
    public class MomentoConfiguration : IEntityTypeConfiguration<MomentoModel>
    {
        public void Configure(EntityTypeBuilder<MomentoModel> builder)
        {
            builder.ToTable("MOMENTO");

            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).HasColumnName("ID").UseHiLo("SQ_MOMENTO");
            builder.Property(x => x.Nome).HasColumnName("NOME").IsRequired();
        }
    }
}