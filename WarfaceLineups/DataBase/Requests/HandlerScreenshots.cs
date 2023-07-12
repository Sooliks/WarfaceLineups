using WarfaceLineups.DataBase.Models;

namespace WarfaceLineups.DataBase.Requests;

public class HandlerScreenshots
{
    public static void AddNewScreenshots(int lineupId, string firstScreenshot,string secondScreenshot, string thirdScreenshot)
    {
        using (Context db = new Context())
        {
            var screenshots = new Screenshots(lineupId,firstScreenshot, secondScreenshot, thirdScreenshot);
            db.Screenshots.Add(screenshots);
            db.SaveChanges();
        }
    }
    public static void DeleteScreenshotsById(int id)
    {
        using (Context db = new Context())
        {
            var screenshots = db.Screenshots.SingleOrDefault(s => s.Id == id);
            
            
            FileInfo fileInf1 = new FileInfo(Path.Combine(Directory.GetCurrentDirectory(), "Files/Screenshots", screenshots.FirstScreen));
            if (fileInf1.Exists) fileInf1.Delete();
            FileInfo fileInf2 = new FileInfo(Path.Combine(Directory.GetCurrentDirectory(), "Files/Screenshots", screenshots.SecondScreen));
            if (fileInf2.Exists) fileInf2.Delete();
            FileInfo fileInf3 = new FileInfo(Path.Combine(Directory.GetCurrentDirectory(), "Files/Screenshots", screenshots.ThirdScreen));
            if (fileInf3.Exists) fileInf3.Delete();
            
            db.Screenshots.Remove(screenshots);
            db.SaveChangesAsync();
        }
    }

    public static Screenshots GetScreenshotsById(int id)
    {
        using Context db = new Context();
        var screenshots = db.Screenshots.SingleOrDefault(v => v.Id == id);
        return screenshots;
    }
    public static int GetLastIdScreenshots()
    {
        using Context db = new Context();
        try
        {
            return db.Screenshots.Max(v => v.Id);
        }
        catch
        {
            return 0;
        }
    }
}