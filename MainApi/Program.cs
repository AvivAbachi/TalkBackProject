using MainApi.Context;
using MainApi.Hubs;
using MainApi.Repositories;
using MainApi.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration["ConnectionStrings:DefaultConnection"];
var jwtSecretKey = builder.Configuration["JwtSettings:SecretKey"];
var jwtLifespan = builder.Configuration.GetValue<int>("JwtSettings:Lifespan");

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSignalR();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<UsersContext>(options => options.UseSqlServer(connectionString!));
builder.Services.AddSingleton<IGamesService, GamesService>();
builder.Services.AddSingleton<IAuthService>(new AuthService(jwtSecretKey!, jwtLifespan));
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddCors(
    options => options.AddPolicy("CorsPolicy",
        builder => builder.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod().AllowCredentials()
        ));
builder.Services.AddAuthentication().AddJwtBearer(options =>
    {
        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                var accessToken = context.Request.Query["access_token"];
                var path = context.HttpContext.Request.Path;
                if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/hubs/"))
                {
                    context.Token = accessToken;
                }
                return Task.CompletedTask;
            }
        };
    });

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var ctx = scope.ServiceProvider.GetRequiredService<UsersContext>();
    ctx.Database.EnsureDeleted();
    ctx.Database.EnsureCreated();
}
app.UseHttpsRedirection();
app.UseCors("CorsPolicy");

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwaggerUI();
    app.UseSwagger();
}
if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseAuthentication();
app.MapControllers();
app.MapHub<GameHub>("/hubs/game");

app.Run();