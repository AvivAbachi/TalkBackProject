using MainApi.Models.Abstract;
using System.ComponentModel.DataAnnotations.Schema;

namespace MainApi.Models
{
    public class Player : IEntityBase
    {
        public string Id { get; set; }
        [NotMapped]
        public string ConnectionId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        //public PlayerStatus Status { get; set; }
    }
}
