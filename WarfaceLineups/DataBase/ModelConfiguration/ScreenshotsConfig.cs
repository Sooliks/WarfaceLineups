using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WarfaceLineups.DataBase.Models;

namespace WarfaceLineups.DataBase.ModelConfiguration;

public class ScreenshotsConfig : IEntityTypeConfiguration<Screenshots>
{
    public void Configure(EntityTypeBuilder<Screenshots> builder)
    {
        builder.HasKey(v => v.Id);
    }
}