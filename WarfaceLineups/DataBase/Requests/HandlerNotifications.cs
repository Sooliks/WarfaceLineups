using WarfaceLineups.DataBase.Models;

namespace WarfaceLineups.DataBase.Requests;

public class HandlerNotifications
{
    public static void SendNotify(Accounts adminAccount, Accounts recipientAccount, string title, string text)
    {
        using (Context db = new Context())
        {
            var notify = new Notifications(adminAccount.Id,recipientAccount.Id, title, text);
            db.Notifications.Add(notify);
            db.SaveChanges();
        }
    }
    public static void DeleteNotify(Accounts recipientAccount, int notifyId)
    {
        using (Context db = new Context())
        {
            var notify = db.Notifications.SingleOrDefault(n => n.RecipientId == recipientAccount.Id && n.Id == notifyId);
            db.Notifications.Remove(notify);
            db.SaveChangesAsync();
        }
    }
    public static List<Notifications> GetNotificationsByRecipientAccount(Accounts recipientAccount)
    {
        using Context db = new Context();
        return db.Notifications.OrderByDescending(n => n.RecipientId == recipientAccount.Id).ToList();
    }
    public static int GetCountNotificationsOfAccount(Accounts account)
    {
        using Context db = new Context();
        return db.Notifications.Where(n => n.RecipientId == account.Id).Count();
    }
}