using System.ComponentModel.DataAnnotations;

namespace MainApi.Models
{
    public class AuthViewModel
    {
        [Required(ErrorMessage = "Username is required.")]
        [StringLength(60, MinimumLength = 6, ErrorMessage = "Username must be with a minimum length of 6 and a maximum length of 60.")]
        public string UserName { get; set; }
        [Required(ErrorMessage = "Password is required.")]
        [DataType(DataType.Password)]
        [StringLength(60, MinimumLength = 6, ErrorMessage = "Password must be with a minimum length of 6 and a maximum length of 60.")]
        public string Password { get; set; }
    }
}
