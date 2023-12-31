﻿namespace WarfaceLineups.DataBase.Models;

public class Comments
{
    public int Id { get; set; }
    public int LineupId { get; set; }
    public int OwnerIdLineup { get; set; }
    public int OwnerId { get; set; }
    public string OwnerLogin { get; set; }
    public string Text { get; set; }

    public Comments()
    {
        
    }
    public Comments(int ownerId, int lineupId, int ownerIdLineup, string ownerLogin, string text)
    {
        OwnerId = ownerId;
        LineupId = lineupId;
        OwnerIdLineup = ownerIdLineup;
        OwnerLogin = ownerLogin;
        Text = text;
    }
}