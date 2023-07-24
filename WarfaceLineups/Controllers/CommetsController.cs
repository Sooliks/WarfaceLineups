using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using WarfaceLineups.DataBase.Requests;
using WfTracker.Utils;

namespace WarfaceLineups.Controllers;

public class CommetsController : Controller
{
    [HttpPost("api/addcomment")]
    public async Task AddNewComment()
    {
        var jwtToken = Request.Headers["authorization"];
        var login = Request.Headers["login"];
        string body = "";
        using (StreamReader stream = new StreamReader(Request.Body))
        {
            body = await stream.ReadToEndAsync();
        }
        JObject obj = JObject.Parse(body);
        int idLineup = (int)obj["idLineup"];
        string text = (string)obj["text"];
        if (AuthService.CheckIsValidToken(jwtToken, login))
        {
            var account = HandlerAccounts.GetAccountByLogin(login);
            HandlerComments.AddNewComment(account,idLineup,text);
            await Response.WriteAsJsonAsync(new { message = "success" });
            return;
        }
        await Response.WriteAsJsonAsync(new { message = "error" });
    }
    [HttpGet("api/comments/{lineupId:int}&&page={page:int}")]
    public async Task GetComments(int lineupId, int page)
    {
        await Response.WriteAsJsonAsync(HandlerComments.GetAllCommentsByLineupIdAndPage(lineupId,page));
    }
    [HttpPost("api/deletecomment/user")]
    public async Task DeleteCommentUser()
    {
        var jwtToken = Request.Headers["authorization"];
        var login = Request.Headers["login"];
        string body = "";
        using (StreamReader stream = new StreamReader(Request.Body))
        {
            body = await stream.ReadToEndAsync();
        }
        JObject obj = JObject.Parse(body);
        int idComment = (int)obj["idComment"];
        if (AuthService.CheckIsValidToken(jwtToken, login))
        {
            var account = HandlerAccounts.GetAccountByLogin(login);
            if (HandlerComments.IsAccountOwnerComment(account, idComment))
            {
                HandlerComments.DeleteComment(idComment);
                await Response.WriteAsJsonAsync(new { message = "success" });
                return;
            }
            await Response.WriteAsJsonAsync(new { message = "error" });
            return;
        }
        await Response.WriteAsJsonAsync(new { message = "error" });
    }
    [HttpPost("api/deletecomment/admin")]
    public async Task DeleteCommentAdmin()
    {
        var jwtToken = Request.Headers["authorization"];
        var login = Request.Headers["login"];
        string body = "";
        using (StreamReader stream = new StreamReader(Request.Body))
        {
            body = await stream.ReadToEndAsync();
        }
        JObject obj = JObject.Parse(body);
        int idComment = (int)obj["idComment"];
        if (AuthService.CheckIsValidToken(jwtToken, login))
        {
            var account = HandlerAccounts.GetAccountByLogin(login);
            if (account.Role == "admin")
            {
                HandlerComments.DeleteComment(idComment);
                await Response.WriteAsJsonAsync(new { message = "success" });
                return;
            }
            await Response.WriteAsJsonAsync(new { message = "error" });
            return;
        }
        await Response.WriteAsJsonAsync(new { message = "error" });
    }
    [HttpPost("api/deletecomment/ownerlineup")]
    public async Task DeleteCommentOwnerLineup()
    {
        var jwtToken = Request.Headers["authorization"];
        var login = Request.Headers["login"];
        string body = "";
        using (StreamReader stream = new StreamReader(Request.Body))
        {
            body = await stream.ReadToEndAsync();
        }
        JObject obj = JObject.Parse(body);
        int idComment = (int)obj["idComment"];
        if (AuthService.CheckIsValidToken(jwtToken, login))
        {
            var account = HandlerAccounts.GetAccountByLogin(login);
            if (HandlerComments.IsCommentBelongToAccount(account,idComment))
            {
                HandlerComments.DeleteComment(idComment);
                await Response.WriteAsJsonAsync(new { message = "success" });
                return;
            }
            await Response.WriteAsJsonAsync(new { message = "error" });
            return;
        }
        await Response.WriteAsJsonAsync(new { message = "error" });
    }
    
}