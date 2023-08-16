using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using WarfaceLineups.DataBase;
using WarfaceLineups.DataBase.Requests;
using WarfaceLineups.Models;
using WfTracker.Utils;

namespace WarfaceLineups.Controllers;

public class AimTrackingController : Controller
{
    [HttpPost("api/uploadscore")]
    public async Task UploadScore()
    {
        string body = "";
        using (StreamReader stream = new StreamReader(Request.Body))
        {
            body = await stream.ReadToEndAsync();
        }
        JObject obj = JObject.Parse(body);
        var jwtToken = Request.Headers["authorization"];
        var login = Request.Headers["login"];
        
        
        int score = (int)obj["score"];
        
        if (AuthService.CheckIsValidToken(jwtToken, login))
        {
            var account = HandlerAccounts.GetAccountByLogin(login);
            HandlerAccounts.SetAimTrackingScore(account,score);
            await Response.WriteAsJsonAsync( new { message = "success" } );
            return;
        }
        await Response.WriteAsJsonAsync( new { message = "error" } );
    }

    [HttpGet("api/rating")]
    public async Task GetRating()
    {
       await using Context db = new Context();
       var rating = db.Accounts.OrderByDescending(a => a.AimTrackingScore).Where(a=>a.AimTrackingScore!=0).Take(10).ToList();
       List<TableRating> tableRating = rating.Select(a => new TableRating (a.Id, a.Login, a.AimTrackingScore)).ToList();
       await Response.WriteAsJsonAsync(tableRating);
    }
}