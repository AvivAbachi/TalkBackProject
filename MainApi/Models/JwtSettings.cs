using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace MainApi.Models
{
    public class JwtSettings
    {
        public string SecretKey { get; }
        public string Issuer { get; }
        public string Audience { get; }
        public int Lifespan { get; }
        public string Algorithms { get; }
        public SymmetricSecurityKey SigningKey { get; }
        public SigningCredentials SigningCredentials { get; }
        public JwtSettings(string secretKey, string issuer, string audience, int lifespan)
        {
            SecretKey = secretKey;
            Issuer = issuer;
            Audience = audience;
            Lifespan = lifespan;
            Algorithms = SecurityAlgorithms.HmacSha256Signature;
            SigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SecretKey));
            SigningCredentials = new SigningCredentials(SigningKey, Algorithms);
        }
    }
}
