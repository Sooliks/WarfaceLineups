using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

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
        string scoreJwt = (string)obj["score"];
        Console.WriteLine(scoreJwt);
    }

    [HttpGet("api/rating")]
    public async Task GetRating()
    {
        
    }
}