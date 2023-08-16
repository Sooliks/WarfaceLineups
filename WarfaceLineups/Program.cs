using System.Net.Mime;
using Microsoft.Net.Http.Headers;
using WarfaceLineups.DataBase;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "_myAllowSpecificOrigins",
        policy =>
        {
            policy.AllowAnyHeader().AllowAnyMethod();
            policy.WithOrigins("http://localhost:3000");
            policy.WithHeaders(HeaderNames.ContentType);
        });
});

builder.Services.AddHealthChecks();//




builder.Services.AddControllers();

var app = builder.Build();

app.UseHealthChecks("/health");
app.MapHealthChecks("/health");



app.UseCors("_myAllowSpecificOrigins");
app.MapControllers();
app.MapGet("/", () => "Hello World!");




using (Context db = new Context())
{
    try
    {
        bool isAvalaible = db.Database.CanConnect();
        Console.WriteLine(isAvalaible ? "Database success connected!" : "Database is unavailable!");
    }
    catch (Exception e)
    {
        Console.WriteLine(e.ToString());
    }
}
app.Run();