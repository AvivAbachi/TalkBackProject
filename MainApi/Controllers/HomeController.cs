using MainApi.Models;
using MainApi.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace MainApi.Controllers
{
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly IAuthService authService;
        private readonly UserManager<Player> userManager;
        private readonly SignInManager<Player> signInManager;

        public HomeController(IAuthService authService, UserManager<Player> userManager, SignInManager<Player> signInManager)
        {
            this.authService = authService;
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        [HttpPost("/Login")]
        public async Task<ActionResult<string>> Login([FromBody] LoginModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = await userManager.FindByNameAsync(model.UserName);

            if (user == null)
            {
                ModelState.AddModelError("UserName", "Account isn't found with that username.");
                return BadRequest(ModelState);
            }

            var result = await signInManager.PasswordSignInAsync(user, model.Password, false, false);

            if (!result.Succeeded)
            {
                ModelState.AddModelError("Password", "Password isn't right.");
                return BadRequest(ModelState);
            }

            return authService.CreateToken(user!);
        }

        [HttpPost("/Register")]
        public async Task<ActionResult<string>> Register([FromBody] LoginModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = new Player { UserName = model.UserName };

            var result = await userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    if (error.Code.Contains("UserName")) error.Code = "UserName";
                    if (error.Code.Contains("Password")) error.Code = "Password";
                    ModelState.AddModelError(error.Code, error.Description);
                }
                return BadRequest(ModelState);
            }

            return authService.CreateToken(user);
        }

        [Authorize]
        [HttpGet("/Refersh")]
        public async Task<ActionResult<string>> Refersh()
        {
            var id = User.Identity?.Name;
            var user = await userManager.FindByIdAsync(id!);
            if (user == null) return Unauthorized();
            return authService.CreateToken(user);
        }
    }
}
