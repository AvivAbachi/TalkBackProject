using MainApi.Models.Abstract;

namespace MainApi.Models
{
    public class LoginData
    {
        public string Token { get; set; }
        public long TokenExpirationTime { get; set; }
        public string Id { get; set; }
        public string UserName { get; set; }
        public PlayerStatus Status { get; set; }
    }
}
