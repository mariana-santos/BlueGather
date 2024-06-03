using System.ComponentModel.DataAnnotations;

namespace BlueGather.Dto
{
    public class UsuarioDto
    {
        public long? Id { get; set; }

        [Required(ErrorMessage = "O campo cpf não pode estar vazio.")]
        public string Cpf { get; set; }

        [Required(ErrorMessage = "O campo nome não pode estar vazio.")]
        public string Nome { get; set; }

        public string UrlImagem { get; set; }

        [EmailAddress(ErrorMessage = "Endereço de e-mail inválido.")]
        [Required(ErrorMessage = "O campo email não pode estar vazio.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "O campo senha não pode estar vazio.")]
        public string Senha { get; set; }

        public List<long>? IdsEventos { get; set; }
    }
}