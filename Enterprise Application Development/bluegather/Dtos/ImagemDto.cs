using System.ComponentModel.DataAnnotations;

namespace BlueGather.Dto
{
    public class ImagemDto
    {
        public long? Id { get; set; }

        [Required(ErrorMessage = "O campo idEvento não pode estar vazio.")]
        public long IdEvento { get; set; }

        [Required(ErrorMessage = "O campo idMomento não pode estar vazio.")]
        public long IdMomento { get; set; }

        [Required(ErrorMessage = "O campo urlImagem não pode estar vazio.")]
        public string UrlImagem { get; set; }
    }
}