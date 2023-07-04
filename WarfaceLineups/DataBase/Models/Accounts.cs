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
    public byte [] Avatar { get; set; }

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
        if (login == "admin1")
        {
            this.Role = "admin";
            this.IsVerifiedAccount = true;
            return;
        }
        this.IsVerifiedAccount = false;
    }
}