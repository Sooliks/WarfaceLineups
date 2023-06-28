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
    [HttpGet("api/hello")]
    public IActionResult Hello()
    {
        Response.WriteAsJsonAsync("aaaa");
        return BadRequest("Hello, world!");
    }
    [HttpPost("api/uploadvideo")]
    public async Task UploadVideo(VideoData videoData)
    {
        try
        {
            if (videoData == null)
            {
                return;
            }
            int ownerId = HandlerAccounts.GetIdByAccountLogin(videoData.Login);
            if (!AuthService.CheckIsValidToken(videoData.JwtToken, videoData.Login))
            {
                await Response.WriteAsJsonAsync("error");
                return;
            }
            var account = HandlerAccounts.GetAccountById(ownerId);
            if (!account.IsVerifiedAccount)
            {
                await Response.WriteAsJsonAsync("error");
                return;
            }
            string urlOnPreview="";
            if (videoData.IsVisibleUploadPreview)
            {
                string[] theSplit = videoData.UrlOnVideo.Split('=');
                urlOnPreview = $"https://i.ytimg.com/vi/{theSplit[1]}/maxresdefault.jpg";
            }
            else
            {
                try
                {
                    string fileName = $"preview_id_{HandlerVideos.GetLastIdVideos()+1}.jpg";
                    string path = Path.Combine(Directory.GetCurrentDirectory(), "Files/Previews", fileName);
                    using (Stream stream = new FileStream(path, FileMode.Create))
                    {
                        await videoData.Image.CopyToAsync(stream);
                    }
                    urlOnPreview = $"http://localhost:5160/getpreview/{HandlerVideos.GetLastIdVideos()+1}";
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.ToString());
                    await Response.WriteAsJsonAsync("error");
                    return;
                }
            }
            await HandlerVideos.AddNewVideo(videoData.Title, videoData.TypeGameMap, videoData.TypeSide, videoData.Description, videoData.UrlOnVideo, ownerId, urlOnPreview,videoData.TypeFeature);
            await Response.WriteAsJsonAsync("success");
        }
        catch (Exception e)
        {
            Console.WriteLine(e.ToString());
            await Response.WriteAsJsonAsync("error");
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
            int minId = (page*countVideosOnOnePage)-countVideosOnOnePage;
            await Response.WriteAsJsonAsync(HandlerVideos.GetVideosInCount(minId, countVideosOnOnePage,obj));
        }catch(Exception e){}
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

    [HttpGet("api/getvideosbyid/{id:int}")]
    public async Task GetVideosByOwnerId(int id)
    {
        try
        {
            await Response.WriteAsJsonAsync(HandlerVideos.GetVideosByOwnerId(id));
        }
        catch (Exception e)
        {
            Console.WriteLine(e.ToString());
        }
    }

    [HttpPost("api/getvideosunverified")]
    public async Task GetVideosUnVerified()
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
            if(account.Role!="admin")return;
            await Response.WriteAsJsonAsync(HandlerVideos.GetAllVideosUnVerified());
        }
        else
        {
            //await Response.WriteAsJsonAsync(null);
        }
    }

    [HttpGet("api/getpreview/{id:int}")]
    public async Task GetPreviewById(int id)
    {
        try
        {
            string path = Path.Combine(Directory.GetCurrentDirectory(), "Files/Previews", $"preview_id_{id}.jpg");
            Response.ContentType = "image/jpg";
            await Response.SendFileAsync(path);
        }
        catch (Exception e)
        {
            Console.WriteLine(e.ToString());
        }
    }
    [HttpGet("api/getpreviewfromdb/{id:int}")]
    public async Task GetPreviewFromDbById(int id)
    {
        try
        {
            await using Context db = new Context();
            var img = db.Preview.SingleOrDefault(p => p.Id == id);
            Response.ContentType = "image/jpg";
            await Response.WriteAsJsonAsync(img.Image);
        }
        catch (Exception e)
        {
            Console.WriteLine(e.ToString());
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
        string login = (string) obj["login"];
        string jwtToken = (string) obj["jwt"];
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
        string login = (string) obj["login"];
        string jwtToken = (string) obj["jwt"];
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