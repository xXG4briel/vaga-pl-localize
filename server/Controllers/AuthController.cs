using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using server.Entities;
using server.Repositories;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace server.Controllers
{
    [ApiController]
    [Route("/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public AuthRepositorie _authRepositorie;

        public AuthController(IConfiguration configuration, AuthRepositorie authRepositorie)
        {
            _configuration = configuration;
            _authRepositorie = authRepositorie;
        }       

        [HttpPost("signin")]
        public ActionResult SignIn([FromBody] Login body)
        {
            try
            {
                User result = _authRepositorie.Find(body.password, body.email);

                if (result == null) {
                    return Forbid();
                }

                return Ok(new { Token = _authRepositorie.GenerateToken(result) });
            }
            catch(Exception error)
            {
                return Unauthorized();
            }
        }


        [HttpPost("signout")]
        public ActionResult SignOut([FromBody] User body)
        {
            try
            {
                return Ok(_authRepositorie.Save(body));
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
