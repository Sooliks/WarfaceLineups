namespace WarfaceLineups.DataBase.Models;

public class Accounts
{
    public int Id { get; set; }
    public string Login { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Role { get; set; }
    public string VerificationCode { get; set; }
    public bool IsVerifiedAccount { get; set; } 
    public bool IsPremiumAccount { get; set; }
    public string UrlOnYoutube { get; set; }
    public string UrlOnVk { get; set; }
    public string UrlOnTelegram { get; set; }
    public int MainLineupId { get; set; }
    

    public Accounts()
    {
        
    }

    public Accounts(string login, string email, string password)
    {
        this.Login = login;
        this.Email = email;
        this.Password = password;
        this.Role = "member";
        this.VerificationCode = "";
        this.IsVerifiedAccount = false;
        this.IsPremiumAccount = false;
        UrlOnTelegram = "";
        UrlOnVk = "";
        UrlOnYoutube = "";
        MainLineupId = 0;
    }
}