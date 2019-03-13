using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoServer.Common.Models;

namespace ToDoServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BoardController : ControllerBase
    {
        private readonly TodoContext _context;

        public BoardController(TodoContext context)
        {
            _context = context;
        }

        [HttpGet, Route("{id}/{position}"), Authorize]
        public async Task<ActionResult<IEnumerable<Board>>> Get(long id, int position)
        {
            var filteredData = await _context.Boards.Where(x => x.UserId == id).ToListAsync();
            var count = filteredData.Count - position > 3 ? 3 : filteredData.Count - position;
            var boardToShow = filteredData.GetRange(position, count);

            return boardToShow;
        }

        [HttpGet, Route("count/{id}"), Authorize]
        public async Task<IActionResult> GetCountBoards(long id)
        {
            var filteredBoards = await _context.Boards.Where(x => x.UserId == id).ToListAsync();
            return this.Ok(filteredBoards.Count);
        }

        [HttpPost, Authorize]
        public async Task<IActionResult> Post([FromBody] Board board)
        {
            await _context.Boards.AddAsync(board);
            await _context.SaveChangesAsync();
            var boards = await _context.Boards.Where(x => x.UserId == board.UserId).ToListAsync();
            return this.Ok(boards.Count > 3 ? boards.GetRange(0, 3) : boards);
        }

        [HttpPut, Authorize]
        public async Task<IActionResult> Put([FromBody] Board board)
        {
            _context.Entry(board).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            var boards = await _context.Boards.Where(x => x.UserId == board.UserId).ToListAsync();
            return this.Ok(boards.Count > 3 ? boards.GetRange(0, 3) : boards);
        }


        [HttpDelete, Route("{id}"), Authorize]
        public async Task<IActionResult> Delete(long id)
        {
            var board = await _context.Boards.FirstOrDefaultAsync(x => x.BoardId == id);

            if (board == null) return NotFound();

            var relatedTodos = await _context.Todos.Where(x => x.BoardId == board.BoardId).ToListAsync();
            if (relatedTodos.Count > 0)
            {
                relatedTodos.ForEach(todo => { _context.Todos.Remove(todo); });
            }

            _context.Boards.Remove(board);
            await _context.SaveChangesAsync();

            var boards = await _context.Boards.Where(x => x.UserId == board.UserId).ToListAsync();
            return this.Ok(boards.Count > 3 ? boards.GetRange(0, 3) : boards);
        }
    }
}