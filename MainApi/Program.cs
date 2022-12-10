using MainApi.Hubs;
using MainApi.Service;
//using MainApi.Context;
//using MainApi.Models;
//using Microsoft.AspNetCore.Authentication.JwtBearer;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration["ConnectionStrings:DefaultConnection"];
var jwtSecretKey = builder.Configuration["JwtSettings:SecretKey"];
var jwtLifespan = builder.Configuration.GetValue<int>("JwtSettings:Lifespan");

builder.Services.AddControllers();

//builder.Services.AddDbContext<UsersContext>(options => options.UseSqlServer(connectionString!));
//builder.Services.AddDatabaseDeveloperPageExceptionFilter();
//builder.Services.AddDefaultIdentity<Player>(options =>
//{
//    options.Password.RequireDigit = false;
//    options.Password.RequireLowercase = false;
//    options.Password.RequireNonAlphanumeric = false;
//    options.Password.RequireUppercase = false;
//    options.Password.RequiredLength = 6;
//    options.Password.RequiredUniqueChars = 0;
//}).AddEntityFrameworkStores<UsersContext>();

builder.Services.AddSignalR().AddHubOptions<LobbyHub>(options =>
{
    options.EnableDetailedErrors = true;
});
builder.Services.AddSingleton<IGamesService, GamesService>();
//builder.Services.AddSingleton<IAuthService>(new AuthService(jwtSecretKey!, jwtLifespan));
builder.Services.AddCors(options => options.AddDefaultPolicy(
                         policy =>
                         //policy.AllowAnyOrigin()
                         policy.WithOrigins("http://localhost:3000")
                         .AllowCredentials()
                         .AllowAnyHeader()
                         .AllowAnyMethod()));

//builder.Services
//    .AddAuthentication(options =>
//    {
//        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//        options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
//    })
//    .AddJwtBearer(options =>
//    {
//        options.TokenValidationParameters = new TokenValidationParameters
//        {
//            ValidateIssuer = false,
//            ValidateAudience = false,
//            ValidateLifetime = true,
//            ValidateIssuerSigningKey = true,
//        };
//        options.Events = new JwtBearerEvents
//        {
//            OnMessageReceived = context =>
//            {
//                var accessToken = context.Request.Query["access_token"];
//                var path = context.HttpContext.Request.Path;
//                if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/hubs"))
//                {
//                    context.Token = accessToken;
//                }
//                return Task.CompletedTask;
//            }
//        };
//    });


//builder.Services.AddAuthorization();


var app = builder.Build();

//using (var scope = app.Services.CreateScope())
//{
//    var ctx = scope.ServiceProvider.GetRequiredService<UsersContext>();
//    ctx.Database.EnsureDeleted();
//    ctx.Database.EnsureCreated();
//}


if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseCors();
app.UseRouting();
//app.UseAuthentication();
//app.UseAuthorization();
//app.MapControllers();
app.MapHub<LobbyHub>("/hubs/lobby");
//app.MapHub<GameHub>("/hubs/game");

app.Run();