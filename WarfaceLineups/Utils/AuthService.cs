using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using WarfaceLineups.DataBase.Models;

namespace WfTracker.Utils;

public class AuthService
{
    private static string _secretString = "3y4O54yGfDg43fFffhG3#ff.,,,,```'94'.jfhwEfg";
    private static string _issuer = "Sooliks";
    private static string _audience = "MyAuthClient";
    private static SymmetricSecurityKey GetSymmetricSecurityKey() => new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretString));
    
    public static string GenerateJwtToken(Accounts accounts)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, accounts.Login),
            new Claim(ClaimTypes.Role, accounts.Role)
        };
        var jwtToken = new JwtSecurityToken(
            issuer: _issuer,
            audience: _audience,
            claims: claims,
            expires: DateTime.UtcNow.Add(TimeSpan.FromDays(10)),
            signingCredentials: new SigningCredentials(GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256)
        );
        var encodedJwtToken = new JwtSecurityTokenHandler().WriteToken(jwtToken);
        return encodedJwtToken;
    }

    public static bool CheckIsValidToken(string token, string param)
    {
        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = GetSymmetricSecurityKey(),
                ValidateAudience = false,
                ValidateIssuer = false
            };
            tokenHandler.ValidateToken(token, validationParameters, out var validatedToken);
            var jwtToken = (JwtSecurityToken)validatedToken;
            var login = jwtToken.Claims.First(x => x.Value == param).Value;
            if (login != null) return true;
        }
        catch (Exception e)
        {
            return false;
        }
        return false;
    }

    public static string GenerateVerificationCode()
    {
        Random random = new Random();
        return random.Next(100000, 999999).ToString();
    }
    
}