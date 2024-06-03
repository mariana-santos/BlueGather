using System.ComponentModel.DataAnnotations;

namespace BlueGather.Dto
{
    public class TipoEventoDto
    {
        public long? Id { get; set; }

        [Required(ErrorMessage = "O campo nome não pode estar vazio.")]
        public string Nome { get; set; }
    }
}