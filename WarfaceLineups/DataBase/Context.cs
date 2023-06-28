using System.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using MySql.Data.MySqlClient;
using WarfaceLineups.DataBase.ModelConfiguration;
using WarfaceLineups.DataBase.Models;

namespace WarfaceLineups.DataBase;

public class Context : DbContext
{
    public DbSet<Accounts> Accounts { get; set; }
    public DbSet<Videos> Videos { get; set; }
    public DbSet<Preview> Preview { get; set; }
    public Context()
    {
        Database.EnsureCreated();   // создаем бд с новой схемой
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var connectionString = new MySqlConnectionStringBuilder()
        {
            Server = "db",
            Database = "wftracker",
            Port = 3306,
            UserID = "sooliks",
            Password = "123",
        };
        optionsBuilder.UseMySQL(connectionString.ConnectionString)
            .LogTo(str => Debug.WriteLine(str), new[] { RelationalEventId.CommandExecuted })
            .EnableSensitiveDataLogging();
        
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new AccountsConfig());
        modelBuilder.ApplyConfiguration(new VideosConfig());
        modelBuilder.ApplyConfiguration(new PreviewConfig());
    }
}