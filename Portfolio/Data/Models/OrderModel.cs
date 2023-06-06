namespace Portfolio.Data.Models
{
	public class OrderModel
	{
		public int Id { get; set; }
		public int UserId { get; set; }
		public string OrderDisc { get; set; } = "";
		public string Status { get; set; } = "";
	}
}
