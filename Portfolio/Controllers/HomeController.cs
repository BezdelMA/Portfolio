using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using Portfolio.Data.Models;
using Portfolio.Data.Services;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Portfolio.Data;
using Portfolio.Data.Interfaces;

namespace Portfolio.Controllers
{
	public class HomeController : Controller
	{
		private readonly ILogger<HomeController> _logger;
		private readonly MailSenderService _mailSenderService = new MailSenderService();
		private readonly IFeedback _feedback;
		private readonly IOrder _order;
		private readonly IUser _user;
		private readonly IWebHostEnvironment _webHostEnvironment;

		public HomeController(ILogger<HomeController> logger, IFeedback feedback, IOrder order, IUser user, IWebHostEnvironment webHostEnvironment)
		{
			_logger = logger;
			_feedback = feedback;
			_order = order;
			_user = user;
			_webHostEnvironment = webHostEnvironment;
		}

		public IActionResult Index()
		{
			ViewBag.Feedbacks = _feedback.AllFeedbacks();
			return View();
		}

		public IActionResult Privacy()
		{
			return View();
		}

		[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
		public IActionResult Error()
		{
			return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
		}

		[HttpGet]
		public IActionResult SendMail(MailModel mail)
		{
			if (ModelState.IsValid)
			{
				if (mail.Phone == null & mail.Email == null)
				{
					ModelState.AddModelError("", "Укажите номер телефона или E-mail");
					return Json("Для корректной обработки заявки, пожалуйста, укажите номер телефона или E-mail");
				}
			}
			else
			{
				return Json("Для корректной обработки заявки, пожалуйста, укажите все необхоимые данные");
			}
			try
			{
				var user = new UserModel()
				{
					Name = mail.Name,
					PhoneNumber = mail.Phone,
					EMail = mail.Email
				};

				var order = new OrderModel()
				{
					UserId = _user.GetUserId(user),
					OrderDisc = mail.RequestText,
					Status = "New"
				};

				var result = _order.AddOrder(order);
				if (result)
				{
					_mailSenderService.MailSend("Bezdelma@mail.ru", "Новая заявка", _mailSenderService.GetStringMessage(mail));
					return Json(string.Format("{0}, cпасибо за Ваше обращение! <br> Ваша заявка принята в работу. В ближайшее время мы свяжемся с вами", mail.Name));
				}

				else {
					return Json(string.Format("{0}, произошла непредвиденная ошибка. Попробуйте оставить заявку еще раз", mail.Name));
				}
			}
			catch (Exception ex)
			{
				return Json(ex.Message);
			}
		}

		public IActionResult NewReview(FeedbackModel feedback)
		{
			if (ModelState.IsValid)
			{
				feedback.FeedbackDate = DateTime.Now;
				var result = _feedback.AddFeedback(feedback).Result;
				if (result)
				{
					return Json(string.Format("{0}, Ваш отзыв добавлен. Спасибо, что воспользовались моими услугами", feedback.Name));
				}
				else
				{
					return Json(string.Format("{0}, произошла непредвиденная ошибка. Попробуйте добавить отзыв позже", feedback.Name));
				}
			}
			else
			{
				return Json(string.Format("Заполните все поля, пожалуйста"));
			}
		}

		[HttpPost]
		public JsonResult Test()
		{
			var avatar = Request.Form.Files[0];

			string path = "/img/users/" + avatar.FileName;

			using(var fileStream = new FileStream(_webHostEnvironment.WebRootPath + path, FileMode.Create))
			{
				avatar.CopyTo(fileStream);
			}

			return Json(path);
		}
	}
}