using Microsoft.EntityFrameworkCore;
using Portfolio.Data.Interfaces;
using Portfolio.Data.Models;

namespace Portfolio.Data.Services
{
	public class FeedbackService : IFeedback
	{
		private readonly PortfolioContext _context;

		public FeedbackService(PortfolioContext context)
		{
			_context = context;
		}

		public async Task<bool> AddFeedback(FeedbackModel feedback)
		{
			try
			{
				await _context.Feedbacks.AddAsync(feedback);
				await _context.SaveChangesAsync();
				return true;
			}
			catch (Exception ex)
			{
				return false;
			}
		}

		public List<FeedbackModel> AllFeedbacks()
		{
			try
			{
				return _context.Feedbacks.ToList();
			}
			catch(Exception ex)
			{
				return new List<FeedbackModel>();
			}
		}

		public FeedbackModel GetFeedbackById(int Id)
		{
			try
			{
				return _context.Feedbacks.FirstOrDefaultAsync(f => f.Id == Id).Result;
			}
			catch(Exception ex)
			{
				return null;
			}
		}
	}
}
