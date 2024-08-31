using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Entidades;
using server.Repositories;
using System.IdentityModel.Tokens.Jwt;

namespace server.Controllers
{
    [ApiController]
    [Route("customers")]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class CustomerController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly CustomerRepositorie _customerRepositorie;
        private readonly AuthRepositorie _authRepositorie;

        public CustomerController(IConfiguration configuration, CustomerRepositorie customerRepositorie, AuthRepositorie authRepositorie)
        {
            _configuration = configuration;
            _customerRepositorie = customerRepositorie;
            _authRepositorie = authRepositorie;
        }

        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();
                int userId = _authRepositorie.GetUserId(authorizationHeader);

                var result = _customerRepositorie.Index(userId);

                return Ok(result);
            }
            catch
            {
                return NotFound();
            }
        }

        

        [HttpPost]
        public ActionResult Create([FromBody] Customer body)
        {
            try
            {
                var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();
                int userId = _authRepositorie.GetUserId(authorizationHeader);
                body.UserId = userId;
                bool created = _customerRepositorie.Create(body);

                if(!created)
                {
                    return BadRequest();
                }

                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpPut("{id}")]
        public ActionResult Edit(int id, [FromBody] Customer body)
        {
            try
            {
                _customerRepositorie.Update(id, body);
                return Ok();
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                var result = _customerRepositorie.Delete(id);
                if (!result)
                {
                    return BadRequest();
                }
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }
    }
}
