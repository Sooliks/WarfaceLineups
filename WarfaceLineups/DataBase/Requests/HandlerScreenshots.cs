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
    public static void DeleteScreenshotsByLineupId(int lineupId)
    {
        using (Context db = new Context())
        {
            var screenshots = db.Screenshots.SingleOrDefault(s => s.LineupId == lineupId);
            db.Screenshots.Remove(screenshots);
            db.SaveChangesAsync();
        }
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