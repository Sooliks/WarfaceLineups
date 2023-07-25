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
    public static List<Comments> GetAllCommentsByLineupIdAndPage(int lineupId, int page)
    {
        using Context db = new Context();
        const int countCommentsOnOnePage = 8;
        int minId = (page * countCommentsOnOnePage) - countCommentsOnOnePage;
        return db.Comments.OrderByDescending(c=>c.Id).Where(c=>c.LineupId == lineupId).Skip(minId).Take(countCommentsOnOnePage).ToList();
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
    public static bool IsCommentBelongToAccount(Accounts account, int commentId)
    {
        using Context db = new Context();
        var comment = db.Comments.SingleOrDefault(c => c.Id == commentId);
        if (comment.OwnerIdLineup == account.Id)
        {
            return true;
        }
        return false;
    }

    
    public static void UpdateComment(int commentId, string newComment)
    {
        using Context db = new Context();
        var comment = db.Comments.SingleOrDefault(c => c.Id == commentId);
        comment.Text = newComment;
        db.Comments.Update(comment);
        db.SaveChangesAsync();
    }
}