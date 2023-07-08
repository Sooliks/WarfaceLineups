using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using WarfaceLineups.DataBase.Requests;
using WfTracker.Utils;

namespace WarfaceLineups.Controllers;

public class NotificationsController : Controller
{
    [HttpPost("api/getnotifications")]
    public async Task GetNotifications()
    {
        var jwtToken = Request.Headers["authorization"];
        var login = Request.Headers["login"];
        if (AuthService.CheckIsValidToken(jwtToken, login))
        {
            await Response.WriteAsJsonAsync(
                HandlerNotifications.GetNotificationsByRecipientAccount(HandlerAccounts.GetAccountByLogin(login)));
            return;
        }
        await Response.WriteAsJsonAsync(new { message = "error" });
    }
    [HttpPost("api/deletenotify")]
    public async Task DeleteNotify()
    {
        var jwtToken = Request.Headers["authorization"];
        var login = Request.Headers["login"];
        string body = "";
        using (StreamReader stream = new StreamReader(Request.Body))
        {
            body = await stream.ReadToEndAsync();
        }
        JObject obj = JObject.Parse(body);
        int idNotify = (int)obj["id"];
        if (AuthService.CheckIsValidToken(jwtToken, login))
        {
            HandlerNotifications.DeleteNotify(HandlerAccounts.GetAccountByLogin(login),idNotify);
            await Response.WriteAsJsonAsync(new { message = "success" });
            return;
        }
        await Response.WriteAsJsonAsync(new { message = "error" });
    }
}