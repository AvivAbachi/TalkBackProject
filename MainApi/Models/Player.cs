using MainApi.Models.Abstract;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace MainApi.Models
{
    public class Player : IdentityUser
    {
        [NotMapped]
        public string ConnectionId { get; set; }
        [NotMapped]
        public PlayerStatus Status { get; set; }
    }
}
