namespace WarfaceLineups.DataBase.Models;

public class News
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Text { get; set; }
    public int AdminId { get; set; }

    public News()
    {
        
    }
    public News(string title, string text, int adminId)
    {
        Title = title;
        Text = text;
        AdminId = adminId;
    }
}