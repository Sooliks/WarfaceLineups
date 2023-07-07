



using System.Net;
using System.Net.Mail;

namespace WarfaceLineups.Utils;

public class EmailService
{
    private static string _mail = "sooliks@mail.ru";
    private static string _password = "pQD3qfjVhM0cxpPLkzNE";
    private static string _username = "Warface Lineups";
    private static string _host = "smtp.mail.ru";
    private static int _port = 587;
    public static bool SendEmailAsync(string email, string subject, string message)
    {
        try
        {
            using (MailMessage mm = new MailMessage(_mail, email))
            {
                mm.Subject = subject;
                mm.Body = message;
                mm.IsBodyHtml = false;
                using (SmtpClient sc = new SmtpClient(_host, _port))
                {
                    sc.EnableSsl = true;
                    sc.DeliveryMethod = SmtpDeliveryMethod.Network;
                    sc.UseDefaultCredentials = false;
                    sc.Credentials = new NetworkCredential(_mail, _password);
                    sc.Send(mm);
                    return true;
                }
            }
        }
        catch (Exception e)
        {
            return false;
        }
    }
}