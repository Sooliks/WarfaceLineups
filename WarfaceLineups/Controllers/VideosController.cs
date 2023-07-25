using Microsoft.AspNetCore.Mvc;

using Newtonsoft.Json.Linq;
using WarfaceLineups.DataBase;
using WarfaceLineups.DataBase.Models;
using WarfaceLineups.DataBase.Requests;
using WarfaceLineups.Models;
using WfTracker.Utils;

namespace WarfaceLineups.Controllers;


public class VideosController : Controller
{
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
            byte typePlant = (byte) obj["values"]["typePlant"];
            var urlOnPreview = $"https://i.ytimg.com/vi/{urlOnVideo.Split('=')[1]}/maxresdefault.jpg";
            await HandlerVideos.AddNewVideo(name, typeGameMap, typeSide, description, urlOnVideo, account.Id, urlOnPreview,typeFeature, typePlant);
            await Response.WriteAsJsonAsync(new{ message = "success" });
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            await Response.WriteAsJsonAsync(new{message = "error"});
            throw;
        }
    }

    [HttpPost("api/uploadlineupwithscreenshots")]
    public async Task UploadLineupWithScreenshots(LineupWithScreenshots lineupWithScreenshots)
    {
        try
        {
            var jwt = Request.Headers["authorization"];
            var login = Request.Headers["login"];
            if (!AuthService.CheckIsValidToken(jwt, login))
            {
                await Response.WriteAsJsonAsync(new { message = "error" });
                return;
            }
            var account = HandlerAccounts.GetAccountByLogin(login);
            int lineupId = HandlerVideos.GetLastIdLineup() + 1;
            int i = 0;
            IFormFileCollection files = Request.Form.Files;
            foreach (var file in files)
            {
                if ((file.ContentType == "image/png" || file.ContentType == "image/jpeg") && file.Length < 2000000)
                {
                    continue;
                }
                await Response.WriteAsJsonAsync(new{ message = "notformat" });
                return;
            }
            foreach (var file in files)
            {
                string fileName = $"screenshot_id_{i}_idLineup_{lineupId}.jpg";
                string path = Path.Combine(Directory.GetCurrentDirectory(), "Files/Screenshots", fileName);
                using (Stream stream = new FileStream(path, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
                i++;
            }
            HandlerScreenshots.AddNewScreenshots(lineupId, $"screenshot_id_{0}_idLineup_{lineupId}.jpg",
                $"screenshot_id_{1}_idLineup_{lineupId}.jpg", $"screenshot_id_{2}_idLineup_{lineupId}.jpg");
            
            await HandlerVideos.AddNewVideo(lineupWithScreenshots.name, lineupWithScreenshots.typeGameMap,
                lineupWithScreenshots.typeSide, lineupWithScreenshots.description, "", account.Id, "",
                lineupWithScreenshots.typeFeature, lineupWithScreenshots.typePlant,
                HandlerScreenshots.GetLastIdScreenshots());
            await Response.WriteAsJsonAsync(new { message = "success" });
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            await Response.WriteAsJsonAsync(new{message = "error"});
        }
    }
    [HttpPost("api/uploaddo")]
    public async Task<IResult> UploadBefore()
    {
        return Results.Ok();
    }

    [HttpGet("api/getlineupscreenshots/{idScreenshots:int}/{numberScreen:int}")]
    public async Task GetPreviewById(int idScreenshots, int numberScreen)
    {
        try
        {
            var screenShots = HandlerScreenshots.GetScreenshotsById(idScreenshots);
            switch (numberScreen)
            {
                case 0:
                    string path1 = Path.Combine(Directory.GetCurrentDirectory(), "Files/Screenshots", screenShots.FirstScreen);
                    Response.ContentType = "image/jpg";
                    await Response.SendFileAsync(path1);
                    break;
                case 1:
                    string path2 = Path.Combine(Directory.GetCurrentDirectory(), "Files/Screenshots", screenShots.SecondScreen);
                    Response.ContentType = "image/jpg";
                    await Response.SendFileAsync(path2);
                    break;
                case 2:
                    string path3 = Path.Combine(Directory.GetCurrentDirectory(), "Files/Screenshots", screenShots.ThirdScreen);
                    Response.ContentType = "image/jpg";
                    await Response.SendFileAsync(path3);
                    break;
            }
        }
        catch (Exception e)
        {
            
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
            var video = HandlerVideos.GetVideoByVideoId(idVideo);
            HandlerNotifications.SendNotify(account,HandlerVideos.GetAccountByVideoId(idVideo),"Lineup отклонен",$"Ваш lineup: {video.Title}, был отклонен модерацией, попробуйте опубликовать заного");
            await HandlerVideos.DeleteVideo(idVideo);
            if (video.ScreenShotsId != 0)
            {
                HandlerScreenshots.DeleteScreenshotsById(video.ScreenShotsId);
            }
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

    [HttpGet("api/getlineupbyid/{id:int}")]
    public async Task GetLineupById(int id)
    {
        await Response.WriteAsJsonAsync(HandlerVideos.GetVideoByVideoId(id));
    }

    [HttpPost("api/getlineupsbyownerid")]
    public async Task GetLineupsByOwnerId()
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
        await Response.WriteAsJsonAsync(new
        {
            lineups = HandlerVideos.GetVideosByOwnerId(minId, countVideosOnOnePage, obj, ownerId),
            count = HandlerVideos.GetCountVideosIsVerifiedByOwnerId(obj,ownerId)
        });
    }
}