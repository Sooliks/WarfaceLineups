using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using WarfaceLineups.DataBase.Models;
using WarfaceLineups.DataBase.Requests;
using WfTracker.Utils;

namespace WarfaceLineups.Controllers;

public class ReportsController : Controller
{
    [HttpPost("api/addreport")]
    public async Task AddReport()
    {
        var jwtToken = Request.Headers["authorization"];
        var login = Request.Headers["login"];
        
        string body = "";
        using (StreamReader stream = new StreamReader(Request.Body))
        {
            body = await stream.ReadToEndAsync();
        }
        JObject obj = JObject.Parse(body);
        int lineupId = (int)obj["lineupId"];
        string typeReport = (string)obj["typeReport"];
        if (AuthService.CheckIsValidToken(jwtToken, login))
        {
            var account = HandlerAccounts.GetAccountByLogin(login);
            if (HandlerReports.AddNewReport(account, lineupId, typeReport))
            {
                await Response.WriteAsJsonAsync(new { message = "success" });
            }
            else
            {
                await Response.WriteAsJsonAsync(new { message = "exists" });
            }
        }
        else
        {
            await Response.WriteAsJsonAsync(new {message = "error"});
        }
    }
    [HttpGet("api/reports")]
    public async Task GetReports()
    {
        var jwtToken = Request.Headers["authorization"];
        var login = Request.Headers["login"];
        if (AuthService.CheckIsValidToken(jwtToken, login))
        {
            var account = HandlerAccounts.GetAccountByLogin(login);
            if (account.Role != "admin")
            {
                await Response.WriteAsJsonAsync("error");
                return;
            }
            await Response.WriteAsJsonAsync(HandlerReports.GetExpectedReportsList());
            return;
        }
        await Response.WriteAsJsonAsync("error");
    }

    [HttpPost("api/setcompletereport")]
    public async Task SetCompletedReport()
    {
        var jwtToken = Request.Headers["authorization"];
        var login = Request.Headers["login"];
        
        string body = "";
        using (StreamReader stream = new StreamReader(Request.Body))
        {
            body = await stream.ReadToEndAsync();
        }
        JObject obj = JObject.Parse(body);
        int reportId = (int)obj["reportId"];
        if (AuthService.CheckIsValidToken(jwtToken, login))
        {
            var account = HandlerAccounts.GetAccountByLogin(login);
            if (account.Role != "admin")
            {
                await Response.WriteAsJsonAsync(new { message = "error" });
                return;
            }
            HandlerReports.SetReportAsVerified(reportId);
            await Response.WriteAsJsonAsync(new { message = "success" });
        }
    }
}