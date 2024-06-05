using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using BlueGather.Models;

namespace BlueGather.Configurations
{
    public class ImagemConfiguration : IEntityTypeConfiguration<ImagemModel>
    {
        public void Configure(EntityTypeBuilder<ImagemModel> builder)
        {
            builder.ToTable("IMAGEM");

            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).HasColumnName("ID").UseHiLo("SQ_IMAGEM");
            builder.Property(x => x.UrlImagem).HasColumnName("URL_IMAGEM").HasColumnType("VARCHAR(255)").IsRequired();
        }
    }
}