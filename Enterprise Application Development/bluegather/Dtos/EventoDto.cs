using System.ComponentModel.DataAnnotations;

namespace BlueGather.Dto
{
    public class EventoDto
    {
        public long? Id { get; set; }

        [Required(ErrorMessage = "O campo título não pode estar vazio.")]
        public string Titulo { get; set; }

        [Required(ErrorMessage = "O campo latitude não pode estar vazio.")]
        public string Latitude { get; set; }

        [Required(ErrorMessage = "O campo longitude não pode estar vazio.")]
        public string Longitude { get; set; }

        [Required(ErrorMessage = "O campo dataInicio não pode estar vazio.")]
        [DataType(DataType.DateTime)]
        [FutureOrPresent(ErrorMessage = "A dataInicio deve ser no presente ou no futuro.")]
        public DateTime DataInicio { get; set; }

        [Required(ErrorMessage = "O campo dataFim não pode estar vazio.")]
        [DataType(DataType.DateTime)]
        [Future(ErrorMessage = "A dataFim deve ser no futuro.")]
        public DateTime DataFim { get; set; }

        public string Descricao { get; set; }

        [Required(ErrorMessage = "O campo urgência não pode estar vazio.")]
        [Range(1, 5, ErrorMessage = "A urgência deve estar entre 1 e 5.")]
        public long Urgencia { get; set; }

        [Required(ErrorMessage = "O campo idOrganizador não pode estar vazio.")]
        public long IdOrganizador { get; set; }

        [Required(ErrorMessage = "O campo idTipoEvento não pode estar vazio.")]
        public long IdTipoEvento { get; set; }

        [Required(ErrorMessage = "O campo idStatus não pode estar vazio.")]
        public long IdStatus { get; set; }

        public List<long>? IdsVoluntarios { get; set; }
    }

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
