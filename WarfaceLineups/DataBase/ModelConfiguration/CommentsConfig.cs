using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WarfaceLineups.DataBase.Models;

namespace WarfaceLineups.DataBase.ModelConfiguration;

public class CommentsConfig : IEntityTypeConfiguration<Comments>
{
    public void Configure(EntityTypeBuilder<Comments> builder)
    {
        builder.HasKey(v => v.Id);
    }
}