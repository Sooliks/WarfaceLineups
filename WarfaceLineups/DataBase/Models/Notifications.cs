namespace WarfaceLineups.DataBase.Models;

public class Notifications
{
    public int Id { get; set; }
    public int SenderId { get; set; }
    public int RecipientId { get; set; }
    public string Title { get; set; }
    public string Text { get; set; }

    public Notifications()
    {
        
    }
    public Notifications(int senderId, int recipientId, string title, string text)
    {
        SenderId = senderId;
        RecipientId = recipientId;
        Title = title;
        Text = text;
    }
}