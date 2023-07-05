using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WarfaceLineups.DataBase.Models;

public class Avatar
{
    public int Id { get; set; }
    
    [MaxLength(500000)]
    public byte [] Content { get; set; }
    public int AccountId { get; set; }
    
    public Avatar(){

    }
    public Avatar(byte[] content, int accountId)
    {
        Content = content;
        AccountId = accountId;
    }
}