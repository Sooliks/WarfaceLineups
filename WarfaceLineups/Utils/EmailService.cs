
using System.Net;
using System.Net.Mail;
using MimeKit;


namespace WarfaceLineups.Utils;

public class EmailService
{
    /*public static bool SendEmailAsync(string email, string subject, string message)
    {
        using var emailMessage = new MimeMessage();
        emailMessage.From.Add(new MailboxAddress("Warface Tracker", "warfacetracker@yandex.ru"));
        emailMessage.To.Add(new MailboxAddress("", email));
        emailMessage.Subject = subject;
        emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
        {
            Text = message
        };
        using (var client = new SmtpClient())
        {
            client.ConnectAsync("smtp.yandex.ru", 587, true);
            client.AuthenticateAsync("warfacetracker@yandex.ru", "rddbdtyreelmoyyj");
            client.SendAsync(emailMessage);
            client.DisconnectAsync(true);
            Console.WriteLine("Message Sent");
        }
        return true;
    }*/
    public static bool SendEmailAsync(string email, string subject, string message)
    {
        string fromEmail = "warfacetracker@yandex.ru";
        string name = "Warface Tracker";
        var from = new MailAddress(fromEmail, name);
        var to = new MailAddress(email);
        var mailMessage = new MailMessage(from, to);
        mailMessage.Subject = subject;
        mailMessage.Body = message;
        SmtpClient smtp = new SmtpClient("smtp.yandex.ru",587);
        smtp.Credentials = new NetworkCredential(fromEmail, "rddbdtyreelmoyyj");
        smtp.EnableSsl = false;
        smtp.Send(mailMessage);
        return true;
    }
}