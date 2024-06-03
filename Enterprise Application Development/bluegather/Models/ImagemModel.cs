using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BlueGather.Models
{
    [Table("IMAGEM")]
    public class ImagemModel
    {
        [Key]
        [Column("ID")]
        public long Id { get; set; }

        [Required(ErrorMessage = "O campo evento não pode estar vazio.")]
        [ForeignKey("ID_EVENTO")]
        public EventoModel Evento { get; set; }

        [Required(ErrorMessage = "O campo momento não pode estar vazio.")]
        [ForeignKey("ID_MOMENTO")]
        public MomentoModel Momento { get; set; }

        [Column("URL_IMAGEM")]
        public string? UrlImagem { get; set; }
    }
}