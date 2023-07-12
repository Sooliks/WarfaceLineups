namespace WarfaceLineups.DataBase.Models;

public class Screenshots
{
    public int Id { get; set; }
    public int LineupId { get; set; }
    public string FirstScreen { get; set; }
    public string SecondScreen { get; set; }
    public string ThirdScreen { get; set; }

    public Screenshots()
    {
        
    }

    public Screenshots(int lineupId, string firstScreen, string secondScreen, string thirdScreen)
    {
        LineupId = lineupId;
        FirstScreen = firstScreen;
        SecondScreen = secondScreen;
        ThirdScreen = thirdScreen;
    }
}