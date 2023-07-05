using WarfaceLineups.DataBase.Models;

namespace WarfaceLineups.DataBase.Requests;

public class HandlerAvatar
{
    public static void AddNewAvatar(byte[] content, int accountId)
    {
        using (Context db = new Context())
        {
            var a = db.Avatar.FirstOrDefault(a => a.AccountId == accountId);
            if (a != null)
            {
                db.Avatar.Remove(a);
                db.SaveChanges();
            }
            var avatar = new Avatar(content, accountId);
            db.Avatar.Add(avatar);
            db.SaveChanges();
        }
    }

    public static Avatar GetAvatarByAccountId(int accountId)
    {
        using (Context db = new Context())
        {
            return db.Avatar.SingleOrDefault(a=>a.AccountId == accountId);
        }
    }
}