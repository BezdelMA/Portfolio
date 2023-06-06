using Microsoft.EntityFrameworkCore;
using Portfolio.Data.Interfaces;
using Portfolio.Data.Models;

namespace Portfolio.Data.Services
{
	public class OrderService : IOrder
	{
		private readonly PortfolioContext _context;

		public OrderService(PortfolioContext context)
		{
			_context = context;
		}

		public bool AddOrder(OrderModel order)
		{
			try
			{
				_context.Orders.AddAsync(order);
				_context.SaveChangesAsync();
				return true;
			}
			catch (Exception ex)
			{
				return false;
			}
		}

		public bool ChangeStatus(OrderModel order, string status)
		{
			try
			{
				var _order = _context.Orders.FirstOrDefaultAsync(o => o.Id == order.Id).Result;
				_order.Status = status;
				_context.Orders.Update(_order);
				_context.SaveChangesAsync();
				return true;
			}
			catch (Exception ex)
			{
				return false;
			}
		}
	}
}
