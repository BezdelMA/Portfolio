using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Portfolio.Data.Interfaces;
using Portfolio.Data.Models;

namespace Portfolio.Data.Services
{
	public class UserService : IUser
	{
		private readonly PortfolioContext _context;
		public UserService(PortfolioContext context) {
			_context = context;
		}
		public bool AddUser(UserModel user)
		{
			try
			{
				_context.Users.AddAsync(user);
				_context.SaveChangesAsync();
				return true;
			}

			catch (Exception ex)
			{
				return false;
			}
		}

		public int GetUserId(UserModel user)
		{
			try
			{
				var _user = new UserModel();
				if (!string.IsNullOrEmpty(user.PhoneNumber))
				{
					_user = _context.Users.FirstOrDefaultAsync(u => u.PhoneNumber.Equals(user.PhoneNumber)).Result;
				}

				else if (!string.IsNullOrEmpty(user.EMail))
				{
					_user = _context.Users.FirstOrDefaultAsync(u => u.EMail.Equals(user.EMail)).Result;
				}

				if(_user == null)
				{
					var result = AddUser(user);
					if (result)
					{
						var id = GetUserId(user);
						return id;
					}
				}
				return _user.Id;
			}

			catch(Exception ex)
			{
				return 0;
			}
		}
	}
}
