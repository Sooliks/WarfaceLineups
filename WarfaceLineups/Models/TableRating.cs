namespace WarfaceLineups.Models;

public class TableRating
{
    public int Id { get; set; }
    public string Login { get; set; }
    public int AimTrackingScore { get; set; }

    public TableRating(int id, string login, int aimTrackingScore)
    {
        Id = id;
        Login = login;
        AimTrackingScore = aimTrackingScore;
    }
}