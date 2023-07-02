using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using WarfaceLineups.DataBase.Models;
using WarfaceLineups.DataBase.Requests;
using WarfaceLineups.Utils;
using WfTracker.Utils;

namespace WarfaceLineups.Controllers;

public class AccountsController : Controller
{
    [HttpPost("api/registration")]
    public async Task Register()
    {
        string body = "";
        using (StreamReader stream = new StreamReader(Request.Body))
        {
            body = await stream.ReadToEndAsync();
        }
        JObject obj = JObject.Parse(body);
        string login = (string) obj["login"];
        string email = (string) obj["email"];
        string password = (string) obj["password"];
        if (HandlerAccounts.IsEmailExist(email))
        {
            await Response.WriteAsJsonAsync(new {message = "errorRegEmail"});
            return;
        }
        if (HandlerAccounts.IsLoginExist(login))
        {
            await Response.WriteAsJsonAsync(new {message = "errorRegLogin"});
            return;
        }
        DataBase.Models.Accounts account = HandlerAccounts.Register(login, email, password);
        await Response.WriteAsJsonAsync(
            new
            {
                message = "successReg",
                jwtToken = AuthService.GenerateJwtToken(account),
                log = login,
                userId = HandlerAccounts.GetIdByAccountLogin(login),
                role = HandlerAccounts.GetRoleByAccountLogin(login),
                isVerifiedAccount = account.IsVerifiedAccount,
            });
    }
    [HttpPost("api/authorization")]
    public async Task Authorization()
    {
        string body = "";
        using (StreamReader stream = new StreamReader(Request.Body))
        {
            body = await stream.ReadToEndAsync();
        }
        JObject obj = JObject.Parse(body);
        string login = (string) obj["login"];
        string password = (string) obj["password"];
        if (HandlerAccounts.IsLoginExist(login)&&HandlerAccounts.IsPasswordValid(login,password))
        {
            Accounts account = HandlerAccounts.GetAccountById(HandlerAccounts.GetIdByAccountLogin(login));
            await Response.WriteAsJsonAsync(
                new{
                    message = "successAuth",
                    id = account.Id,
                    jwtToken = AuthService.GenerateJwtToken(new DataBase.Models.Accounts(login,"none",password)),
                    log = account.Login,
                    role = account.Role,
                    isVerifiedAccount = account.IsVerifiedAccount
                });
            return;
        }
        await Response.WriteAsJsonAsync(new{message="errorAuth"});
    }
    

    [HttpPost("api/authorizationByJwt")]
    public async Task AuthorizationByJwt()
    {
        string body = "";
        using (StreamReader stream = new StreamReader(Request.Body))
        {
            body = await stream.ReadToEndAsync();
        }
        JObject obj = JObject.Parse(body);
        string login = (string) obj["login"];
        string jwtToken = (string) obj["jwt"];
        Accounts account = HandlerAccounts.GetAccountById(HandlerAccounts.GetIdByAccountLogin(login));
        if (AuthService.CheckIsValidToken(jwtToken, login))
        {
            await Response.WriteAsJsonAsync(
                new{
                    message = "success",
                    id = account.Id,
                    log = account.Login,
                    role = account.Role,
                    isVerifiedAccount = account.IsVerifiedAccount
                });
        }
        else
        {
            await Response.WriteAsJsonAsync(new{ message = "errorJwtAuthServer", });
        }
    }

    [HttpPost("api/getverificationcode")]
    public async Task GetVerificationCode()
    {
        string body = "";
        using (StreamReader stream = new StreamReader(Request.Body))
        {
            body = await stream.ReadToEndAsync();
        }
        JObject obj = JObject.Parse(body);
        string login = (string) obj["login"];
        string jwtToken = (string) obj["jwt"];
        if (AuthService.CheckIsValidToken(jwtToken, login))
        {
            Accounts account = HandlerAccounts.GetAccountById(HandlerAccounts.GetIdByAccountLogin(login));
            /*if (account.VerificationCode != "")
            {
                await Response.WriteAsJsonAsync(new{ message = "Код подтверждения уже отправлен", });
                return;
            }*/
            if (EmailService.SendEmailAsync(account.Email, "Код подтверждения", HandlerAccounts.GenerateVerificationCodeForAccount(account)))
            {
                await Response.WriteAsJsonAsync(new{ message = $"Код подтверждения отправлен на почту {account.Email}"});
            }
            else
            {
                await Response.WriteAsJsonAsync(new{ message = "Код подтверждения не был отправлен"});
            }
        }
    }
    [HttpPost("api/uploadverificationcode")]
    public async Task UploadVerificationCode()
    {
        string body = "";
        using (StreamReader stream = new StreamReader(Request.Body))
        {
            body = await stream.ReadToEndAsync();
        }
        JObject obj = JObject.Parse(body);
        string login = (string) obj["login"];
        string jwtToken = (string) obj["jwt"];
        string verificationCode = obj["verificationCode"].ToString();
        Accounts account = HandlerAccounts.GetAccountById(HandlerAccounts.GetIdByAccountLogin(login));
        if (AuthService.CheckIsValidToken(jwtToken, login))
        {
            await Response.WriteAsJsonAsync(new{result = HandlerAccounts.CheckIsValidVerificationCodeForAccount(account, verificationCode)});
        }
    }
    
}