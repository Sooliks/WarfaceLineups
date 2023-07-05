using Microsoft.AspNetCore.Mvc;

using Newtonsoft.Json.Linq;
using WarfaceLineups.DataBase;
using WarfaceLineups.DataBase.Models;
using WarfaceLineups.DataBase.Requests;

using WfTracker.Utils;

namespace WarfaceLineups.Controllers;


public class VideosController : Controller
{
    [HttpGet("api/hello")]
    public IActionResult Hello()
    {
        Response.WriteAsJsonAsync("aaaa");
        return BadRequest("Hello, world!");
    }
    [HttpPost("api/uploadvideo")]
    public async Task UploadVideo()
    {
        try
        {
            var jwt = Request.Headers["authorization"];
            var login = Request.Headers["login"];
            if (!AuthService.CheckIsValidToken(jwt, login))
            {
                await Response.WriteAsJsonAsync(new{ message = "error" });
                return;
            }
            var account = HandlerAccounts.GetAccountByLogin(login);
            if (!account.IsVerifiedAccount)
            {
                await Response.WriteAsJsonAsync(new{ message = "notverified" });
                return;
            }
            string body = "";
            using (StreamReader stream = new StreamReader(Request.Body))
            {
                body = await stream.ReadToEndAsync();
            }
            JObject obj = JObject.Parse(body);
            string urlOnVideo = (string)obj["values"]["urlOnVideo"];
            if (HandlerVideos.VideoIsDuplicate(urlOnVideo))
            {
                await Response.WriteAsJsonAsync(new{message = "videoIsDuplicate"});
                return;
            }
            string name = (string) obj["values"]["name"];
            string description = (string) obj["values"]["description"];
            byte typeFeature = (byte) obj["values"]["typeFeature"];
            byte typeGameMap = (byte) obj["values"]["typeGameMap"];
            byte typeSide = (byte) obj["values"]["typeSide"];
            var urlOnPreview = $"https://i.ytimg.com/vi/{urlOnVideo.Split('=')[1]}/maxresdefault.jpg";
            await HandlerVideos.AddNewVideo(name, typeGameMap, typeSide, description, urlOnVideo, account.Id, urlOnPreview,typeFeature);
            await Response.WriteAsJsonAsync(new{ message = "success" });
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            await Response.WriteAsJsonAsync(new{message = "error"});
            throw;
        }
    }

    [HttpPost("api/videos")]
    public async Task GetVideos()
    {
        try
        {
            const int countVideosOnOnePage = 8;
            string body = "";
            using (StreamReader stream = new StreamReader(Request.Body))
            {
                body = await stream.ReadToEndAsync();
            }

            JObject obj = JObject.Parse(body);
            int page = (int)obj["page"];
            int minId = (page * countVideosOnOnePage) - countVideosOnOnePage;
            await Response.WriteAsJsonAsync(HandlerVideos.GetVideosInCount(minId, countVideosOnOnePage, obj));
        }
        catch (Exception e)
        {
            await Response.WriteAsJsonAsync(new{message = "error"});
        }
    }

    [HttpPost("api/getcountvideos")]
    public async Task GetCountVideos()
    {
        string body = "";
        using (StreamReader stream = new StreamReader(Request.Body))
        {
            body = await stream.ReadToEndAsync();
        }
        JObject obj = JObject.Parse(body);
        await Response.WriteAsJsonAsync(HandlerVideos.GetCountVideos(obj));
    }
    [HttpPost("api/getcountvideosbyownerid")]
    public async Task GetCountVideosByOwnerId()
    {
        string body = "";
        using (StreamReader stream = new StreamReader(Request.Body))
        {
            body = await stream.ReadToEndAsync();
        }
        JObject obj = JObject.Parse(body);
        var jwt = Request.Headers["authorization"];
        var login = Request.Headers["login"];
        await Response.WriteAsJsonAsync(HandlerVideos.GetCountVideosByOwnerId(obj,HandlerAccounts.GetIdByAccountLogin(login)));
    }

    [HttpPost("api/getvideosbyownerid")]
    public async Task GetVideosByOwnerId()
    {
        try
        {
            var jwt = Request.Headers["authorization"];
            var login = Request.Headers["login"];
            if (!AuthService.CheckIsValidToken(jwt, login))
            {
                await Response.WriteAsJsonAsync("error");
                return;
            }
            const int countVideosOnOnePage = 8;
            string body = "";
            using (StreamReader stream = new StreamReader(Request.Body))
            {
                body = await stream.ReadToEndAsync();
            }

            JObject obj = JObject.Parse(body);
            int page = (int)obj["page"];
            int minId = (page * countVideosOnOnePage) - countVideosOnOnePage;
            await Response.WriteAsJsonAsync(HandlerVideos.GetVideosByOwnerId(minId,countVideosOnOnePage,obj,HandlerAccounts.GetIdByAccountLogin(login)));
        }
        catch (Exception e)
        {
            Console.WriteLine(e.ToString());
            await Response.WriteAsJsonAsync(new{message = "error"});
        }
    }

    [HttpGet("api/getvideosunverified")]
    public async Task GetVideosUnVerified()
    {
        var jwt = Request.Headers["authorization"];
        var login = Request.Headers["login"];
        if (AuthService.CheckIsValidToken(jwt, login))
        {
            Accounts account = HandlerAccounts.GetAccountById(HandlerAccounts.GetIdByAccountLogin(login));
            if(account.Role!="admin")return;
            await Response.WriteAsJsonAsync(HandlerVideos.GetAllVideosUnVerified());
        }
        else
        {
            await Response.WriteAsJsonAsync(new{message = "error"});
        }
    }
    
    [HttpPost("api/deletevideo")]
    public async Task DeleteVideo()
    {
        string body = "";
        using (StreamReader stream = new StreamReader(Request.Body))
        {
            body = await stream.ReadToEndAsync();
        }
        JObject obj = JObject.Parse(body);
        var jwtToken = Request.Headers["authorization"];
        var login = Request.Headers["login"];
        int idVideo = (int)obj["id"];
        if (AuthService.CheckIsValidToken(jwtToken, login))
        {
            Accounts account = HandlerAccounts.GetAccountById(HandlerAccounts.GetIdByAccountLogin(login));
            if(account.Role!="admin")return;
            await HandlerVideos.DeleteVideo(idVideo);
            await Response.WriteAsJsonAsync(new {message = "success"});
        }
        else
        {
            await Response.WriteAsJsonAsync(new {message = "error"});
        }
    }
    [HttpPost("api/publishvideo")]
    public async Task ToPublishVideo()
    {
        string body = "";
        using (StreamReader stream = new StreamReader(Request.Body))
        {
            body = await stream.ReadToEndAsync();
        }
        JObject obj = JObject.Parse(body);
        var jwtToken = Request.Headers["authorization"];
        var login = Request.Headers["login"];
        int idVideo = (int)obj["id"];
        if (AuthService.CheckIsValidToken(jwtToken, login))
        {
            Accounts account = HandlerAccounts.GetAccountById(HandlerAccounts.GetIdByAccountLogin(login));
            if(account.Role!="admin")return;
            await HandlerVideos.ToPublishVideo(idVideo);
            await Response.WriteAsJsonAsync(new {message = "success"});
        }
        else
        {
            await Response.WriteAsJsonAsync(new {message = "error"});
        }
    }
}