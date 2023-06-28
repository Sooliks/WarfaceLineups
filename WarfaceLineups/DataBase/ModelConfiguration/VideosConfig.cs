using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WarfaceLineups.DataBase.Models;

namespace WarfaceLineups.DataBase.ModelConfiguration;

public class VideosConfig : IEntityTypeConfiguration<Videos>
{
    public void Configure(EntityTypeBuilder<Videos> builder)
    {
        builder.HasKey(v => v.Id);
    }
}