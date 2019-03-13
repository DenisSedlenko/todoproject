using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoServer.Common.Models;

namespace ToDoServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly TodoContext _context;

        public UserController(TodoContext context)
        {
            _context = context;
        }

        [HttpGet, Route("{id}"), Authorize]
        public async Task<IActionResult> Get(long id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserId == id);
            if (user == null) NotFound();

            return this.Ok(user);
        }
    }
}