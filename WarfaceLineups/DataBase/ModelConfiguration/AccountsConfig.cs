using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WarfaceLineups.DataBase.Models;

namespace WarfaceLineups.DataBase.ModelConfiguration;

public class AccountsConfig : IEntityTypeConfiguration<Accounts>
{
    public void Configure(EntityTypeBuilder<Accounts> builder)
    {
        builder.HasKey(a => a.Id);
    }
}