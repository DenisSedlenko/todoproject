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
    public class TodoController : ControllerBase
    {
        private readonly TodoContext _context;

        public TodoController(TodoContext context)
        {
            _context = context;
        }

        [HttpGet, Route("{id}"), Authorize]
        public async Task<ActionResult<IEnumerable<Todo>>> Get(long id)
        {
            return await _context.Todos.Where(x => x.BoardId == id).ToListAsync();
        }

        [HttpPost, Authorize]
        public async Task<IActionResult> Post([FromBody] Todo todo)
        {
            await _context.Todos.AddAsync(todo);
            await _context.SaveChangesAsync();

            return this.Ok(await _context.Todos.Where(x => x.BoardId == todo.BoardId).ToListAsync());
        }

        [HttpPut, Authorize]
        public async Task<IActionResult> Put([FromBody] Todo todo)
        {
            _context.Entry(todo).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return this.Ok(await _context.Todos.Where(x => x.BoardId == todo.BoardId).ToListAsync());
        }


        [HttpDelete("{id}"), Authorize]
        public async Task<IActionResult> Delete(long id)
        { 
            var todo = await _context.Todos.FirstOrDefaultAsync(x => x.TodoId == id);

            if (todo == null) return NotFound();

            _context.Todos.Remove(todo);
            await _context.SaveChangesAsync();

            return this.Ok(await _context.Todos.Where(x => x.BoardId == todo.BoardId).ToListAsync());
        }
    }
}