using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BlueGather.Models
{
    [Table("AVALIACAO")]
    public class AvaliacaoModel
    {
        [Key]
        [Column("ID")]
        public long Id { get; set; }

        [Required(ErrorMessage = "O campo evento não pode estar vazio.")]
        [ForeignKey("ID_EVENTO")]
        public EventoModel Evento { get; set; }

        [Required(ErrorMessage = "O campo avaliador não pode estar vazio.")]
        [ForeignKey("ID_AVALIADOR")]
        public UsuarioModel Avaliador { get; set; }

        [Required(ErrorMessage = "O campo nota não pode estar vazio.")]
        [Range(1, 5)]
        [Column("NOTA")]
        public long Nota { get; set; }
    }
}