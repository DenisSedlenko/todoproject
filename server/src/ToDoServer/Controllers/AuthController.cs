using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ToDoServer.Common.Interfaces;
using ToDoServer.Common.Models;
using ToDoServer.Common.Settings;

namespace ToDoServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppSettings _appSettings;
        private readonly IUserProvider _userProvider;

        public AuthController(
            IOptions<AppSettings> appSettings,
            IUserProvider userProvider)
        {
            _appSettings = appSettings.Value;
            _userProvider = userProvider;
        }

        [HttpPost, Route("login")]
        public async Task<IActionResult> Login([FromBody] User user)
        {
            if (user == null) return this.BadRequest("Invalid data");

            await _userProvider.CheckOrCreateUser(user);

            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.Email)
            };

            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.SecretKey));
            var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var tokenOptions = new JwtSecurityToken(
                _appSettings.Issuer,
                _appSettings.Audience,
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType).Claims,
                expires: DateTime.Now.AddMinutes(10),
                signingCredentials: signingCredentials
            );

            var accessToken = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            var id = await _userProvider.GetUserId(user.Email);

            return this.Ok(new { accessToken, id });
        }
    }
}