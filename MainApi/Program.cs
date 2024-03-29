using MainApi.Context;
using MainApi.Hubs;
using MainApi.Models;
using MainApi.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

var connectionDB = builder.Configuration["ConnectionStrings:DB"];
var jwtSettings = builder.Configuration.GetSection(nameof(JwtSettings)).Get<JwtSettings>()!;

builder.Services.AddControllers();

builder.Services.AddSignalR();

builder.Services.AddSingleton<IGamesService, GamesService>();

builder.Services.AddSingleton<IPlayersService, PlayersService>();

builder.Services.AddSingleton<IAuthService>(new AuthService(jwtSettings));

builder.Services.AddDbContext<PlayersContext>(options => options.UseSqlServer(connectionDB!));

builder.Services.AddDefaultIdentity<Player>(options =>
    {
        options.Password.RequireNonAlphanumeric = false;
        options.Password.RequiredUniqueChars = 0;

        if (builder.Environment.IsDevelopment())
        {
            options.Password.RequireDigit = false;
            options.Password.RequireLowercase = false;
            options.Password.RequireUppercase = false;
        }
    }).AddEntityFrameworkStores<PlayersContext>();

builder.Services.AddAuthorization();

builder.Services.AddAuthentication(options => options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateAudience = false,
            ValidateIssuer = false,
            IssuerSigningKey = jwtSettings.SigningKey,
        };
        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                var accessToken = context.Request.Query["access_token"];
                var path = context.HttpContext.Request.Path;
                if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/hubs"))
                {
                    context.Request.Headers["Authorization"] = accessToken;
                }
                return Task.CompletedTask;
            }
        };
    });

builder.Services.AddCors(options => options.AddPolicy("dev", policy => policy.WithOrigins("http://localhost:3000")
                   .AllowCredentials().AllowAnyHeader().AllowAnyMethod()));

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var ctx = scope.ServiceProvider.GetRequiredService<PlayersContext>();
    if (app.Environment.IsDevelopment()) ctx.Database.EnsureDeleted();
    ctx.Database.EnsureCreated();
}

if (app.Environment.IsDevelopment())
{
    app.UseCors("dev");
}
else
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapHub<GameHub>("/hubs/game");

app.Run();