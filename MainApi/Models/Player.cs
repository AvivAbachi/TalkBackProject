using MainApi.Models.Abstract;
//using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace MainApi.Models
{
     public class Player //: IdentityUser
    {
        [JsonIgnore]
        public string Id { get; set; }
         public string UserName { get; set; }
        [NotMapped]
         public string ConnectionId { get; set; }
        [NotMapped]
         public PlayerStatus Status { get; set; }
    }
}
