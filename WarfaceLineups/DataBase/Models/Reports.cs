namespace WarfaceLineups.DataBase.Models;

public class Reports
{
    public int Id { get; set; }
    public string Status { get; set; }
    public int SenderId { get; set; }
    public string SenderLogin { get; set; }
    public int LineupId { get; set; }
    public string TypeReport { get; set; }

    public Reports()
    {
        
    }

    public Reports(int senderId, string senderLogin, int lineupId, string typeReport, string status = "expected")
    {
        Status = status;
        SenderId = senderId;
        SenderLogin = senderLogin;
        LineupId = lineupId;
        TypeReport = typeReport;
    }
}