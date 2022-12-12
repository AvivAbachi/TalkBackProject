using System.ComponentModel.DataAnnotations;

namespace MainApi.Models
{
    public class AuthViewModel
    {
        [StringLength(60, MinimumLength = 6)]
        public string UserName { get; set; }
        [DataType(DataType.Password)]
        [StringLength(60, MinimumLength = 6)]
        public string Password { get; set; }
    }
}
