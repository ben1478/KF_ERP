var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromHours(8); // 設置 Session 過期時間
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
    options.Cookie.SameSite = SameSiteMode.None;
});

var app = builder.Build();

app.UseStaticFiles();

app.MapGet("/", () => Results.Redirect("/Home/Login.html"));

app.Run();
