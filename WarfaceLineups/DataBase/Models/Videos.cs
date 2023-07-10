using WarfaceLineups.DataBase.Requests;

namespace WarfaceLineups.DataBase.Models;

public class Videos
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public int OwnerId { get; set; }
    public string OwnerLogin { get; set; }
    public string UrlOnVideo { get; set; }
    /// <summary>
    /// переулки - 0, антенны - 1, мосты - 2, фабрика - 3, пункт назн - 4, пирамида - 5, окраина - 6
    /// </summary>
    public byte TypeGameMap { get; set; } 
    /// <summary>
    /// атака - 0, защита - 1
    /// </summary>
    public byte TypeSide { get; set; }
    public int TypeFeature { get; set; } 
    public byte TypePlant { get; set; }
    public string UrlOnPreview { get; set; }
    public bool IsVerified { get; set; }
    
    public Videos()
    {
        
    }

    public Videos(string title, byte typeGameMap, byte typeSide, string description, string urlOnVideo, int ownerId, string urlOnPreview, int typeFeature, byte typePlant)
    {
        Title = title;
        TypeGameMap = typeGameMap;
        TypeSide = typeSide;
        Description = description;
        UrlOnVideo = urlOnVideo;
        OwnerId = ownerId;
        OwnerLogin = HandlerAccounts.GetAccountById(ownerId).Login;
        UrlOnPreview = urlOnPreview;
        TypeFeature = typeFeature;
        TypePlant = typePlant;
        IsVerified = false;
    }
}