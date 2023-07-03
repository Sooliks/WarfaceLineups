using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using WarfaceLineups.DataBase.Requests;
using WfTracker.Utils;

namespace WarfaceLineups.Controllers;

public class NewsController : Controller
{
    [HttpPost("api/publishnews")]
    public async Task PublishNews()
    {
        string body = "";
        using (StreamReader stream = new StreamReader(Request.Body))
        {
            body = await stream.ReadToEndAsync();
        }
        JObject obj = JObject.Parse(body);
        var jwtToken = Request.Headers["authorization"];
        var login = Request.Headers["login"];
        if (AuthService.CheckIsValidToken(jwtToken, login))
        {
            var account =HandlerAccounts.GetAccountByLogin(login);
            if (account.Role != "admin")
            {
                await Response.WriteAsJsonAsync(new {message = "error"});
                return;
            }
            string title = (string)obj["title"];
            string text = (string)obj["text"];
            HandlerNews.PublishNews(title,text,account.Id);
            await Response.WriteAsJsonAsync(new {message = "success"});
        }
        else
        {
            await Response.WriteAsJsonAsync(new {message = "error"});
        }
    }
}