using WarfaceLineups.DataBase.Models;

namespace WarfaceLineups.DataBase.Requests;

public class HandlerNews
{
    public static void PublishNews(string title, string text,int adminId)
    {
        using (Context db = new Context())
        {
            var news = new News(title, text, adminId);
            db.News.Add(news);
            db.SaveChangesAsync();
        }
    }

    public static List<News> GetNewsDescending()
    {
        using Context db = new Context();
        return db.News.OrderByDescending(n=>n.Id).ToList();
    }
    public static List<News> GetNewsAscending()
    {
        using Context db = new Context();
        return db.News.OrderBy(n=>n.Id).ToList();
    }
}