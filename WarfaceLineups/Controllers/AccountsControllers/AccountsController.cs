﻿


using ImageMagick;
using Microsoft.AspNetCore.Mvc;
using MySqlX.XDevAPI.Common;
using Newtonsoft.Json.Linq;
using WarfaceLineups.DataBase;
using WarfaceLineups.DataBase.Models;
using WarfaceLineups.DataBase.Requests;
using WarfaceLineups.Models;
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
                isPremiumAccount = account.IsPremiumAccount
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
        string email = (string) obj["email"];
        string password = (string) obj["password"];
        if (HandlerAccounts.IsEmailExist(email)&&HandlerAccounts.IsPasswordValid(email,password))
        {
            Accounts account = HandlerAccounts.GetAccountByEmail(email);
            await Response.WriteAsJsonAsync(
                new{
                    message = "successAuth",
                    id = account.Id,
                    jwtToken = AuthService.GenerateJwtToken(new DataBase.Models.Accounts(account.Login,null,password)),
                    log = account.Login,
                    role = account.Role,
                    isVerifiedAccount = account.IsVerifiedAccount,
                    isPremiumAccount = account.IsPremiumAccount
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
        try
        {
            if (AuthService.CheckIsValidToken(jwtToken, login))
            {
                await Response.WriteAsJsonAsync(
                    new
                    {
                        message = "success",
                        id = account.Id,
                        log = account.Login,
                        role = account.Role,
                        isVerifiedAccount = account.IsVerifiedAccount,
                        isPremiumAccount = account.IsPremiumAccount
                    });
            }
            else
            {
                await Response.WriteAsJsonAsync(new { message = "errorJwtAuthServer", });
            }
        }
        catch (Exception e)
        {
            await Response.WriteAsJsonAsync(new { message = "errorJwtAuthServer", });
        }
    }

    [HttpGet("api/getverificationcode")]
    public async Task GetVerificationCode()
    {
        var jwtToken = Request.Headers["authorization"];
        var login = Request.Headers["login"];
        if (AuthService.CheckIsValidToken(jwtToken, login))
        {
            Accounts account = HandlerAccounts.GetAccountByLogin(login);
            if (account.VerificationCode != "")
            {
                await Response.WriteAsJsonAsync(new{ message = "Код подтверждения уже отправлен", });
                return;
            }
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
        var jwtToken = Request.Headers["authorization"];
        var login = Request.Headers["login"];
        string verificationCode = obj["verificationCode"].ToString();
        Accounts account = HandlerAccounts.GetAccountByLogin(login);
        if (AuthService.CheckIsValidToken(jwtToken, login))
        {
            await Response.WriteAsJsonAsync(new { result = HandlerAccounts.CheckIsValidVerificationCodeForAccount(account, verificationCode) });
        }
        else
        {
            await Response.WriteAsJsonAsync(new { message = "error" });
        }
    }
    [DisableRequestSizeLimit] 
    [HttpPost("api/uploadavatar")]
    public async Task UploadAvatar(Image image)
    {
        await using Context db = new Context();
        var jwtToken = Request.Headers["authorization"];
        var login = Request.Headers["login"];
        if (AuthService.CheckIsValidToken(jwtToken, login))
        {
            var file = Request.Form.Files.First();
            using (var ms = new MemoryStream())
            {
                file.CopyTo(ms);
                var fileBytes = ms.ToArray();
                using (MagickImage img = new MagickImage(fileBytes))
                {
                    img.Format = img.Format; 
                    img.Resize(70, 70); 
                    img.Quality = 85; 
                    fileBytes = img.ToByteArray();
                }
                HandlerAvatar.AddNewAvatar(fileBytes,HandlerAccounts.GetIdByAccountLogin(login));
            }
            await Response.WriteAsJsonAsync(new { message = "success"} );
            return;
        }
        await Response.WriteAsJsonAsync(new { message = "error" });
    }

    [HttpGet("api/avatar/{id:int}")]
    public async Task<IResult> GetAvatar(int id)
    {
        if (id == 0) return Results.Empty;
        try
        {
            return Results.File(HandlerAvatar.GetAvatarByAccountId(id).Content);
        }
        catch (Exception e)
        {
            return Results.Empty;
        }
    }

    [HttpPost("api/notification/yoomoney")]
    public async Task<IResult> NotifyYooMoney([FromForm]YooMoneyNotify yooMoneyNotify)
    {
        Console.WriteLine("Notify accept");
        string key = yooMoneyNotify.sha1_hash;
        int amount = yooMoneyNotify.amount;
        
        if(amount!=250)return Results.Ok();
        
        if (key != "gI9wnrT4k936hUPq9g7++PaS") return Results.Ok();
        
        string label = yooMoneyNotify.label;
        Console.WriteLine(label);
        HandlerAccounts.SetPremiumAccountByLogin(label);
        return Results.Ok();
    }

    [HttpPost("api/changepassword")]
    public async Task ChangePassword()
    {
        string body = "";
        using (StreamReader stream = new StreamReader(Request.Body))
        {
            body = await stream.ReadToEndAsync();
        }
        JObject obj = JObject.Parse(body);
        string oldPassword = (string)obj["oldpassword"];
        var jwtToken = Request.Headers["authorization"];
        var login = Request.Headers["login"];
        if (AuthService.CheckIsValidToken(jwtToken, login))
        {
            var account = HandlerAccounts.GetAccountByLogin(login);
            if (!HandlerAccounts.IsPasswordValid(account, oldPassword))
            {
                await Response.WriteAsJsonAsync(new {message = "error"});
                return;
            }
            if (EmailService.SendEmailAsync(account.Email, "Смена пароля",
                    $"Код подтверждения {HandlerAccounts.GenerateVerificationCodeForAccount(account)}"))
            {
                await Response.WriteAsJsonAsync(new {message = "success"});
                return;
            }
        }
        await Response.WriteAsJsonAsync(new {message = "error"});
    }

    [HttpPost("api/changepasswordsubmitcode")]
    public async Task ChangePasswordSubmitCode()
    {
        string body = "";
        using (StreamReader stream = new StreamReader(Request.Body))
        {
            body = await stream.ReadToEndAsync();
        }
        JObject obj = JObject.Parse(body);
        string newPassword = (string)obj["newpassword"];
        string verificationCode = (string)obj["code"];
        var jwtToken = Request.Headers["authorization"];
        var login = Request.Headers["login"];
        if (AuthService.CheckIsValidToken(jwtToken, login))
        {
            var account = HandlerAccounts.GetAccountByLogin(login);
            if (!account.IsVerifiedAccount)
            {
                await Response.WriteAsJsonAsync(new {message = "error"});
                return;
            }
            if (HandlerAccounts.CheckIsValidVerificationCodeForAccount(account, verificationCode))
            {
                HandlerAccounts.ChangePasswordAccount(account,newPassword);
                await Response.WriteAsJsonAsync(new {message = "success"});
                HandlerAccounts.RemoveVerificationCodeForAccount(account);
                return;
            }
            await Response.WriteAsJsonAsync(new {message = "Неверный код"});
            return;
        }
        await Response.WriteAsJsonAsync(new {message = "error"});
    }

    [HttpPost("api/recoverypassword/getverificationcode")]
    public async Task RecoveryPassword()
    {
        string body = "";
        using (StreamReader stream = new StreamReader(Request.Body))
        {
            body = await stream.ReadToEndAsync();
        }
        JObject obj = JObject.Parse(body);
        string email = (string)obj["email"];
        Accounts account = new Accounts();
        try
        {
             account = HandlerAccounts.GetAccountByEmail(email);
             if (account == null)
             {
                 await Response.WriteAsJsonAsync(new { message = "Аккаунта с такой почтой не существует" });
                 return;
             }
        }
        catch (Exception e)
        {
            await Response.WriteAsJsonAsync(new { message = "Аккаунта с такой почтой не существует" });
            return;
        }
        if (!account.IsVerifiedAccount)
        {
            await Response.WriteAsJsonAsync(new { message = "Аккаунт не верифицированный" });
            return;
        }
        if (EmailService.SendEmailAsync(email, "Код восстановления",
                HandlerAccounts.GenerateVerificationCodeForAccount(account)))
        {
            await Response.WriteAsJsonAsync(new { message = "success" });
            return;
        }
        await Response.WriteAsJsonAsync(new { message = "Не удалось отправить код" });
    }

    [HttpPost("api/recoverypassword/uploadverificationcode")]
    public async Task UploadVerificationCodeRecoveryPassword()
    {
        string body = "";
        using (StreamReader stream = new StreamReader(Request.Body))
        {
            body = await stream.ReadToEndAsync();
        }
        JObject obj = JObject.Parse(body);
        string code = (string)obj["code"];
        string email = (string)obj["email"];
        var account = HandlerAccounts.GetAccountByEmail(email);
        if (account == null)
        {
            await Response.WriteAsJsonAsync(new { message = "Аккаунта с такой почтой не существует" });
            return;
        }
        if (HandlerAccounts.CheckIsValidVerificationCodeForRecovery(account, code))
        {
            await Response.WriteAsJsonAsync(new { token = AuthService.GenerateJwtToken(account), login = account.Login, message = "success" });
            return;
        }
        await Response.WriteAsJsonAsync(new { message = "error" });
    }

    [HttpPost("api/recoverypassword/recovery")]
    public async Task RecoveryAccount()
    {
        string body = "";
        using (StreamReader stream = new StreamReader(Request.Body))
        {
            body = await stream.ReadToEndAsync();
        }
        JObject obj = JObject.Parse(body);
        string jwt = (string)obj["jwt"];
        string login = (string)obj["login"];
        string newPassword = (string)obj["newpassword"];
        if (AuthService.CheckIsValidToken(jwt, login))
        {
            HandlerAccounts.ChangePasswordAccount(HandlerAccounts.GetAccountByLogin(login),newPassword);
            await Response.WriteAsJsonAsync(new { message = "success" });
            return;
        }
        await Response.WriteAsJsonAsync(new { message = "error" });
    }

    [HttpPost("api/dataprofileforsettings")]
    public async Task GetDataProfileForSettings()
    {
        string body = "";
        using (StreamReader stream = new StreamReader(Request.Body))
        {
            body = await stream.ReadToEndAsync();
        }
        JObject obj = JObject.Parse(body);
        int ownerId = (int)obj["ownerid"];
        var account = HandlerAccounts.GetAccountById(ownerId);
        await Response.WriteAsJsonAsync(new
        {
            lineups = HandlerVideos.GetAllVideosByOwnerId(ownerId),
            mainLineup = HandlerVideos.GetVideoByVideoId(account.MainLineupId),
            urlOnYoutube = account.UrlOnYoutube,
            urlOnVk = account.UrlOnVk,
            urlOnTelegram = account.UrlOnTelegram,
            
        });
    }
    
    [HttpPost("api/dataprofile")]
    public async Task GetDataProfile()
    {
        const int countVideosOnOnePage = 9;
        string body = "";
        using (StreamReader stream = new StreamReader(Request.Body))
        {
            body = await stream.ReadToEndAsync();
        }
        JObject obj = JObject.Parse(body);
        int ownerId = (int)obj["ownerid"];
        int page = (int)obj["page"];
        int minId = (page * countVideosOnOnePage) - countVideosOnOnePage;
        var account = HandlerAccounts.GetAccountById(ownerId);
        await Response.WriteAsJsonAsync(new
        {
            lineups = HandlerVideos.GetVideosVerifiedByOwnerId(minId,countVideosOnOnePage,obj,ownerId),
            mainLineup = HandlerVideos.GetVideoByVideoId(account.MainLineupId),
            urlOnYoutube = account.UrlOnYoutube,
            urlOnVk = account.UrlOnVk,
            urlOnTelegram = account.UrlOnTelegram,
            totalCountLineups = HandlerVideos.GetCountVideosIsVerifiedByOwnerId(obj,account.Id),
            login = account.Login
        });
    }
    
}