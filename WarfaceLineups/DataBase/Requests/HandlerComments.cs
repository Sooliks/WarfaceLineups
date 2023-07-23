using WarfaceLineups.DataBase.Models;

namespace WarfaceLineups.DataBase.Requests;

public class HandlerComments
{
    public static void AddNewComment(Accounts owner, int lineupId, string text)
    {
        using Context db = new Context();
        var comment = new Comments(owner.Id, lineupId,HandlerVideos.GetAccountByVideoId(lineupId).Id, owner.Login, text);
        db.Comments.Add(comment);
        db.SaveChangesAsync();
    }
    public static List<Comments> GetAllCommentsByLineupId(int lineupId)
    {
        using Context db = new Context();
        return db.Comments.Where(c=>c.LineupId == lineupId).ToList();
    }
    public static void DeleteComment(int idComment)
    {
        using Context db = new Context();
        var comment = db.Comments.SingleOrDefault(c=>c.Id==idComment);
        db.Comments.Remove(comment);
        db.SaveChangesAsync();
    }

    public static bool IsAccountOwnerComment(Accounts account, int commentId)
    {
        using Context db = new Context();
        var comment = db.Comments.SingleOrDefault(c => c.Id == commentId);
        if (comment.OwnerId == account.Id) return true;
        
        return false;
    }
}