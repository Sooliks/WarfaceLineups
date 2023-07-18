using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using WarfaceLineups.DataBase;
using WarfaceLineups.DataBase.Models;
using WarfaceLineups.DataBase.Requests;
using WfTracker.Utils;

namespace WarfaceLineups.Controllers;

public class SettingsController : Controller
{
    [HttpPost("api/changeurlonyoutube")]
    public async Task ChangeUrlOnYoutube()
    {
        string body = "";
        using (StreamReader stream = new StreamReader(Request.Body))
        {
            body = await stream.ReadToEndAsync();
        }
        JObject obj = JObject.Parse(body);
        var jwtToken = Request.Headers["authorization"];
        var login = Request.Headers["login"];
        string newUrlOnYoutube = obj["urlonyoutube"].ToString();
        if (AuthService.CheckIsValidToken(jwtToken, login))
        {
            Accounts account = HandlerAccounts.GetAccountByLogin(login);
            account.UrlOnYoutube = newUrlOnYoutube;
            using Context db = new Context();
            db.Accounts.Update(account);
            await db.SaveChangesAsync();
            await Response.WriteAsJsonAsync( new { message="success" } );
            return;
        }
        await Response.WriteAsJsonAsync( new { message="error" } );
    }
    [HttpPost("api/changeurlonvk")]
    public async Task ChangeUrlOnVk()
    {
        string body = "";
        using (StreamReader stream = new StreamReader(Request.Body))
        {
            body = await stream.ReadToEndAsync();
        }
        JObject obj = JObject.Parse(body);
        var jwtToken = Request.Headers["authorization"];
        var login = Request.Headers["login"];
        string newUrlOnVk = obj["urlonvk"].ToString();
        if (AuthService.CheckIsValidToken(jwtToken, login))
        {
            Accounts account = HandlerAccounts.GetAccountByLogin(login);
            account.UrlOnVk = newUrlOnVk;
            using Context db = new Context();
            db.Accounts.Update(account);
            await db.SaveChangesAsync();
            await Response.WriteAsJsonAsync( new { message="success" } );
            return;
        }
        await Response.WriteAsJsonAsync( new { message="error" } );
    }
    [HttpPost("api/changeurlontelegram")]
    public async Task ChangeUrlOnTelegram()
    {
        string body = "";
        using (StreamReader stream = new StreamReader(Request.Body))
        {
            body = await stream.ReadToEndAsync();
        }
        JObject obj = JObject.Parse(body);
        var jwtToken = Request.Headers["authorization"];
        var login = Request.Headers["login"];
        string newUrlOnTelegram = obj["urlontelegram"].ToString();
        if (AuthService.CheckIsValidToken(jwtToken, login))
        {
            Accounts account = HandlerAccounts.GetAccountByLogin(login);
            account.UrlOnTelegram = newUrlOnTelegram;
            using Context db = new Context();
            db.Accounts.Update(account);
            await db.SaveChangesAsync();
            await Response.WriteAsJsonAsync( new { message="success" } );
            return;
        }
        await Response.WriteAsJsonAsync( new { message="error" } );
    }

    [HttpPost("api/changemainlineup")]
    public async Task ChangeMainLineup()
    {
        string body = "";
        using (StreamReader stream = new StreamReader(Request.Body))
        {
            body = await stream.ReadToEndAsync();
        }
        JObject obj = JObject.Parse(body);
        var jwtToken = Request.Headers["authorization"];
        var login = Request.Headers["login"];
        int mainLineupId = (int)obj["mainlineupid"];
        if (AuthService.CheckIsValidToken(jwtToken, login))
        {
            Accounts account = HandlerAccounts.GetAccountByLogin(login);
            account.MainLineupId = mainLineupId;
            using Context db = new Context();
            db.Accounts.Update(account);
            await db.SaveChangesAsync();
            await Response.WriteAsJsonAsync( new { message="success" } );
            return;
        }
        await Response.WriteAsJsonAsync( new { message="error" } );
    }
}