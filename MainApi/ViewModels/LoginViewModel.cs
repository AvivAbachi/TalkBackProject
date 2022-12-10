using System.ComponentModel.DataAnnotations;

namespace MainApi.ViewModels
{
    public class AuthViewModel
    {
        [Required]
        [StringLength(60, MinimumLength = 2)]
        public string UserName { get; set; }
        [Required]
        [StringLength(60, MinimumLength = 3)]
        public string Password { get; set; }
    }
}
