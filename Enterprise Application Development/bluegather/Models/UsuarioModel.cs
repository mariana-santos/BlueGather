using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlueGather.Models
{
    [Table("USUARIO")]
    public class UsuarioModel
    {
        [Key]
        [Column("ID")]
        public long Id { get; set; }

        [Required(ErrorMessage = "O campo cpf não pode estar vazio.")]
        [Column("CPF")]
        public string Cpf { get; set; }

        [Required(ErrorMessage = "O campo nome não pode estar vazio.")]
        [Column("NOME")]
        public string Nome { get; set; }

        [Column("URL_IMAGEM")]
        public string? UrlImagem { get; set; }

        [Required(ErrorMessage = "O campo email não pode estar vazio.")]
        [EmailAddress(ErrorMessage = "Endereço de e-mail inválido.")]
        [Column("EMAIL")]
        public string Email { get; set; }

        [Required(ErrorMessage = "O campo senha não pode estar vazio.")]
        [Column("SENHA")]
        public string Senha { get; set; }

        public virtual ICollection<EventoModel>? Eventos { get; set; } = new HashSet<EventoModel>();
    }
}