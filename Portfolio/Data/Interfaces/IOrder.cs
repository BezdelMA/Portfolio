using Portfolio.Data.Models;

namespace Portfolio.Data.Interfaces
{
	public interface IOrder
	{
		public bool AddOrder(OrderModel order);
		public bool ChangeStatus(OrderModel order, string status);
	}
}
