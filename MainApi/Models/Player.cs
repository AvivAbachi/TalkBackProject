using MainApi.Models.Abstract;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace MainApi.Models
{
    public class Player : IdentityUser, IPlayerBase
    {
        [NotMapped]
        public string ConnectionId { get; set; }
        [NotMapped]
        public PlayerStatus Status { get; set; }
    }
}
