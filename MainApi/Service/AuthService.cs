using MainApi.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace MainApi.Service
{
    public class AuthService : IAuthService
    {
        private readonly JwtSettings? jwtSettings;

        public AuthService(JwtSettings jwtSettings)
        {
            this.jwtSettings = jwtSettings ?? throw new ArgumentNullException();
        }
        public string CreateToken(Player player)
        {
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, player.Id) }),
                Expires = DateTime.UtcNow.AddSeconds(jwtSettings.Lifespan),
                SigningCredentials = jwtSettings.SigningCredentials,
                Audience = jwtSettings.Audience,
                Issuer = jwtSettings.Issuer
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));

            return token;
        }
    }
}
