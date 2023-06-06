using System.ComponentModel.DataAnnotations;

namespace Portfolio.Data.Models
{
    public class MailModel
    {
        [Display(Name = "Имя")]
        [Required]
        public string Name { get; set; } = "";

        [Display(Name = "Телефон")]
        public string? Phone { get; set; }

        [Display(Name = "E-mail")]
        public string? Email { get; set; }

        [Display(Name = "Суть запроса")]
        public string? RequestText { get; set; }
    }
}
