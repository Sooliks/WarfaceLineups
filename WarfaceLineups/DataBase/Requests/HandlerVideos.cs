﻿
using Newtonsoft.Json.Linq;
using WarfaceLineups.DataBase.Models;

namespace WarfaceLineups.DataBase.Requests;

public class HandlerVideos
{
    public static Task AddNewVideo(string title, byte typeGameMap, byte typeSide, string description, string urlOnVideo, int ownerId, string urlOnPreview, int typeFeature)
    {
        using (Context db = new Context())
        {
            var video = new Videos(title,typeGameMap,typeSide, description, urlOnVideo, ownerId, urlOnPreview, typeFeature);
            db.Videos.Add(video);
            db.SaveChangesAsync();
            return Task.CompletedTask;
        }
    }
    public static Task DeleteVideo(int idVideo)
    {
        using (Context db = new Context())
        {
            var video = db.Videos.SingleOrDefault(v=>v.Id==idVideo);
            db.Videos.Remove(video);
            db.SaveChanges();
            return Task.CompletedTask;
        }
    }

    public static async Task ToPublishVideo(int idVideo)
    {
        using Context db = new Context();
        var video = db.Videos.SingleOrDefault(v => v.Id == idVideo);
        video.IsVerified = true;
        db.Videos.Update(video);
        await db.SaveChangesAsync();
    }

    public static int GetCountVideos(JObject infoFilter)
    {
        using Context db = new Context();
        int typeSide = (int)infoFilter["filter"]["typeSide"];
        int typeGameMap = (int)infoFilter["filter"]["typeGameMap"];
        int typeFeature = (int)infoFilter["filter"]["typeFeature"];
        return db.Videos.Where(v=> (v.TypeSide == typeSide || typeSide == 10) && (v.TypeFeature == typeFeature || typeFeature == 10) && (v.TypeGameMap == typeGameMap || typeGameMap == 10)).Count();
    }
    
    public static List<Videos> GetVideosInCount(int minId,int count, JObject infoFilter)
    {
        using Context db = new Context();
        int typeSide = (int)infoFilter["filter"]["typeSide"];
        int typeGameMap = (int)infoFilter["filter"]["typeGameMap"];
        int typeFeature = (int)infoFilter["filter"]["typeFeature"];
        return db.Videos.OrderByDescending(v=>v.Id).Where(v=> (v.TypeSide == typeSide || typeSide == 10) && (v.TypeFeature == typeFeature || typeFeature == 10) && (v.TypeGameMap == typeGameMap || typeGameMap == 10) && (v.IsVerified == true)).Skip(minId).Take(count).ToList();;
    }
    public static List<Videos> GetVideosByOwnerId(int minId,int count, JObject infoFilter, int ownerId)
    {
        using Context db = new Context();
        int typeSide = (int)infoFilter["filter"]["typeSide"];
        int typeGameMap = (int)infoFilter["filter"]["typeGameMap"];
        int typeFeature = (int)infoFilter["filter"]["typeFeature"];
        return db.Videos.OrderByDescending(v=>v.Id).Where(v=> (v.TypeSide == typeSide || typeSide == 10) && (v.TypeFeature == typeFeature || typeFeature == 10) && (v.TypeGameMap == typeGameMap || typeGameMap == 10) && (v.OwnerId==ownerId)).Skip(minId).Take(count).ToList();
        //return db.Videos.OrderByDescending(v=> (v.TypeSide == typeSide || typeSide == 10) && (v.TypeFeature == typeFeature || typeFeature == 10) && (v.TypeGameMap == typeGameMap || typeGameMap == 10) && (v.OwnerId==ownerId)).Skip(minId).Take(count).ToList();
    }
    public static int GetLastIdVideos()
    {
        using Context db = new Context();
        try
        {
            return db.Videos.Max(v => v.Id);
        }
        catch
        {
            return 1;
        }
    }

    /*public static List<Videos> GetVideosByOwnerId(int ownerId)
    {
        List<Videos> videosList = new List<Videos>();
        using Context db = new Context();
        videosList = (from video in db.Videos
            where  video.OwnerId == ownerId
            select video).ToList();
        return videosList;
    }*/

    public static List<Videos> GetAllVideosUnVerified()
    {
        using Context db = new Context();
        return db.Videos.Where(v=>v.IsVerified == false).ToList();
    }

    public static bool VideoIsDuplicate(string urlOnVideo)
    {
        using Context db = new Context();
        var video = db.Videos.FirstOrDefault(v => v.UrlOnVideo == urlOnVideo);
        if (video != null)
        {
            return true;
        }
        return false;
    }
}