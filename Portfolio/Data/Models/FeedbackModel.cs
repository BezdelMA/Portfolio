using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Portfolio.Data.Models
{
	public class FeedbackModel
	{
		public int Id { get; set; }

		[Display(Name = "Ваше имя")]
		[Required(ErrorMessage = "Представьтесь, пожалуйста")]
		public string Name { get; set; } = "";

		[Display(Name = "Что заказывали?")]
		public string OrderType { get; set; } = "";

		[NotMapped]
		public IFormFile? FeedbackImg { get; set; } 

		public string? PathImg {get;set;}

		[Display(Name = "Ваше впечатление от работы и взаимодействия")]
		[Required(ErrorMessage = "Не оставляйте это поле пустым")]
		public string FeedbackText { get; set; } = "";

		public int StarsCount { get; set; }

		[Column(TypeName = "datetime")]
		public DateTime FeedbackDate { get; set; }
	}
}
