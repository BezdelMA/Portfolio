using Portfolio.Data.Models;

namespace Portfolio.Data.Interfaces
{
	public interface IUser
	{
		public bool AddUser(UserModel user);
		public int GetUserId(UserModel user);
	}
}
