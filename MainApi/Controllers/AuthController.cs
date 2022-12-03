using MainApi.Models;
using MainApi.Repositories;
using MainApi.Service;
using MainApi.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace MainApi.Controllers
{
     [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService authService;
        private readonly IUserRepository userRepository;
        public AuthController(IAuthService authService, IUserRepository userRepository)
        {
            this.authService = authService;
            this.userRepository = userRepository;
        }

        [HttpGet("/")]
        public ActionResult Index()
        {
            return Content("Every One");
        }

        [HttpPost("/Login")]
        public ActionResult<AuthData> Login([FromBody] AuthViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = userRepository.GetSingle(u => u.Username == model.Username);

            if (user == null)
            {
                return BadRequest(new { username = "no username not found" });
            }

            var passwordValid = authService.VerifyPassword(model.Password, user.Password);
            if (!passwordValid)
            {
                return BadRequest(new { password = "invalid password" });
            }

            return authService.GetAuthData(user);
        }

        [HttpPost("/Register")]
        public ActionResult<AuthData> Register([FromBody] AuthViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var usernameUniq = userRepository.IsUsernameUniq(model.Username);
            if (!usernameUniq) return BadRequest(new { username = "user with this email already exists" });

            var id = Guid.NewGuid().ToString();
            var user = new Player
            {
                Id = id,
                Username = model.Username,
                Password = authService.HashPassword(model.Password)
            };
            userRepository.Add(user);
            userRepository.Commit();

            return authService.GetAuthData(user);
        }

        [Authorize]
        [HttpGet("/Test")]
        public ActionResult Test()
        {
            return Content("User Authorize");
        }
    }
}

