using WarfaceLineups.DataBase.Models;

namespace WarfaceLineups.DataBase.Requests;

public class HandlerReports
{
    public static List<Reports> GetExpectedReportsList()
    {
        using Context db = new Context();
        return db.Reports.Where(r => r.Status == "expected").ToList();
    }
    public static bool AddNewReport(Accounts sender,int lineupId, string typeReport)
    {
        using Context db = new Context();
        var r = db.Reports.FirstOrDefault(r => r.LineupId == lineupId && r.SenderId == sender.Id);
        if (r != null) return false;
        
        var report = new Reports(sender.Id,lineupId, typeReport);
        db.Reports.Add(report);
        db.SaveChanges();
        return true;
    }
    public static void SetReportAsVerified(int reportId)
    {
        using Context db = new Context();
        var report = db.Reports.SingleOrDefault(r => r.Id == reportId);
        report.Status = "completed";
        db.Reports.Update(report);
        db.SaveChangesAsync();
    }
}