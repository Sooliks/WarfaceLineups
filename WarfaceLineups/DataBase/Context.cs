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
    public DbSet<News> News { get; set; }
    public DbSet<Avatar> Avatar { get; set; }
    public DbSet<Notifications> Notifications { get; set; }
    public DbSet<Screenshots> Screenshots { get; set; }
    public DbSet<Reports> Reports { get; set; }
    public DbSet<Comments> Comments { get; set; }
    

    public Context()
    {
        Database.EnsureCreated(); // создаем бд с новой схемой
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var connectionString = new MySqlConnectionStringBuilder()
        {
            Server = "db",
            Database = "wftracker",
            Port = 3306,
            UserID = "apostol",
            Password = "qwngmli2cyinQWngmLi2CyiN",
        };
        optionsBuilder.UseMySQL(connectionString.ConnectionString)
            .LogTo(str => Debug.WriteLine(str), new[] { RelationalEventId.CommandExecuted })
            .EnableSensitiveDataLogging();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new AccountsConfig());
        modelBuilder.ApplyConfiguration(new VideosConfig());
        modelBuilder.ApplyConfiguration(new NewsConfig());
        modelBuilder.ApplyConfiguration(new AvatarConfig());
        modelBuilder.ApplyConfiguration(new NotificationsConfig());
        modelBuilder.ApplyConfiguration(new ScreenshotsConfig());
        modelBuilder.ApplyConfiguration(new ReportsConfig());
        modelBuilder.ApplyConfiguration(new CommentsConfig());
    }
}