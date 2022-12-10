using MainApi.Models;
using MainApi.Service;
using MainApi.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NuGet.Protocol;

namespace MainApi.Controllers
{
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService authService;
        private readonly UserManager<Player> userManager;
        private readonly SignInManager<Player> signInManager;

        public AuthController(IAuthService authService, UserManager<Player> userManager, SignInManager<Player> signInManager)
        {
            this.authService = authService;
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        [HttpGet("/")]
        public ActionResult Index()
        {
            return Content("Every One");
        }

        [HttpPost("/Login")]
        //[ValidateAntiForgeryToken]
        public async Task<ActionResult<LoginData>> Login([FromBody] AuthViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var result = await signInManager.PasswordSignInAsync(model.UserName, model.Password, false, false);

            if (result.Succeeded)
            {
                 var user = await userManager.FindByNameAsync(model.UserName);
                return authService.CreateToken(user!);
            }
            return BadRequest(new { username = "fail to login try again!" });

        }

        [HttpPost("/Register")]
        public async Task<ActionResult<object>> Register([FromBody] AuthViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = new Player
            {
                UserName = model.UserName,
                Status = Models.Abstract.PlayerStatus.Idle
            };

            var result = await userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                return authService.CreateToken(user);
            }

            return BadRequest(result.Errors);
        }

        [Authorize]
        [HttpGet("/Test")]
        public async Task<ActionResult<string>> Test()
        {
            var id = User.Identity?.Name;
            var user = await userManager.FindByIdAsync(id!);
            return user.ToJson();
        }
    }
}

