using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BlueGather.Models
{
    [Table("STATUS")]
    public class StatusModel
    {
        [Key]
        [Column("ID")]
        public long Id { get; set; }

        [Required(ErrorMessage = "O campo nome não pode estar vazio.")]
        [Column("NOME")]
        public string Nome { get; set; }
    }
}