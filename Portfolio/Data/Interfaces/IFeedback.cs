using Portfolio.Data.Models;

namespace Portfolio.Data.Interfaces
{
	public interface IFeedback
	{
		public List<FeedbackModel> AllFeedbacks();
		public Task<bool> AddFeedback(FeedbackModel feedback);
		public FeedbackModel GetFeedbackById(int Id);
	}
}
