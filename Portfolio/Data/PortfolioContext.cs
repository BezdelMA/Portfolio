using Microsoft.EntityFrameworkCore;
using Portfolio.Data.Models;

namespace Portfolio.Data
{
	public class PortfolioContext : DbContext
	{
		public DbSet<UserModel> Users { get; set; }
		public DbSet<OrderModel> Orders { get; set; }
		public DbSet<FeedbackModel> Feedbacks { get; set; }

		public PortfolioContext(DbContextOptions<PortfolioContext> options) : base(options) 
		{
			Database.EnsureCreated();
		}
	}
}
