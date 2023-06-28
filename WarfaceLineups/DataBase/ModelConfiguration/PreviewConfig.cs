using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WarfaceLineups.DataBase.Models;

namespace WarfaceLineups.DataBase.ModelConfiguration;

public class PreviewConfig : IEntityTypeConfiguration<Preview>
{
    public void Configure(EntityTypeBuilder<Preview> builder)
    {
        builder.HasKey(v => v.Id);
    }
}