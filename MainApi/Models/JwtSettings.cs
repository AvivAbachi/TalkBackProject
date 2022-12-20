using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace MainApi.Models
{
    public class JwtSettings
    {
        public string SecretKey { get; }
        public int Lifespan { get; }
        public string Algorithms { get; }
        public SymmetricSecurityKey SigningKey { get; }
        public SigningCredentials SigningCredentials { get; }
        public JwtSettings(string secretKey, int lifespan)
        {
            SecretKey = secretKey ?? throw new ArgumentNullException(nameof(secretKey));
            Lifespan = lifespan;
            Algorithms = SecurityAlgorithms.HmacSha256Signature;
            SigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SecretKey));
            SigningCredentials = new SigningCredentials(SigningKey, Algorithms);
        }
    }
}
