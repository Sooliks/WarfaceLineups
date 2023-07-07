using WarfaceLineups.DataBase.Models;
using WfTracker.Utils;


namespace WarfaceLineups.DataBase.Requests;

public class HandlerAccounts
{
    public static bool IsLoginExist(string login)
    {
        using var db = new Context();
        return db.Accounts.SingleOrDefault(a => a.Login == login) != null;
    }

    public static bool IsEmailExist(string email)
    {
        using var db = new Context();
        return db.Accounts.SingleOrDefault(a => a.Email == email) != null;
    }

    public static bool IsPasswordValid(string email, string password)
    {
        Accounts activeAccount = new Accounts();
        using (Context db = new Context())
        {
            activeAccount = db.Accounts.SingleOrDefault(a => a.Email == email);
        }

        if (Bcrypt.BCrypt.CheckPassword(password, activeAccount.Password)) return true;
        return false;
    }
    public static bool IsPasswordValid(Accounts account, string password)
    {
        if (Bcrypt.BCrypt.CheckPassword(password, account.Password)) return true;
        return false;
    }

    public static Accounts Register(string login, string email, string password)
    {
        using (Context db = new Context())
        {
            string saltePassword = Bcrypt.BCrypt.HashPassword(password, Bcrypt.BCrypt.GenerateSalt());
            var account = new Accounts(login, email, saltePassword);
            db.Accounts.Add(account);
            db.SaveChangesAsync();
            return account;
        }
    }
    public static int GetLastIdAccounts()
    {
        using Context db = new Context();
        return db.Accounts.Max(a => a.Id);
    }

    public static int GetIdByAccountLogin(string login)
    {
        using Context db = new Context();
        Accounts account = new Accounts();
        account = db.Accounts.SingleOrDefault(a => a.Login == login);
        if (account == null) return 1;
        return account.Id;
    }

    public static string GetRoleByAccountLogin(string login)
    {
        using Context db = new Context();
        Accounts account = new Accounts();
        account = db.Accounts.SingleOrDefault(a => a.Login == login);
        if (account == null) return "null";
        return account.Role;
    }
    public static Accounts GetAccountById(int id)
    {
        using Context db = new Context();
        Accounts account = new Accounts();
        account = db.Accounts.SingleOrDefault(a => a.Id == id);
        return account;
    }
    public static Accounts GetAccountByEmail(string email)
    {
        using Context db = new Context();
        Accounts account = new Accounts();
        account = db.Accounts.SingleOrDefault(a => a.Email == email);
        return account;
    }
    public static string GenerateVerificationCodeForAccount(Accounts account)
    {
        RemoveVerificationCodeForAccount(account);
        using Context db = new Context();
        if (account != null)
        {
            var verificationCode = AuthService.GenerateVerificationCode();
            account.VerificationCode = verificationCode;
            db.Accounts.Update(account);
            db.SaveChanges();
            return verificationCode;
        }
        return "null";
    }

    public static bool CheckIsValidVerificationCodeForAccount(Accounts account, string verificationCode)
    {
        using Context db = new Context();
        if (account != null)
        {
            if (account.VerificationCode == verificationCode)
            {
                account.IsVerifiedAccount = true;
                RemoveVerificationCodeForAccount(account);
                db.Accounts.Update(account);
                db.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }
        return false;
    }
    public static bool CheckIsValidVerificationCodeForRecovery(Accounts account,string verificationCode)
    {
        using Context db = new Context();
        if (account != null)
        {
            if (account.VerificationCode == verificationCode)
            {
                RemoveVerificationCodeForAccount(account);
                db.Accounts.Update(account);
                db.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }
        return false;
    }
    public static Accounts GetAccountByLogin(string login)
    {
        using Context db = new Context();
        return db.Accounts.SingleOrDefault(a => a.Login == login);
    }

    public static void SetPremiumAccountByLogin(string login)
    {
        using Context db = new Context();
        var account = db.Accounts.SingleOrDefault(a => a.Login == login);
        account.IsPremiumAccount = true;
        db.Accounts.Update(account);
        db.SaveChanges();
    }

    public static void ChangePasswordAccount(Accounts account, string newPassword)
    {
        using Context db = new Context();
        account.Password = Bcrypt.BCrypt.HashPassword(newPassword, Bcrypt.BCrypt.GenerateSalt());
        db.Accounts.Update(account);
        db.SaveChanges();
    }

    public static void RemoveVerificationCodeForAccount(Accounts account)
    {
        using Context db = new Context();
        account.VerificationCode = "1";
        db.Accounts.Update(account);
        db.SaveChanges();
    }
}