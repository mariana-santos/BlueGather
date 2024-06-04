using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using BlueGather.Models;

namespace BlueGather.Configurations
{
    public class StatusConfiguration : IEntityTypeConfiguration<StatusModel>
    {
        public void Configure(EntityTypeBuilder<StatusModel> builder)
        {
            builder.ToTable("STATUS");

            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).HasColumnName("ID").UseHiLo("SQ_STATUS");
            builder.Property(x => x.Nome).HasColumnName("NOME").IsRequired();
        }
    }
}