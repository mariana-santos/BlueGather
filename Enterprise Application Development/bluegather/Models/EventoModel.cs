using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BlueGather.Models
{
    [Table("EVENTO")]
    public class EventoModel
    {
        [Key]
        [Column("ID")]
        public long Id { get; set; }

        [Required(ErrorMessage = "O campo titulo não pode estar vazio.")]
        [Column("TITULO")]
        public string Titulo { get; set; }

        [Required(ErrorMessage = "O campo latitude não pode estar vazio.")]
        [Column("LATITUDE")]
        public string Latitude { get; set; }

        [Required(ErrorMessage = "O campo longitude não pode estar vazio.")]
        [Column("LONGITUDE")]
        public string Longitude { get; set; }

        [Column("DATA_INICIO", TypeName = "date")]
        [FutureOrPresent(ErrorMessage = "A data de início deve ser no presente ou no futuro.")]
        public DateTime? DataInicio { get; set; }

        [Column("DATA_FIM", TypeName = "date")]
        [Future(ErrorMessage = "A data de fim deve ser no futuro.")]
        public DateTime? DataFim { get; set; }

        [Column("DESCRICAO")]
        public string? Descricao { get; set; }

        [Required(ErrorMessage = "O campo urgencia não pode estar vazio.")]
        [Range(1, 5)]
        [ForeignKey("URGENCIA")]
        public long Urgencia { get; set; }

        [ForeignKey("ID_ORGANIZADOR")]
        public UsuarioModel? Organizador { get; set; }

        [Required(ErrorMessage = "O campo tipo não pode estar vazio.")]
        [ForeignKey("ID_TIPO")]
        public TipoEventoModel TipoEvento { get; set; }

        [Required(ErrorMessage = "O campo status não pode estar vazio.")]
        [ForeignKey("ID_STATUS")]
        public StatusModel Status { get; set; }

        public virtual ICollection<UsuarioModel>? Voluntarios { get; set; } = new HashSet<UsuarioModel>();

        public class FutureOrPresentAttribute : ValidationAttribute
        {
            protected override ValidationResult IsValid(object value, ValidationContext validationContext)
            {
                if (value is DateTime dateTime && dateTime >= DateTime.Now)
                {
                    return ValidationResult.Success;
                }
                return new ValidationResult(ErrorMessage ?? "A data deve ser no presente ou no futuro.");
            }
        }

        public class FutureAttribute : ValidationAttribute
        {
            protected override ValidationResult IsValid(object value, ValidationContext validationContext)
            {
                if (value is DateTime dateTime && dateTime > DateTime.Now)
                {
                    return ValidationResult.Success;
                }
                return new ValidationResult(ErrorMessage ?? "A data deve ser no futuro.");
            }
        }
    }
}