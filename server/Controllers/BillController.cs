using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Entities;
using server.Repositories;

namespace server.Controllers
{
    [ApiController]
    [Route("bills")]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class BillController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly BillRepositorie _billRepositorie;
        private readonly AuthRepositorie _authRepositorie;

        public BillController(IConfiguration configuration, BillRepositorie billRepositorie, AuthRepositorie authRepositorie)
        {
            _configuration = configuration;
            _billRepositorie = billRepositorie;
            _authRepositorie = authRepositorie;
        }

        [HttpGet("{customerId}")]
        public ActionResult Get(int customerId)
        {
            try
            {
                var result = _billRepositorie.Index(customerId);

                return Ok(result);
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpGet("{customerId}/{id}")]
        public ActionResult Find(int customerId, int id)
        {
            try
            {
                var result = _billRepositorie.Find(customerId, id);

                if(result == null)
                {
                    return NotFound();
                }

                return Ok(result);
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpPost("{customerId}")]
        public ActionResult Create(int customerId, [FromBody] Bill body)
        {
            try
            {
                var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();
                int userId = _authRepositorie.GetUserId(authorizationHeader);

                body.CustomerId = customerId;
                body.UserId = userId;

                _billRepositorie.Create(body);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpPut("{customerId}/{id}")]
        public ActionResult Edit(int customerId, int id, [FromBody] Bill body)
        {
            try
            {
                var result = _billRepositorie.Find(customerId, id);

                if (result == null)
                {
                    return NotFound();
                }

                if(result.Status == "paid")
                {
                    return BadRequest("Não é possível atualizar uma cobrança já paga");
                }

                _billRepositorie.Update(customerId, id, body);
                return Ok();
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }

        [HttpDelete("{customerId}/{id}")]
        public ActionResult Delete(int customerId, int id)
        {
            try
            {
                var result = _billRepositorie.Delete(customerId, id);

                if(!result)
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
