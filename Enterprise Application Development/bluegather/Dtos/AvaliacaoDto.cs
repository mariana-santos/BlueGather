using System.ComponentModel.DataAnnotations;

namespace BlueGather.Dto
{
    public class AvaliacaoDto
    {
        public long? Id { get; set; }

        [Required(ErrorMessage = "O campo idEvento não pode estar vazio.")]
        public long IdEvento { get; set; }

        [Required(ErrorMessage = "O campo idAvaliador não pode estar vazio.")]
        public long IdAvaliador { get; set; }

        [Required(ErrorMessage = "O campo nota não pode estar vazio.")]
        [Range(1, 5)]
        public long Nota { get; set; }
    }
}