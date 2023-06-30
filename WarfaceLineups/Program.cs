using System.Net.Mime;
using Microsoft.Net.Http.Headers;
using WarfaceLineups.DataBase;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "_myAllowSpecificOrigins",
        policy =>
        {
            policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
            policy.WithMethods("POST", "GET", "PUT", "DELETE");
            policy.WithHeaders(HeaderNames.ContentType);
        });
});



builder.Services.AddControllers();

var app = builder.Build();
var env = builder.Environment;


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