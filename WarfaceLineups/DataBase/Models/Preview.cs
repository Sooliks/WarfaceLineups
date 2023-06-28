namespace WarfaceLineups.DataBase.Models;

public class Preview
{
    public int Id { get; set; }
    public string Name { get; set; } 
    public byte[] Image { get; set; }

    public Preview()
    {
        
    }

    public Preview(string name, byte [] image)
    {
        Name = name;
        Image = image;
    }
}