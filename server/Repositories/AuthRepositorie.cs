using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using server.Data;
using server.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace server.Repositories
{
    public class AuthRepositorie
    {
        public Context _context;
        private readonly IConfiguration _configuration;

        public AuthRepositorie(IConfiguration configuration, Context context) { _context = context;_configuration = configuration; }

        public User Save(User user) {

            var entity = new UserDal
            {
                Email = user.Email,
                Name = user.Name,
                Password = user.Password,
            };

            _context.Users.Add(entity);
            _context.SaveChanges();

            return user;
        }

        public User? Find(string password, string email) {
            var result = _context.Users.FirstOrDefault(u => String.Equals(u.Email, email) && String.Equals(u.Password, password));

            if (result == null) {
                return null;
            }

            return new User
            {
                Id = result.Id,
                Password = password,
                Email = email,
                Name = result.Name
            };
        }

        public string GenerateToken(User user)
        {
            user.Password = "";
            var claim = JsonConvert.SerializeObject(user);
            var claims = new[]
                {
                    new Claim(ClaimTypes.Name, claim)
                };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Issuer"],
                claims: claims,
                expires: DateTime.Now.AddHours(12),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private User? ValidateToken(string token)
        {
            if (token == null)
                return null;

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;

                var jsonStringify = jwtToken.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Name).Value;
                User json = JsonConvert.DeserializeObject<User>(jsonStringify);

                // return user id from JWT token if validation successful
                return json;
            }
            catch(Exception err)
            {
                // return null if validation fails
                return null;
            }
        }

        public int GetUserId(string authorizationHeader)
        {
            var token = authorizationHeader.Substring("Bearer ".Length).Trim();
            var user = ValidateToken(token);
            var userId = user != null ? user.Id : 0;
            return userId;
        }
    }
}
