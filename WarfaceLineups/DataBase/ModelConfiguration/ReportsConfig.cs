using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WarfaceLineups.DataBase.Models;

namespace WarfaceLineups.DataBase.ModelConfiguration;

public class ReportsConfig : IEntityTypeConfiguration<Reports>
{
    public void Configure(EntityTypeBuilder<Reports> builder)
    {
        builder.HasKey(r => r.Id);
    }
}