using System.Net.Mail;
using System.Net;
using Portfolio.Data.Models;

namespace Portfolio.Data.Services
{
    public class MailSenderService
    {
        public void MailSend(string address, string caption, string message, string _SMTPServer = "smtp.mail.ru", string from = "BezdelMA@mail.ru", string password = "Zbw6RssNZsKRnLLvnfjH", string attachFile = "")
        {
            try
            {
                MailMessage mail = new MailMessage();
                mail.From = new MailAddress(from, "Новая заявка");
                mail.To.Add(new MailAddress(address));
                mail.Subject = caption;
                mail.IsBodyHtml = true;
                mail.Body = message;

                if (!String.IsNullOrEmpty(attachFile))
                {
                    mail.Attachments.Add(new Attachment(attachFile));
                }

                SmtpClient client = new SmtpClient();
                client.Host = _SMTPServer;
                client.Port = 587;
                client.EnableSsl = true;
                client.Credentials = new NetworkCredential(from/*.Split('@')[0]*/, password);
                client.DeliveryMethod = SmtpDeliveryMethod.Network;

                client.Send(mail);
                mail.Dispose();
            }

            catch (Exception ex)
            {
                throw new Exception("MailSend: " + ex.Message);
            }
        }

        public string GetStringMessage(MailModel mailModel)
        {
            string message = string.Format("Новая заявка:<br><br>Имя: {0}<br>Телефон: {1}<br>E-mail: {2}<br><br>Описание заявки: {3}", mailModel.Name, mailModel.Phone, mailModel.Email, mailModel.RequestText);
            return message;
        }
    }
}

